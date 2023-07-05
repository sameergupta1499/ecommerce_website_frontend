import axios from 'axios'

export function fetchProducts() {
  return axios.get('http://127.0.0.1:8000/api/products/clothing-and-apparels/')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching products:', error)
      throw error
    })
}
