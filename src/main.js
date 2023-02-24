import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局样式
import '@/assets/css/global.css'
//引入第三方图标库
import '@/assets/font-awesome-4.7.0/css/font-awesome.min.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import lazyPlugin from 'vue3-lazy'

//全局注册所有图标
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


 
// Vue.use(VueLazyload)
 
// with options
// Vue.use(VueLazyload, {
//   preLoad: 1.9,
//   error: require('./assets/img/error.jpg'),
//   loading:  require('./assets/img/loading.gif'),
//   attempt: 3
// })

app.use(store).use(router).use(lazyPlugin, {
    loading: require('./assets/img/loading.gif'), // 图片加载时默认图片
    error: require('./assets/img/error.jpg')// 图片加载失败时默认图片
  }).mount('#app')
