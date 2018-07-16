import {AxiosResponse} from 'axios'

const map = {
  code: 'resultCode',
  errMsg: 'resultMesg',
  data: 'data',
  successCode: '000000',
  noAuthCode: '010104'
}

export class TransError {
  status: number| null
  message: string
  payload: any

  constructor (status: number| null, message: string, payload: any) {
    this.status = status
    this.payload = payload
    this.message = message
  }
}

export function transform (response: AxiosResponse): Promise<any> {
  if (response.status !== 200) return Promise.reject(response) // only care status 200
  let status = null
  if (response.data[map.code] === map.successCode) return Promise.resolve(response.data[map.data])
  if (response.data[map.code] === map.noAuthCode) status = 401
  let msg = response.data[map.errMsg] || response.data[map.data] || response.data[map.code]
  return Promise.reject(new TransError(status, msg, response.data))
}
