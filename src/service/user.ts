import http from '@/utils/http'
import type { UserInfo, PutMemberProfileData } from '@/types/user'
import { useUserStore } from '@/store/member'
import { storeToRefs } from 'pinia'
const member = useUserStore()
const { profile } = storeToRefs(member)
export const getUserInfo = () => {
  return http<UserInfo>({
    url: '/member/profile',
    method: 'GET',
  })
}
export const editUserInfo = (data: PutMemberProfileData) => {
  return http<UserInfo>({
    url: '/member/profile',
    method: 'PUT',
    data: data,
  })
}
export const uploadFileWithUrl = (
  url: string,
  filePath: string,
  name: string
) => {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url,
      filePath,
      name,
      success(res) {
        //修改成功消息
        uni.showToast({
          title: '上传头像成功',
        })
        resolve(res.data as string)
        //do something
        //回到上一级
      },
      fail(err) {
        reject(err)
        uni.showToast({
          title: '上传头像失败',
        })
      },
    })
  })
}
