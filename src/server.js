import app from './app.js'
import { Server } from 'socket.io'
import http from 'http'
import ProductService from './services/ProductService.js'

const server = http.createServer(app)
const io = new Server(server)
const productService = new ProductService()

io.on('connection', async (socket) => {
  console.log('Cliente conectado')
  
  // Enviar lista de productos al cliente
  const products = await productService.getProducts({})
  socket.emit('productList', products.docs)

  // Escuchar evento de agregar producto
  socket.on('addProduct', async (data) => {
    await productService.create(data)
    const updatedProducts = await productService.getProducts({})
    io.emit('productList', updatedProducts.docs)
  })

  // Escuchar evento de eliminar producto
  socket.on('deleteProduct', async (id) => {
    await productService.delete(id)
    const updatedProducts = await productService.getProducts({})
    io.emit('productList', updatedProducts.docs)
  })
})

const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
  console.log(`Servidor Socket.io corriendo en puerto ${PORT}`)
})