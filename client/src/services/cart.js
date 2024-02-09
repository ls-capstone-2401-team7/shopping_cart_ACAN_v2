import axios from 'axios'


const getAllProducts =  async () => {
  const { data }  = await axios.get('/api/products')
  console.log(data)

  return data
}

const addProduct = async (productObj) => {
  const { data } = await axios.post('/api/products', productObj)
  return data
}

const updateProduct = async (productObj, productId) => {
  const { data } = await axios.put(`/api/products/${productId}`, productObj)
  return data
}

const deleteProduct = async (productId) => {
  await axios.delete(`/api/products/${productId}`)
}

const addToCart = async (productId) => {
  const { data } = await axios.post(`/api/add-to-cart`, {productId})
  return data
}


export default {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  addToCart
}