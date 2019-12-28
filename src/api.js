import axios from 'axios'

const storeRequest = axios.create({
  baseURL: 'http://localhost:3000/'
})

export const getStores = () => storeRequest.get('/stores')
export const getStoreDetails = (id) => storeRequest.get('/stores/' + id)
export const getStoreMenuList = (id) => storeRequest.get('/menus/' + id)
