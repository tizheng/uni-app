/**
 * 小程序登录请求体
 */
export interface LoginData {
  /**
   * code 通过 wx.login() 获取
   */
  code?: string
  iv?: string
  encryptedData?: string // Add ? to only indicate it's optional
}

export interface userInfoResult {
  /**
   * 用户名
   */
  account: string
  /**
   * 用户头像
   */
  avatar: string
  /**
   * 用户id
   */
  id: number
  /**
   * 用户手机号
   */
  mobile: string
  /**
   * 用户昵称
   */
  nickname: null | string
  /**
   * 用于后续接口调用的token，有效期三天
   */
  token: string
}
