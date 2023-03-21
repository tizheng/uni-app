export interface CartResult {
  /**
   * 属性文字，例如“颜色:瓷白色 尺寸：8寸”
   */
  attrsText: string
  /**
   * 数量
   */
  count: number
  /**
   * 折扣信息
   */
  discount: number | null
  /**
   * SPUID
   */
  id: string
  /**
   * 是否收藏
   */
  isCollect: boolean
  /**
   * 是否为有效商品
   */
  isEffective: boolean
  /**
   * 商品名称
   */
  name: string
  /**
   * 当前的价格
   */
  nowPrice: string
  /**
   * 商品图片
   */
  picture: string
  /**
   * 加入时价格
   */
  price: string
  /**
   * 是否选中
   */
  selected: boolean
  /**
   * SKUID
   */
  skuId: string
  /**
   * 库存
   */
  stock: number
}

/**
 * 数据信息
 */
export interface cartListResult {
  /**
   * 属性文字，例如“颜色:瓷白色 尺寸：8寸”
   */
  attrsText: string
  /**
   * 数量
   */
  count: number
  /**
   * 折扣信息
   */
  discount: number
  /**
   * SPUID
   */
  id: string
  /**
   * 是否收藏
   */
  isCollect: boolean
  /**
   * 是否为有效商品
   */
  isEffective: boolean
  /**
   * 商品名称
   */
  name: string
  /**
   * 当前的价格
   */
  nowPrice: number
  /**
   * 图片
   */
  picture: string
  /**
   * 加入时价格
   */
  price: number
  /**
   * 是否选中
   */
  selected: boolean
  /**
   * SKUID
   */
  skuId: string
  /**
   * 库存
   */
  stock: number
}

/**
 * empty object
 */

export interface UpdateCartResult {
  /**
   * 属性文字，例如“颜色:瓷白色 尺寸：8寸”
   */
  attrsText: string
  /**
   * 数量
   */
  count: number
  /**
   * 折扣信息
   */
  discount: number
  /**
   * id
   */
  id: string
  /**
   * 是否收藏
   */
  isCollect: boolean
  /**
   * 是否为有效商品
   */
  isEffective: boolean
  /**
   * 商品名称
   */
  name: string
  /**
   * 当前的价格
   */
  nowPrice: number
  /**
   * 图片
   */
  picture: string
  /**
   * 加入时价格
   */
  price: number
  /**
   * 是否选中
   */
  selected: boolean
  /**
   * SKUID
   */
  skuId: string
  /**
   * 库存
   */
  stock: number
}
