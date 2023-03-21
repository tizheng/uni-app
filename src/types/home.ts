export interface getBannerItem {
  /**
   * 跳转链接
   */
  hrefUrl: string
  /**
   * id
   */
  id: string
  /**
   * banner链接
   */
  imgUrl: string
  /**
   * 跳转类型1、页面2、H5 3、小程序（小程序使用）
   */
  type: number
}

export type getBannerList = getBannerItem[]

/**
 * 数据
 */
export interface category {
  /**
   * 展示图标
   */
  icon: string
  /**
   * id
   */
  id: string
  /**
   * 分类名称
   */
  name: string
}

export type getCategoryList = category[]

export interface getHotList {
  /**
   * 推荐说明
   */
  alt: string
  /**
   * id
   */
  id: string
  /**
   * 图片集合
   */
  pictures: string[]
  /**
   * 跳转地址
   */
  target: string
  /**
   * 推荐标题
   */
  title: string
  /**
   * 推荐类型
   */
  type: string
}
export type getHotListRES = getHotList[]
export interface NewList {
  /**
   * 备注
   */
  desc: string
  /**
   * id
   */
  id: string
  /**
   * 商品名称
   */
  name: string
  /**
   * 商品图片链接
   */
  picture: string
  /**
   * 价格
   */
  price: number
}
export type getNewListRES = NewList[]
export interface guessLikeList {
  /**
   * 总条数
   */
  counts: number
  /**
   * 当前页数据
   */
  items: guessLikeItem[]
  /**
   * 当前页数
   */
  page: number
  /**
   * 总页数
   */
  pages: number
  /**
   * 每页条数
   */
  pageSize: number
}

export interface guessLikeItem {
  /**
   * 商品描述
   */
  desc: string
  /**
   * 商品折扣
   */
  discount: number
  /**
   * id
   */
  id: string
  /**
   * 商品名称
   */
  name: string
  /**
   * 商品已下单数量
   */
  orderNum: number
  /**
   * 商品图片
   */
  picture: string
  /**
   * 商品价格
   */
  price: number
}
export type guessLikeListReES = guessLikeItem[]
