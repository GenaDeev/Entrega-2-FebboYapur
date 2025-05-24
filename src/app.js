import express from 'express'
import { engine } from 'express-handlebars'
import path from 'path'
import { connectDB } from './config/db.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'

const __dirname = path.resolve()

// Conectar a MongoDB
connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/src/public')))

// Configurar Handlebars
app.engine('handlebars', engine({
  helpers: {
    eq: (a, b) => a === b,
    multiply: (a, b) => a * b,
    calculateTotal: (products) => {
      return products.reduce((total, item) => {
        return total + (item.product.price * item.quantity)
      }, 0)
    }
  }
}))
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, '/src/views'))

// Rutas
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/', viewsRouter)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})

export default app