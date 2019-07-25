import NodeManager from '../models/NodeManager'
import utils from '../utils'

export default {
  methods: {
    $dispatch(selector, evtName, evtData) {
      const root = this.$root
      let curr = this
      if(curr.$el.matches(selector)) { 
        curr.$emit(evtName, evtData)
      }
      while(!curr.$el.matches(selector) && curr !== root) {
        curr = curr.$parent
        if(curr.$el.matches(selector)) {
          curr.$emit(evtName, evtData)
          return
        }
      } 
    },
    focusContainer(parent) {
      const children = parent.children
      let lastChild = children[children.length - 1]
      if(lastChild.compType !== NodeManager.TextNode) {
        lastChild = NodeManager.createNode(NodeManager.TextNode)
        lastChild.parent = parent
        children.push(lastChild)
      }
      this.$nextTick(() => {
        utils.setElementFocus(lastChild.uid)
      })
    }
  }
}
