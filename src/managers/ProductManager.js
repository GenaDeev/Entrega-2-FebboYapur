import fs from "fs"
const fsPromise = fs.promises

class ProductManager {
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

  async addProduct(product) {
    const products = await this.#readFile()
    const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1
    const newProduct = { id: newId, ...product }
    products.push(newProduct)
    await this.#writeFile(products)
    return newProduct
  }

  async getProducts() {
    return await this.#readFile()
  }

  async getProductById(pid) {
    const products = await this.#readFile()
    return products.find(p => p.id === Number(pid)) || null
  }

  async updateProduct(pid, updates) {
    const products = await this.#readFile()
    const index = products.findIndex(p => p.id === Number(pid))
    if (index === -1) return null
    const updatedProduct = { ...products[index], ...updates, id: products[index].id }
    products[index] = updatedProduct
    await this.#writeFile(products)
    return updatedProduct
  }

  async deleteProduct(pid) {
    const products = await this.#readFile()
    const filtered = products.filter(p => p.id !== Number(pid))
    await this.#writeFile(filtered)
    return products.length !== filtered.length
  }
}

export default ProductManager
