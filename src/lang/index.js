import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import locale from 'element-ui/lib/locale'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import enLocale from './en'
import zhLocale from './zh'
//
const contextEN = require.context('@/page', true, /\.en.js$/)
const contextZH = require.context('@/page', true, /\.zh.js$/)
function moduleStore(context) {
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
  return moduleStores
}
const moduleEN = moduleStore(contextEN)
const moduleZH = moduleStore(contextZH)
//
const messages = {
  en: {
    ...moduleEN,
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...moduleZH,
    ...zhLocale,
    ...elementZhLocale
  }
}
Vue.use(VueI18n)
const i18n = new VueI18n({
  // set locale
  // options: en | zh
  locale: Cookies.get('language') || 'zh',
  // set locale messages
  messages
})
locale.i18n((key, value) => i18n.t(key, value))
export default i18n
