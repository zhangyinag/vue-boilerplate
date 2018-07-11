import axios, {AxiosInstance, AxiosInterceptorManager, AxiosPromise, AxiosRequestConfig, AxiosResponse} from 'axios'
import Http from './Http'
import {req, reqErr, res, resErr} from './handler'

const http = <Http>axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  withCredentials: true,
  timeout: 30 * 1000
})

http.interceptors.request.use(req, reqErr)
http.interceptors.response.use(res, resErr)

export default http
