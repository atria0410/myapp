import { camelToSnakeKeys, snakeToCamelKeys } from '@/utils'
import axios from 'axios'

// Axiosインスタンスを作成
const $axios = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json',
  xsrfCookieName: 'CSRF-TOKEN',
  xsrfHeaderName: 'X-CSRF-Token',
  withCredentials: true
})

// リクエストをスネークケースに変換する
$axios.interceptors.request.use(async (config) => {
  if (config.params) {
    config.params = camelToSnakeKeys(config.params)
  }

  if (config.data) {
    config.data = camelToSnakeKeys(config.data)
  }

  return config
})

// レスポンスをキャメルケースに変換する
$axios.interceptors.response.use((response) => {
  if (response.data) {
    response.data = snakeToCamelKeys(response.data)
  }

  return response
})

export default $axios
