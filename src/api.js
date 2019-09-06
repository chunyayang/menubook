import axios from 'axios'

const storeRequest = axios.create({
  baseURL: 'http://localhost:3000/'
})

export const getStores = () => storeRequest.get('/stores')