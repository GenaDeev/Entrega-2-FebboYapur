import { Router } from "express";
import ProductService from "../services/ProductService.js";

const router = Router();
const productService = new ProductService();

// GET con paginación, filtros y orden
router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const result = await productService.getProducts({
      limit: parseInt(limit),
      page: parseInt(page),
      sort,
      query,
    });

    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const generateLink = (p) =>
      `${baseUrl}?page=${p}&limit=${limit}${query ? `&query=${query}` : ""}${
        sort ? `&sort=${sort}` : ""
      }`;

    res.json({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? generateLink(result.prevPage) : null,
      nextLink: result.hasNextPage ? generateLink(result.nextPage) : null,
    });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

// GET por ID
router.get("/:pid", async (req, res) => {
  const product = await productService.getById(req.params.pid);
  if (!product)
    return res.status(404).json({ error: "Producto no encontrado" });
  res.json(product);
});

// POST
router.post("/", async (req, res) => {
  const newProduct = await productService.create(req.body);
  res.status(201).json(newProduct);
});

// PUT
router.put("/:pid", async (req, res) => {
  const updated = await productService.update(req.params.pid, req.body);
  res.json(updated);
});

// DELETE
router.delete("/:pid", async (req, res) => {
  await productService.delete(req.params.pid);
  res.json({ status: "Producto eliminado" });
});

export default router;
