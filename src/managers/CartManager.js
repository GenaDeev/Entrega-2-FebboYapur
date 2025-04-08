import fs from "fs"
const fsPromise = fs.promises

class CartManager {
  constructor(path) {
    this.path = path
  }

  async #readFile() {
    try {
      const data = await fsPromise.readFile(this.path, "utf-8")
      return JSON.parse(data)
    } catch {
      return []
    }
  }

  async #writeFile(data) {
    await fsPromise.writeFile(this.path, JSON.stringify(data, null, 2))
  }

  async createCart() {
    const carts = await this.#readFile()
    const newId = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1
    const newCart = { id: newId, products: [] }
    carts.push(newCart)
    await this.#writeFile(carts)
    return newCart
  }

  async getCartById(cid) {
    const carts = await this.#readFile()
    return carts.find(c => c.id === Number(cid)) || null
  }

  async addProductToCart(cid, pid) {
    const carts = await this.#readFile()
    const cartIndex = carts.findIndex(c => c.id === Number(cid))
    if (cartIndex === -1) return null

    const cart = carts[cartIndex]
    const productIndex = cart.products.findIndex(p => p.product === Number(pid))

    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1
    } else {
      cart.products.push({ product: Number(pid), quantity: 1 })
    }

    carts[cartIndex] = cart
    await this.#writeFile(carts)
    return cart
  }
}

export default CartManager
