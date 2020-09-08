import { DirectiveBinding } from 'vue/types/options'
import { VNode } from 'vue'

export default {
  bind (el: any, binding: DirectiveBinding, vnode: VNode) {
    el.tooltipAppend = () => {
      // 插入的目的节点元素
      const des = binding.value || el.parentElement
      // 获取tooltip的节点元素popper
      const popper = vnode.componentInstance && vnode.componentInstance.$refs.popper as Element
      // 将popper插入目的节点元素
      if (popper && des && !document.getElementById(popper.id)) {
        des.appendChild(popper)
      }
    }

    el.removeEventListener('mouseenter', el.tooltipAppend)
    el.addEventListener('mouseenter', el.tooltipAppend)
  },
  unbind (el: any) {
    el.removeEventListener('mouseenter', el.tooltipAppend)
  }
}
