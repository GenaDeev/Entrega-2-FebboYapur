import app from './app.js'
import { Server } from 'socket.io'
import http from 'http'
import ProductManager from './managers/ProductManager.js'

const server = http.createServer(app)
const io = new Server(server)
const productManager = new ProductManager('src/data/products.json')

io.on('connection', async (socket) => {
  console.log('Cliente conectado')
  socket.emit('productList', await productManager.getProducts())

  socket.on('addProduct', async (data) => {
    await productManager.addProduct(data)
    io.emit('productList', await productManager.getProducts())
  })

  socket.on('deleteProduct', async (id) => {
    await productManager.deleteProduct(id)
    io.emit('productList', await productManager.getProducts())
  })
})

server.listen(8080, () => console.log('Servidor con socket.io en puerto 8080'))