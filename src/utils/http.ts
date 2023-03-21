import { useUserStore } from '@/store/member'
import type { request } from '@/types/request'
import { storeToRefs } from 'pinia'
const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net/'
const httpRequest = {
  invoke(args: UniApp.RequestOptions) {
    // request 触发前拼接 url
    const member = useUserStore()
    const { profile } = storeToRefs(member)
    args.url = baseURL + args.url
    args.header = {
      ...args.header,
      'source-client': 'miniapp',
      Authorization: `Bearer ${profile.value.token}`,
    }
  },
}

uni.addInterceptor('uploadFile', httpRequest)

uni.addInterceptor('request', httpRequest)

const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<request<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success: (res) => {
        //判断状态码是否为200，如果是200则返回数据，如果状态码是401则跳转到登录页面，如果是其他状态码则提示错误信息
        if (res.statusCode === 200) {
          resolve(res.data as request<T>)
        } else if (res.statusCode === 401) {
          //token过期请重新登录
          uni.showToast({
            title: 'token过期',
          })
          reject('token过期')
          //跳转到登录页面
          setTimeout(() => {
            uni.navigateTo({
              url: '/pages/login/index',
            })
          }, 1500)
        }
      },
      fail: (error) => {
        reject(error)
      },
    })
  })
}

export default http
