import { createVNode, render } from 'vue'

import jConfirm from './jConfirm.vue'

// const div=document.createElement('div');

// div.setAttribute('class','confirm-wrapper')

// document.body.appendChild(div)

export default ({ text, title }) => {
    return new Promise((reslove, reject) => {

        let confirmWrapper = document.querySelector('.confirm-wrapper')
        console.log(confirmWrapper)

        // 封装组件属性方法
        const confirmCallBack = () => {
            console.log('确认')
            //调用完毕后应该清空节点
            // confirmWrapper = document.querySelector('.confirm-wrapper')
            // confirmWrapper.setAttribute('style', 'display:none')

            render(null, document.body)
            // confirmWrapper.remove();
            reslove(true) 
        }

        // 封装组件属性方法
        const cancelCallBack = () => {
            console.log('取消')
            //清空节点
            // confirmWrapper = document.querySelector('.confirm-wrapper')
            // confirmWrapper.setAttribute('style', 'display:none')
            render(null, document.body);
            // confirmWrapper.remove();
            reject()
        }

        // 在此处才创建节点并挂载属性
        const VNode = createVNode(jConfirm, {
            title,
            text,
            cancelCallBack,
            confirmCallBack
        })
        // if (confirmWrapper) {
        //     confirmWrapper.setAttribute('style', 'display:flex')
        // }
        // if (!confirmWrapper) {
            render(VNode, document.body);
        // }
    })

    // const vnode=createVNode(jConfirm,{text,title})

    // render(vnode,document.body)

}