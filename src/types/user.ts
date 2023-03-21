/**
 * 返回信息
 */
export interface UserInfo {
  /**
   * 账号名称
   */
  account: string
  /**
   * 头像
   */
  avatar: string
  /**
   * 生日
   */
  birthday: string
  /**
   * 省市区的名称：如山东省济南市里历下区
   */
  fullLocation: string
  /**
   * 性别，男、女、未知
   */
  gender: Gender
  /**
   * 用户Id
   */
  id: string
  /**
   * 昵称
   */
  nickname: string
  /**
   * 职业
   */
  profession: string
}

/**
 * 性别，男、女、未知
 */
export enum Gender {
  女 = '女',
  未知 = '未知',
  男 = '男',
}

export interface PutMemberProfileData {
  /**
   * 生日 YYYY-MM-DD
   */
  birthday?: string | null
  /**
   * 城市编码
   */
  cityCode?: string | null
  /**
   * 区/县编码
   */
  countyCode?: string | undefined
  /**
   * 性别，男、女、未知
   */
  gender?: Gender | undefined
  /**
   * 昵称
   */
  nickname?: string | null
  /**
   * 职业
   */
  profession?: string | null
  /**
   * 省份编码
   */
  provinceCode?: string | undefined
  fullLocation?: string | undefined
}
