import http from '@/utils/http'
import { LoginData } from '@/types/login'
import { userInfoResult } from '@/types/login'

export const login = (data: LoginData) => {
  return http<userInfoResult>({
    url: '/login/wxMin',
    method: 'POST',
    data,
  })
}
export const testLogin = (phoneNumber: string) => {
  return http<userInfoResult>({
    url: '/login/wxMin/simple',
    method: 'POST',
    data: {
      phoneNumber,
    },
  })
}
