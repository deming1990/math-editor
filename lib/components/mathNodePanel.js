import Vue from 'vue'
import MathNodePanel from './MathNodePanel.vue'

const MathNodePanelCtr = Vue.extend(MathNodePanel)

const removeDom = (el) => {
  el.parentNode && el.parentNode.removeChild(el)
}

MathNodePanelCtr.prototype.close = function() {
  removeDom()
}

export default function (rootEle, options) {
  const instance = new MathNodePanelCtr({
    el: document.createElement('div')
  })
  rootEle.appendChild(instance.$el)
  Vue.nextTick(() => {
    instance.category = options.category
    instance.onMathNodeSelect = options.onMathNodeSelect
  })
}
