import http from '@/utils/http'
import type { Category } from '@/types/category'
export const getRecommendList = () => {
  return http<Category[]>({
    url: '/category/top',
    method: 'GET',
  })
}
