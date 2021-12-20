import Vue from 'vue'
import 'xe-utils'
import App from './App'
import router from './router'
import zhqcPlugin from './plugin/index'
import store from './store'
import i18n from './lang'
Vue.use(zhqcPlugin)
import '@/icons' // icon
import _ from 'lodash'
Vue.prototype._ = _
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  created() {
    //
    const queryParam = window.location.search
    if (queryParam && queryParam !== '') {
      //
    } else {
      const token = window.sessionStorage.getItem('token')
      if (token) {
        this.tokenLogin(token)
      } else {
        store.dispatch('login/getSsoUrl').then(() => {
          const resp = store.state.login.ssoUrlResp
          if (resp.code === 200) {
            const loginUrl = resp.obj.ssoLoginUrl
            window.location = loginUrl
          }
        })
      }

      // let loginUrl = window.localStorage.getItem('loginUrl')
      // let ssoUrl = window.localStorage.getItem('ssoUrl')

      // if (!ssoUrl || !loginUrl) {
      //   store.dispatch('login/getSsoUrl').then(() => {
      //     const resp = store.state.login.ssoUrlResp
      //     if (resp.code === 200) {
      //       ssoUrl = resp.obj.ssoUrl
      //       loginUrl = resp.obj.ssoLoginUrl
      //       window.localStorage.setItem('ssoUrl', ssoUrl)
      //       window.localStorage.setItem('loginUrl', loginUrl)
      //       const token = window.localStorage.getItem('token')
      //       if (token) {
      //         this.tokenLogin(ssoUrl, token)
      //       } else {
      //         window.location = loginUrl
      //       }
      //     }
      //   })
      // } else {
      //   const token = window.localStorage.getItem('token')
      //   if (token) {
      //     this.tokenLogin(ssoUrl, token)
      //   } else {
      //     window.location = loginUrl
      //   }
      // }
    }
  },
  methods: {
    tokenLogin() {
      this.$store.dispatch('login/tokenLogin', { router: router }).then(() => {
        const resp = this.$store.state.login.tokenLoginResp
        if (resp && resp.code === 200) {
          // console.log('addRouters:', this.$store.state.login.addRouters)
          this.$router.addRoutes(this.$store.state.login.addRouters)
          this.$router.push('/')
        }
      })
    }
  },
  template: '<App/>'
})

