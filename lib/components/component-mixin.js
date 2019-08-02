import NodeManager from '../models/NodeManager'
import helper from '../utils/helper'
import {SLOT_SUPER_SCRIPT, SLOT_SUB_SCRIPT} from '../constants'

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
        helper.setElementFocus(lastChild.uid, lastChild.value.length)
      })
    },
    dispatchBoundaryDetection(target) {
      this.$dispatch('.row-container', 'boundaryDetection', {
        target
      })
    },
    addFormatListener(target) {
      this.observer = new MutationObserver((mutationsList, observer) => {
        const modified = mutationsList.filter((item) => ['childList', 'subtree'].includes(item.type)).length > 0
        if(modified) {
          this.format()
        }
      });
      this.observer.observe(target, {
        attributes: false, 
        childList: true, 
        subtree: true
      })
      this.format()
    },
    removeFormatListener() {
      this.observer.disconnect();
    },
    format() {
      const maxDeep = this.getNodeDeep(this.model)
      console.log('maxDeep: ', maxDeep)
      this.model.children.forEach((child) => {
        const nodeDeep = this.getNodeDeep(child)
        console.log('nodeDeep: ', nodeDeep)
        if(nodeDeep < maxDeep) {
          let node = this.$refs['basic-node-' + child.uid]
          if(Array.isArray(node)) {
            node = node[0]
          }
          if(node && node.$el) {
            const diffValue = maxDeep - nodeDeep
            if(nodeDeep === 1) {
              node.$el.style.top = `${(diffValue * 20 - 10) + (diffValue - 0.5) * 6}px`
            } else if(nodeDeep > 1) {
              node.$el.style.top = `${(diffValue * 20) + (diffValue * 6)}px`
            }
          }
        }
      })
    },
    getNodeDeep(node) {
      const nodeDeep = (node, count) => {
        let deep = 0
        if(NodeManager.isFractionsNode(node)) {
          deep += 1
        }
        if(node.children && node.children.length > 0) {
          let max = 0
          const children = node.children
          children.forEach((child) => {
            const newDeep = nodeDeep(child, 0)
            if(max < newDeep) {
              max = newDeep
            }
          })
          deep += max
        }
        return count + deep
      }
      return nodeDeep(node, 1)
    }
  }
}
