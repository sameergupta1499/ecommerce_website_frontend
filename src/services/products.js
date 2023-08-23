import axios from 'axios';
import {serializedParams} from '@/services/utils'



export function fetchProducts(page = "", params = {}) {
  let url = "http://34.235.14.121:8000/api/products/";
  if (page !== null) {
    url += page + "/";
  }
  let x = serializedParams(params)
  const requestUrl = url + (x ? `?${x}` : "");

  return axios
    .get(requestUrl)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching products:", error);
      throw error;
    });
}
