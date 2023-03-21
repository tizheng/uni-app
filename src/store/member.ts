import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
//引入登陆类型
import { userInfoResult } from '@/types/login'

export const useUserStore = defineStore(
  'member',
  () => {
    const profile = ref<userInfoResult>({} as userInfoResult)

    //判断是否登录
    const setUser = (user: userInfoResult) => {
      profile.value = user
    }
    const isLogin = computed(() => {
      return profile.value?.token
    })
    return {
      profile,
      setUser,
      isLogin,
    }
  },
  {
    persist: {
      // 需要自定义 缓存的方式
      storage: {
        getItem(key: any) {
          // 小程序端如何去获取数据呢？
          return wx.getStorageSync(key)
        },
        setItem(key: any, value: any) {
          // 缓存的时候，小程序端如何去缓存数据呢？
          wx.setStorageSync(key, value)
        },
      },
    },
  }
)
