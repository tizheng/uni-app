import type { request } from '@/types/request'
const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<request<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success: (res) => {
        resolve(res.data as request<T>)
      },
      fail: (error) => {
        reject(error)
      },
    })
  })
}

export default http
