import axios from 'axios'
import { parseCookies } from 'nookies'
import { AUTH_TOKEN_NAME } from '../constants/auth.constants'

export function getAPIClient(ctx?: any) {
  const { [AUTH_TOKEN_NAME]: token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { "Content-Type": 'application/json', "Access-Control-Allow-Origin": '*' }
  })

  // api.interceptors.request.use((config) => {
  //   console.log({ config })

  //   return config
  // })

  api.interceptors.response.use(
    (response) => {
      console.log({ response })

      return response
    },
    (error) => {
      const { code, status } = error
      console.log({ code, status })
      if (code === 403) {
        console.log({ code })
      }

      return Promise.reject(error)
    }
  )

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`
  }

  return api
}
