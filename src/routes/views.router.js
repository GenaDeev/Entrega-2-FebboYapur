import { Router } from "express";
import ProductService from "../services/ProductService.js";
import CartService from "../services/CartService.js";

const router = Router();
const productService = new ProductService();
const cartService = new CartService();

// Vista paginada
router.get("/products", async (req, res) => {
  const { limit = 10, page = 1, sort, query } = req.query;
  const result = await productService.getProducts({
    limit: parseInt(limit),
    page: parseInt(page),
    sort,
    query,
  });

  res.render("products", {
    products: result.docs,
    page: result.page,
    totalPages: result.totalPages,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevPage: result.prevPage,
    nextPage: result.nextPage,
    query,
    sort,
  });
});

// Detalle de producto
router.get("/products/:pid", async (req, res) => {
  const product = await productService.getById(req.params.pid);
  res.render("productDetail", { product });
});

// Vista carrito
router.get("/carts/:cid", async (req, res) => {
  const cart = await cartService.getById(req.params.cid);
  res.render("cart", { cart });
});

export default router;
