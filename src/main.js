// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import iView from 'iview'
import router from './router'
import Cookies from 'js-cookie'
import App from './App'
import 'iview/dist/styles/iview.css'
import '@/assets/locale'
// import VueI18n from 'vue-i18n'

// Vue.use(VueI18n)
// Vue.use(iView)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (!Cookies.get('user') && to.name !== 'login') { // 判断是否已经登录且前往的页面不是登录页
    document.title = 'Login'
    next({
      name: 'login'
    })
  } else if (Cookies.get('user') && to.name === 'login') { // 判断是否已经登录且前往的是登录页
    document.title = 'Vue Demo'
    next({
      name: 'dashboard'
    })
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
