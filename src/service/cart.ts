import http from '@/utils/http'
import type { CartResult, cartListResult } from '@/types/cart'
export const addCarts = (skuId: string, count: number) => {
  return http<CartResult[]>({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count,
    },
  })
}
export const getCarts = () => {
  return http<cartListResult[]>({
    url: '/member/cart',
    method: 'GET',
  })
}
export const checkAll = (selected: boolean, ids: string[]) => {
  return http({
    url: '/member/cart/selected',
    method: 'PUT',
    data: {
      selected,
      ids,
    },
  })
}
export const updateChecked = (
  id: string,
  data: {
    selected?: boolean
    count?: number
  }
) => {
  // debugger
  console.log(data.count)
  return http<cartListResult[]>({
    url: `member/cart/${id}`,
    method: 'PUT',
    data,
  })
}
