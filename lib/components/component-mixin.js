import NodeManager from '../models/NodeManager'
import helper from '../utils/helper'
import {
  SLOT_SUPER_SCRIPT, 
  SLOT_SUB_SCRIPT,
  SLOT_SUPER_VALUE,
  SLOT_SUB_VALUE
} from '../constants'

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
      const splitSize = 6
      const boxSize = 28
      const deeps = this.model.children.map(child => ({
        uid: child.uid,
        deep: this.getNodeDeep(child)
      })).sort((pre,next) => {
        return pre.deep.topDeep > next.deep.topDeep
          ? -1
          : pre.deep.topDeep === next.deep.topDeep
            ? 0
            : 1
      })
      const maxDeep = deeps[0]
      deeps.forEach((nodeDeep, index) => {
        let diffValue = maxDeep.deep.topDeep - nodeDeep.deep.topDeep
        if(diffValue > 0) {
          if(nodeDeep.deep.valueDeep === 1 
            && maxDeep.deep.valueDeep > nodeDeep.deep.valueDeep) {
            diffValue -= 0.5
          }
          if(maxDeep.deep.valueDeep - 1 > nodeDeep.deep.superScriptDeep) {
            diffValue -= nodeDeep.deep.superScriptDeep
          }
          let splitValue = maxDeep.deep.valueDeep - nodeDeep.deep.valueDeep
          if(splitValue > 0 && nodeDeep.deep.valueDeep === 1) {
            splitValue -= 0.5
          }
          let node = this.$refs['basic-node-' + nodeDeep.uid]
          if(Array.isArray(node)) {
            node = node[0]
          }
          if(node && node.$el) {
            node.$el.style.top = (diffValue * boxSize + splitValue * splitSize) + 'px'
          }
        }
      })
    },
    getNodeDeep(node) {
      const hasSpecialSlot = (node, slot) => {
        return node 
          && node.children 
          && node.children.length > 0
          && node.children.filter(item => item.slot === slot).length > 0
      }
      const getValueDeep = (node, deep) => {
        let children = node.children
        if(!children || children.length === 0) return deep
        let superValueChilren
        if(hasSpecialSlot(node, SLOT_SUPER_VALUE) 
          && hasSpecialSlot(node, SLOT_SUB_VALUE)) {
          superValueChilren = children.filter(item => item.slot === SLOT_SUPER_VALUE)
          deep += 1
        }
        let maxDeep = 0
        if(superValueChilren) {
          superValueChilren.forEach((child) => {
            const newDeep = getValueDeep(child, 0)
            if(maxDeep < newDeep) {
              maxDeep = newDeep
            }
          })
        } else {
          children.forEach((child) => {
            const newDeep = getValueDeep(child, 0)
            if(maxDeep < newDeep) {
              maxDeep = newDeep
            }
          })
        }
        deep += maxDeep
        return deep
      }
      const getSuperScriptDeep = (node, deep) => {
        if(!node.children 
          || node.children.length === 0) return deep
        if(hasSpecialSlot(node, SLOT_SUPER_SCRIPT)) {
          deep += 1
        }
        const children = node.children.filter(item => {
          return item.slot === SLOT_SUPER_SCRIPT
        })
        let maxDeep = 0
        children.forEach((child) => {
          const newDeep = getSuperScriptDeep(child, 0)
          if(maxDeep < newDeep) {
            maxDeep = newDeep
          }
        })
        deep += maxDeep
        return deep
      }
      const getSubScriptDeep = (node, deep) => {
        if(!node.children 
          || node.children.length === 0) return deep
        if(hasSpecialSlot(node, SLOT_SUB_SCRIPT)) {
          deep += 1
        }
        const children = node.children.filter(item => {
          return item.slot === SLOT_SUB_SCRIPT
        })
        let maxDeep = 0
        children.forEach((child) => {
          const newDeep = getSubScriptDeep(child, 0)
          if(maxDeep < newDeep) {
            maxDeep = newDeep
          }
        })
        deep += maxDeep
        return deep
      }
      const valueDeep = getValueDeep(node, 1)
      let superScriptDeep = getSuperScriptDeep(node, 0)
      const subScriptDeep = getSubScriptDeep(node, 0)
      superScriptDeep = superScriptDeep * 0.5
      const topDeep = valueDeep + superScriptDeep
      return {
        valueDeep,
        superScriptDeep,
        subScriptDeep,
        topDeep
      }
    }
  }
}
