import NodeManager from '../models/NodeManager'
import helper from '../utils/helper'
import {
  NODE_TYPES,
  SLOT_SUPER_SCRIPT, 
  SLOT_SUB_SCRIPT,
  SLOT_SUPER_VALUE,
  SLOT_SUB_VALUE
} from '../constants'

const hasChildren = (node) => {
  return node
    && node.children
    && node.children.length > 0
}

const hasSlotChildren = (node, slot) => {
  return hasChildren(node) 
    && node.children.filter(item => item.slot === slot).length > 0
}

const getAnyChildren = (node, slot) => {
  if(hasChildren(node)) {
    let children
    if(slot) {
      children = node.children.filter(item => item.slot === slot)
    }
    return children && children.length > 0
      ? children
      : node.children
  }
  return null
}

export default {
  inject: [
    'isPreviewMode',
    'normalFontSize',
    'smallFontSize'
  ],
  computed: {
    // 是否为角标的子节点
    _isScriptChild() {
      const SLOT_SCRIPTS = [
        SLOT_SUPER_SCRIPT,
        SLOT_SUB_SCRIPT
      ]
      let curr = this.model
      while(curr) {
        if(SLOT_SCRIPTS.includes(curr.slot)) {
          return true
        }
        curr = curr.parent
      }
      return false
    },
    _fontStyles() {
      const styles = (size) => ({
        height: `${size + 2}px`,
        lineHeight: `${size + 2}px`,
        fontSize: `${size}px`
      })
      return this._isScriptChild 
        ? styles(this.smallFontSize)
        : styles(this.normalFontSize)
    },
    _numberNodeStyles() {
      const styles = (size) => ({
        minHeight: `${size + 2}px`,
        minWidth: `${size + 2}px`,
        lineHeight: `${size + 2}px`
      })
      return this._isScriptChild 
        ? styles(this.smallFontSize)
        : styles(this.normalFontSize)
    }
  },
  methods: {
    _dispatch(selector, evtName, evtData) {
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
    _focusContainer(parent) {
      const children = parent.children
      let lastChild = children[children.length - 1]
      if(lastChild.compType !== NODE_TYPES.TEXT_NODE) {
        lastChild = NodeManager.createNode(NODE_TYPES.TEXT_NODE)
        lastChild.parent = parent
        children.push(lastChild)
      }
      this.$nextTick(() => {
        helper.setElementFocus(lastChild.uid, lastChild.value.length)
      })
    },
    _dispatchBoundaryDetection(target) {
      this._dispatch('.row-container', 'boundaryDetection', {
        target
      })
    },
    _addFormatListener(target) {
      this.formatObserver = this._addMutationObserver(target, this.format)
    },
    _removeFormatListener() {
      this._removeMutationObserver(this.formatObserver)
    },
    _addMutationObserver(target, callback) {
      const observer = new MutationObserver((mutationsList, observer) => {
        callback.call(this, mutationsList, observer)
      });
      observer.observe(target, {
        attributes: true, 
        childList: true, 
        subtree: true,
        characterData: true
      })
      callback.call(this)
      return observer
    },
    _removeMutationObserver(observer) {
      observer.disconnect();
    },
    format() {
      const splitSize = 6
      const normalHeight = this.normalFontSize + 2
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
        let node = this.$refs['basic-node-' + nodeDeep.uid]
        if(Array.isArray(node)) {
          node = node[0]
        }
        if(diffValue > 0) {
          if(nodeDeep.deep.valueDeep === 1 
            && maxDeep.deep.valueDeep > nodeDeep.deep.valueDeep) {
            diffValue -= 0.5
          }
          let splitValue = maxDeep.deep.valueDeep - nodeDeep.deep.valueDeep
          if(splitValue > 0 && nodeDeep.deep.valueDeep === 1) {
            splitValue -= 0.5
          }
          if(node && node.$el) {
            node.$el.style.top = (diffValue * normalHeight + splitValue * splitSize) + 'px'
          }
        } else if(diffValue === 0) {
          if(node && node.$el) {
            node.$el.style.top = '0px'
          }
        }
      })
    },
    getNodeDeep(node) {
      const getMaxDeep = (list, deepFunc) => {
        let maxDeep = 0
        list.forEach(item => {
          const deep = deepFunc(item, 0)
          if(maxDeep < deep) maxDeep = deep
        })
        return maxDeep
      }
      const getDeep = (slot) => {
        return function getInnerDeep(node, initialDeep) {
          if(!hasChildren(node)) return initialDeep
          if(hasSlotChildren(node, slot)) {
            initialDeep += 1
          }
          const children = getAnyChildren(node, slot)
          if(children) {
            initialDeep += getMaxDeep(children, getInnerDeep)
          }
          return initialDeep
        }
      }
      const normalHeight = this.normalFontSize + 2
      const smallHeight = this.smallFontSize + 2

      const getSuperValueDeep = getDeep(SLOT_SUPER_VALUE)
      const getSubValueDeep = getDeep(SLOT_SUB_VALUE)
      const getSuperScriptDeep = getDeep(SLOT_SUPER_SCRIPT)
      const getSubScriptDeep = getDeep(SLOT_SUB_SCRIPT)

      let superValueDeep = getSuperValueDeep(node, 1)
      let subValueDeep = getSubValueDeep(node, 0)
      let superScriptDeep = getSuperScriptDeep(node, 0)
      let subScriptDeep = getSubScriptDeep(node, 0)
      let valueDeep = superValueDeep

      superScriptDeep = superScriptDeep && (superScriptDeep * (smallHeight/normalHeight) - ((smallHeight/2)/normalHeight))
      const topDeep = valueDeep + superScriptDeep
      console.log('superValueDeep: ', superValueDeep)
      return {
        superValueDeep,
        subValueDeep,
        valueDeep,
        superScriptDeep,
        subScriptDeep,
        topDeep
      }
    }
  }
}
