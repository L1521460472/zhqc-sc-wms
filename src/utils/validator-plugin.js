//

const Validator = {
  // 手机规则校验器
  getMobileValidator() {
    const isMobile = /^1[3|4|5|7|8][0-9]\d{8}$/
    const validMobile = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号码'))
      } else if (!isMobile.test(value)) {
        callback(new Error('请输入正确的11位手机号码'))
      } else {
        callback()
      }
    }
    return validMobile
  },
  // 用户名规则校验器
  getUserNameValidator() {
    const isUserName = /^[\u4E00-\u9FA5]+$/
    const validUserName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else if (!isUserName.test(value)) {
        callback(new Error('用户名只能为中文'))
      } else {
        callback()
      }
    }
    return validUserName
  },

  // 数字（正整数和0）规则校验器
  getIntegerValidator() {
    const isInteger = /^([1-9]\d*|[0]{1,1})$/
    const validInteger = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入数字'))
      } else if (!isInteger.test(value)) {
        callback(new Error('请输入正确数字'))
      } else {
        callback()
      }
    }
    return validInteger
  },
  // 数字（正整数和0）规则校验器
  getIntegerValidatorAllowNull() {
    const isInteger = /^([1-9]\d*|[0]{1,1})$/
    const validInteger = (rule, value, callback) => {
      if (value && !isInteger.test(value)) {
        callback(new Error('请输入正确数字'))
      } else {
        callback()
      }
    }
    return validInteger
  },
  // 身份证号规则校验器
  getCardIDValidator() {
    const isCardID = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    const validCardID = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入身份证号'))
      } else if (!isCardID.test(value)) {
        callback(new Error('您输入的身份证号不正确!'))
      } else {
        callback()
      }
    }
    return validCardID
  },
  // qq号规则校验器
  getQQValidator() {
    const isQQ = /^[1-9][0-9]{4,10}$/
    const validQQ = (rule, value, callback) => {
      if (!value) {
        callback(new Error('您输入的QQ号'))
      } else if (!isQQ.test(value)) {
        callback(new Error('您输入的QQ号不正确'))
      } else {
        callback()
      }
    }
    return validQQ
  },
  // 邮箱规则校验器
  getEmailValidator() {
    const isEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
    const validEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error('您输入您的邮箱'))
      } else if (!isEmail.test(value)) {
        callback(new Error('您输入的邮箱不正确'))
      } else {
        callback()
      }
    }
    return validEmail
  },
  // 座机号规则校验器
  getPhoneValidator() {
    const isPhone = /^0\d{2,3}-\d{7,8}$/
    const validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入座机号码'))
      } else if (!isPhone.test(value)) {
        callback(new Error('请输入正确的座机号码'))
      } else {
        callback()
      }
    }
    return validPhone
  },
  // 货币数字（最多带两位小数）
  getMoneynumValidator() {
    const isMoneynum = /^([1-9]\d*|0)(\.[\d]{1,2})?$/
    const validMoneynum = (rule, value, callback) => {
      value = value + ''
      if (!value) {
        callback(new Error('请输入数字'))
      } else if (!isMoneynum.test(value)) {
        callback(new Error('请输入正确的数字，最多保留两位小数!'))
      } else {
        callback()
      }
    }
    return validMoneynum
  },
  // 温度数字（最多带两位小数）
  getTempValidatorAllowNull() {
    const isTemp = /^([-])?([1-9]\d*|0)(\.[\d]{1,2})?$/
    const validMoneynum = (rule, value, callback) => {
      if (value && !isTemp.test(value)) {
        callback(new Error('请输入正确的数字，最多保留两位小数!'))
      } else {
        callback()
      }
    }
    return validMoneynum
  },
  // 重量数字（最多带三位小数）
  getWeightValidatorAllowNull() {
    const isTemp = /^([-])?([1-9]\d*|0)(\.[\d]{1,3})?$/
    const validMoneynum = (rule, value, callback) => {
      if (value && !isTemp.test(value)) {
        callback(new Error('请输入正确的数字，最多保留三位小数!'))
      } else {
        callback()
      }
    }
    return validMoneynum
  },
  // 数字（最多带六位小数）
  getNumberValidatorAllowNullMaxSix() {
    const isTemp = /^([-])?([1-9]\d*|0)(\.[\d]{1,6})?$/
    const validMoneynum = (rule, value, callback) => {
      if (value && !isTemp.test(value)) {
        callback(new Error('请输入正确的数字，最多保留六位小数!'))
      } else {
        callback()
      }
    }
    return validMoneynum
  },
  // 密码规则校验器
  getPassWordValidator() {
    const isPassword = /^(\w){6,20}$/
    const validPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else if (!isPassword.test(value)) {
        callback(new Error('只能输入6-20个字母、数字、下划线'))
      } else {
        callback()
      }
    }
    return validPassword
  }
}
//
const context = require.context('@/page', true, /\.ru.js$/)
const moduleStores = {}
context.keys().forEach(key => {
  const fileName = key.split('/')
  const size = fileName.length
  const modName = fileName[size - 1].split('.')[0]
  const fileModule = context(key).default
  moduleStores[modName] = {
    ...fileModule
  }
})
//
const newObj = {}
for (const i in moduleStores) {
  Object.assign(newObj, moduleStores[i])
}

export default {
  install: function(Vue) {
    Object.defineProperty(Vue.prototype, '$valid', { value: { ...Validator, ...newObj }})
  }
}
