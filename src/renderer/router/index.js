import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/web/',
      name: 'web-page',
      component: require('@/components/WebPage').default,
      props: true
    },
    {
      path: '/setting',
      name: 'setting-page',
      component: require('@/components/WebPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
