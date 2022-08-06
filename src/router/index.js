import Vue from 'vue'
import VueRouter from 'vue-router'
import dashboard from '../views/Dashboard'
import store from '../store/'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home'),
    beforeEnter: (to, from, next)=>{
      if(store.getters.getAuth){
        return  next({
          name:'Dashboard'
        });
      }

      next()
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard'),
    beforeEnter: (to, from, next) => {
      if(!store.getters.getAuth)
      {
        return next({
          name:'home'
        })
      }

      next();
    }
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
