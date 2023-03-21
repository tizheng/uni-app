import http from '@/utils/http'
import { AddressList, AddAddress } from '@/types/address'

export const getAddressList = () => {
  return http<AddressList>({
    url: '/member/address',
    method: 'GET',
  })
}
export const editAddress = (data: AddAddress) => {
  return http<AddressList>({
    url: `/member/address/${data.id}`,
    method: 'PUT',
    data,
  })
}
export const addAddress = (data: AddAddress) => {
  return http<{
    id: number
  }>({
    url: '/member/address',
    method: 'POST',
    data,
  })
}
export const delAddress = (id: String) => {
  return http<{
    id: number
  }>({
    url: `/member/address/${id}`,
    method: 'DELETE',
  })
}
export const getAddress = (id: String) => {
  return http<AddAddress>({
    url: `/member/address/${id}`,
    method: 'GET',
  })
}
