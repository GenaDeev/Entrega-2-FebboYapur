const socket = io()

const form = document.getElementById('addForm')
const list = document.getElementById('productList')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const data = Object.fromEntries(new FormData(form))
  data.price = Number(data.price)
  data.stock = Number(data.stock)
  data.status = true
  data.thumbnails = []
  socket.emit('addProduct', data)
  form.reset()
})

socket.on('productList', (products) => {
  list.innerHTML = ''
  products.forEach(p => {
    const li = document.createElement('li')
    li.innerHTML = `${p.title} - $${p.price} <button onclick="deleteProduct(${p.id})">Eliminar</button>`
    list.appendChild(li)
  })
})

function deleteProduct(id) {
  socket.emit('deleteProduct', id)
}