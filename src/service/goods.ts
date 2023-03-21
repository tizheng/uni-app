import http from '@/utils/http'
import type { GoodsResult } from '@/types/goods'
// export const getRecommendList = (id: string) => {
//   return http<GoodsResult>({
//     url: 'goods',
//     method: 'GET',
//     data: {
//       id,
//     },
//   })
// }
export const getRecommendList = (id: string) => {
  return http<GoodsResult>({
    method: 'GET',
    url: 'goods',
    data: {
      id,
    },
  })
}
