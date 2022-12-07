import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import foot from '@/components/foot'
import signup from '@/components/signup'
import login from '@/components/login'
import user from '@/components/user'
import account from '@/components/account'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'foot',
      component: foot
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/account',
      name: 'account',
      component: account
    }
  ]
})
