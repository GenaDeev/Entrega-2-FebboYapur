import express from 'express'
import { engine } from 'express-handlebars'
import path from 'path'
import productsRouter from './routes/products.router.js'
import viewsRouter from './routes/views.router.js'

const __dirname = path.resolve()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/src/public')))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, '/src/views'))

app.use('/api/products', productsRouter)
app.use('/', viewsRouter)

export default app