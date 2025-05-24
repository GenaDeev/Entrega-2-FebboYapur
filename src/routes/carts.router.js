import { Router } from "express";
import CartService from "../services/CartService.js";

const router = Router();
const cartService = new CartService();

// Crear carrito
router.post("/", async (req, res) => {
  const cart = await cartService.create();
  res.status(201).json(cart);
});

// Obtener carrito con populate
router.get("/:cid", async (req, res) => {
  const cart = await cartService.getById(req.params.cid);
  res.json(cart);
});

// Agregar producto al carrito
router.post("/:cid/product/:pid", async (req, res) => {
  const cart = await cartService.addProduct(req.params.cid, req.params.pid);
  res.json(cart);
});

// Eliminar producto específico del carrito
router.delete("/:cid/products/:pid", async (req, res) => {
  const cart = await cartService.deleteProduct(req.params.cid, req.params.pid);
  res.json(cart);
});

// Reemplazar todos los productos del carrito
router.put("/:cid", async (req, res) => {
  const cart = await cartService.updateAll(req.params.cid, req.body.products);
  res.json(cart);
});

// Actualizar cantidad de un producto
router.put("/:cid/products/:pid", async (req, res) => {
  const { quantity } = req.body;
  const cart = await cartService.updateProductQuantity(
    req.params.cid,
    req.params.pid,
    quantity
  );
  res.json(cart);
});

// Vaciar carrito
router.delete("/:cid", async (req, res) => {
  const cart = await cartService.clearCart(req.params.cid);
  res.json(cart);
});

export default router;
