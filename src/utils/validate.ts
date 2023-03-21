/** 校验项 */
export type Rule = {
  // 非空校验
  required?: boolean // 信息提示
  message: string // 正则校验
  pattern?: RegExp | string
}

/** 校验规则 */
export type Rules = {
  // 类型名称不确定
  // 标识任何字符串都可以当作这里的键
  [key: string]: Rule[]
}

/**
 * @description 验证表单数据
 * @param form 表单数据
 * @param rules 校验规则
 */
export function validate(form: AnyObject, rules: Rules) {
  // 遍历规则 form 表单是对象 for in
  for (const key in rules) {
    const ruleList = rules[key]
    for (let i = 0; i < ruleList.length; i++) {
      const rule = ruleList[i] // 处理验证规则，非空转换成正则写法，方便统一判断
      if (rule.required) rule.pattern = /\S+/ // \S 匹配空格（各种符号）, + 一个或一个以上 // 兼容用户书写字符串格式的正则
      const reg = new RegExp(rule.pattern as RegExp | string) // 数据验证 ， /\S+/.test(undefined) 为true ， 修复为空字符串
      if (!reg.test(form[key] || '')) {
        // 校验失败，提示用户
        uni.showToast({
          title: rule.message,
          icon: 'none',
        }) // 直接退出校验函数，返回检验失败的结果
        return false
      }
    }
  } // 检验通过
  return true
}
