import type {
  getBannerList,
  getCategoryList,
  getHotListRES,
  getNewListRES,
  guessLikeList,
} from '@/types/home'
import http from '@/utils/http'
export const getBanner = (distributionSite: number = 1) => {
  return http<getBannerList>({
    url: 'home/banner',
    method: 'GET',
    data: {
      distributionSite,
    },
  })
}
export const getCategory = () => {
  return http<getCategoryList>({
    url: 'home/category/mutli',
    method: 'GET',
  })
}
export const getHotMutlis = () => {
  return http<getHotListRES>({
    url: 'home/hot/mutli',
    method: 'GET',
  })
}
export const getNewList = (limit: number = 4) => {
  return http<getNewListRES>({
    url: 'home/new',
    method: 'GET',
    data: {
      limit,
    },
  })
}
export const getGuessLike = (page: number = 1, pageSize: number = 10) => {
  return http<guessLikeList>({
    url: '/goods/guessLike',
    method: 'GET',
    data: {
      page,
      pageSize,
    },
  })
}
