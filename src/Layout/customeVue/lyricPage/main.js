import { createVNode, render } from "vue";
import lyricPage from './lyricPage.vue'



// let timer=null


export default () => {

    const div = document.createElement('div')

    div.setAttribute('class', 'lyricWrapper')

    document.body.appendChild(div)

    const vnode = createVNode(lyricPage);
    render(vnode, div);
    // clearTimeout(timer)
}