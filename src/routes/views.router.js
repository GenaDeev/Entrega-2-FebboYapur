import { Router } from 'express'
import ProductManager from '../managers/ProductManager.js'

const router = Router()
const productManager = new ProductManager('src/data/products.json')

router.get('/home', async (req, res) => {
  const products = await productManager.getProducts()
  res.render('home', { products })
})

router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts')
})

export default router