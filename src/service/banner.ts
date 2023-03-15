import type {
  getBannerList,
  getCategoryList,
  getHotListRES,
  getNewListRES,
  guessLikeListReES,
} from '@/types/home'
import http from '@/utils/http'
export const getBanner = (distributionSite: number = 1) => {
  return http<getBannerList>({
    url: 'https://pcapi-xiaotuxian-front.itheima.net/home/banner',
    method: 'GET',
    data: {
      distributionSite,
    },
  })
}
export const getCategory = () => {
  return http<getCategoryList>({
    url: 'https://pcapi-xiaotuxian-front.itheima.net/home/category/mutli',
    method: 'GET',
  })
}
export const getHotMutlis = () => {
  return http<getHotListRES>({
    url: 'https://pcapi-xiaotuxian-front.itheima.net/home/hot/mutli',
    method: 'GET',
  })
}
export const getNewList = (limit: number = 4) => {
  return http<getNewListRES>({
    url: 'https://pcapi-xiaotuxian-front.itheima.net/home/new',
    method: 'GET',
    data: {
      limit,
    },
  })
}
export const getGuessLike = (page: number = 1, pageSize: number = 10) => {
  return http<guessLikeListReES>({
    url: 'https://pcapi-xiaotuxian-front.itheima.net/home/goods/guessLike',
    method: 'GET',
    data: {
      page,
      pageSize,
    },
  })
}
