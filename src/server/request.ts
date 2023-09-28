import axios from 'axios'
const request = axios.create({
  baseURL: "https://api.imooc-web.lgdsunday.club/api",
  timeout: 5000,
})
import type {RootObject} from './type'

export const getVisualization = ():Promise<RootObject>=>request.get("/visualization").then(res=>res.data)