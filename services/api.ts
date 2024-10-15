import axios from 'axios'

export const api = axios.create({
  baseURL: "http://26.197.11.3:3333"
})