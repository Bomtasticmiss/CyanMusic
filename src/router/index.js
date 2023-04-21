import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import store from '@/store'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.isCheck) {
    console.log(store.state.isLogin)
    if (store.state.isLogin){
      next()
    }
  }else{
    next()
  }
})

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = 'cyanMusic'
  }
})
export default router
