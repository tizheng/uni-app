import http from '@/utils/http'
//引入推荐类型
import type { PreferenceDataResult } from '@/types/recommends'
//引入公共类型
import type { PagePrams } from '@/types/common'
export type hotPreferenceType = PagePrams & {
  subType?: string
}
export const getRecommendList = (url: string, data: hotPreferenceType) => {
  return http<PreferenceDataResult>({
    url: url,
    method: 'GET',
    data,
  })
}
