import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局样式
import '@/assets/css/global.css'
// andriod样式
// import '@/assets/css/andriod/global.css'
import '@/assets/iconfont/iconfont.css'
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

// loading插件
app.directive('load', {
    mounted(el, binding) {
        function _setAttributes(element, attributes) {
            Object.keys(attributes).forEach((attr) => {
                element.style[attr] = attributes[attr]
            })
        }
        const img_style = {
            // margin: 'auto',
            position: 'absolute',
            left: '50%',
            top: '100px',
            transform: 'translate(-50%, 0px)',
        }
        const wrapper_style = {
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
            // display: 'flex',
            zIndex: '2000',
            backgroundColor: 'rgb(255 255 255 / 100%)',
            transition: 'opacity .3s',
        }
        let loading = require('@/assets/img/loading-4.gif')

        if (binding.value) {
            console.log('正在加载')
            let img = document.createElement('img')
            img.src = loading
            _setAttributes(img, img_style)
            let wrapper = document.createElement('div')
            wrapper.className = 'loading-wrapper'
            _setAttributes(wrapper, wrapper_style)
            wrapper.appendChild(img)
            el.style.position = 'relative'
            el.appendChild(wrapper)
        }
    },
    updated(el, binding) {
        let wrapper = document.querySelector('.loading-wrapper')
        if (binding.value && wrapper) {
            wrapper.style.display = 'block'
        }
        if (!binding.value) {
            console.log('结束')
            wrapper.style.display = 'none'
        }
    }
})

app.use(store).use(router).use(lazyPlugin, {
    loading: require('./assets/img/loading-3.gif'), // 图片加载时默认图片
    error: require('./assets/img/error.jpg')// 图片加载失败时默认图片
}).mount('#app')
