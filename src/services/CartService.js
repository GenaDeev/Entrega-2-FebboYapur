import Cart from "../models/Cart.js";

export default class CartService {
  async getById(cid) {
    return await Cart.findById(cid).populate("products.product");
  }

  async create() {
    return await Cart.create({ products: [] });
  }

  async addProduct(cid, pid, quantity = 1) {
    const cart = await Cart.findById(cid);
    const index = cart.products.findIndex((p) => p.product.toString() === pid);
    if (index >= 0) cart.products[index].quantity += quantity;
    else cart.products.push({ product: pid, quantity });
    return await cart.save();
  }

  async updateProductQuantity(cid, pid, quantity) {
    const cart = await Cart.findById(cid);
    const product = cart.products.find((p) => p.product.toString() === pid);
    if (product) product.quantity = quantity;
    return await cart.save();
  }

  async updateAll(cid, products) {
    const cart = await Cart.findById(cid);
    cart.products = products;
    return await cart.save();
  }

  async deleteProduct(cid, pid) {
    const cart = await Cart.findById(cid);
    cart.products = cart.products.filter((p) => p.product.toString() !== pid);
    return await cart.save();
  }

  async clearCart(cid) {
    const cart = await Cart.findById(cid);
    cart.products = [];
    return await cart.save();
  }
}
