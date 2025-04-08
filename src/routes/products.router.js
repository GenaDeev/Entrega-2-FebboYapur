import { Router } from 'express'
import ProductManager from '../managers/ProductManager.js'

const router = Router()
const manager = new ProductManager('src/data/products.json')

router.get('/', async (req, res) => {
  const products = await manager.getProducts()
  res.json(products)
})

router.get('/:pid', async (req, res) => {
  const product = await manager.getProductById(req.params.pid)
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' })
  res.json(product)
})

router.post('/', async (req, res) => {
  const { title, description, code, price, status = true, stock, category, thumbnails = [] } = req.body
  if (!title || !description || !code || !price || stock == null || !category) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' })
  }

  const newProduct = await manager.addProduct({
    title, description, code, price, status, stock, category, thumbnails
  })

  res.status(201).json(newProduct)
})

router.put('/:pid', async (req, res) => {
  const updates = req.body
  if ('id' in updates) delete updates.id
  const updated = await manager.updateProduct(req.params.pid, updates)
  if (!updated) return res.status(404).json({ error: 'Producto no encontrado' })
  res.json(updated)
})

router.delete('/:pid', async (req, res) => {
  const deleted = await manager.deleteProduct(req.params.pid)
  if (!deleted) return res.status(404).json({ error: 'Producto no encontrado' })
  res.json({ status: 'Producto eliminado' })
})

export default router
