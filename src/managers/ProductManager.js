import fs from 'fs'
const fsPromise = fs.promises

class ProductManager {
  constructor(path) {
    this.path = path
  }

  async getProducts() {
    const data = await fsPromise.readFile(this.path, 'utf-8')
    return JSON.parse(data)
  }

  async addProduct(product) {
    const products = await this.getProducts()
    const id = products.length ? products[products.length - 1].id + 1 : 1
    products.push({ id, ...product })
    await fsPromise.writeFile(this.path, JSON.stringify(products, null, 2))
  }

  async deleteProduct(id) {
    let products = await this.getProducts()
    products = products.filter(p => p.id !== id)
    await fsPromise.writeFile(this.path, JSON.stringify(products, null, 2))
  }
}

export default ProductManager