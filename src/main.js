import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局样式
import '@/assets/css/global.css'
import '@/assets/font-awesome-4.7.0/css/font-awesome.min.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//全局注册所有图标
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(store).use(router).mount('#app')
