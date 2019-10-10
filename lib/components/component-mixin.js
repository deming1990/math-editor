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
    'isEditMode',
    'isPreviewMode',
    'isHtmlMode',
    'isEditLineFeed',
    '_normalFontSize',
    '_smallFontSize',
    '_normalHeight',
    '_smallHeight',
    'isDataLoading'
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
      const styles = (fontSize, height) => ({
        height: `${height}px`,
        lineHeight: `${height}px`,
        fontSize: `${fontSize}px`
      })
      return this._isScriptChild 
        ? styles(this._smallFontSize, this._smallHeight)
        : styles(this._normalFontSize, this._normalHeight)
    },
    _numberNodeStyles() {
      const styles = (height) => ({
        minHeight: `${height}px`,
        lineHeight: `${height}px`
      })
      return this._isScriptChild 
        ? styles(this._smallHeight)
        : styles(this._normalHeight)
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
    _addFormatListener(target, callback) {
      setTimeout(() => {
        this._format()
      }, 0)
      this.formatObserver = this._addMutationObserver(target, (mutationsList) => {
        this._format()
        callback && callback.call(this, mutationsList)
      })
    },
    _removeFormatListener() {
      if(this.formatObserver) {
        this._removeMutationObserver(this.formatObserver)
      }
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
    _format() {
      const diffTop = (maxDeep, nodeDeep, normalHeight) => {
        const splitSize = 6
        let diffDeep = maxDeep.deep.topDeep - nodeDeep.deep.topDeep
        let top = 0
        if(diffDeep > 0) {
          let diffSuperValue = maxDeep.deep.superValueDeep - nodeDeep.deep.superValueDeep
          if(nodeDeep.deep.superValueDeep === 1 && diffSuperValue > 0) {
            diffDeep -= 0.5
            diffSuperValue -= 0.5
          }
          top = diffDeep * normalHeight + diffSuperValue * splitSize
        }
        return top
      }
      const normalHeight = this._normalHeight
      if(!hasChildren(this.model)) return
      const deeps = this.model.children.map(child => ({
        uid: child.uid,
        deep: this._getNodeDeep(child)
      })).sort((pre,next) => {
        return pre.deep.topDeep > next.deep.topDeep
          ? -1
          : pre.deep.topDeep === next.deep.topDeep
            ? 0
            : 1
      })
      const maxDeep = deeps[0]
      deeps.forEach((nodeDeep) => {
        const top = diffTop(maxDeep, nodeDeep, normalHeight)
        let node = this.$refs['basic-node-' + nodeDeep.uid]
        Array.isArray(node) && (node = node[0])
        if(node && node.$el) {
          node.$el.style.top = `${top}px`
        }
      })
      if(NodeManager.isUnaryOperatorNode(this.model) 
        || (this.hasPrefix && this.hasPostfix)) {
        const top = diffTop(maxDeep, {
          deep: {
            topDeep: 1,
            superValueDeep: 1
          }
        }, normalHeight)
        if(this.hasPostfix) {
          this.$refs.operatorNodePostfix.style.top = `${top}px`
        }
        if(this.hasPrefix) {
          this.$refs.operatorNodePrefix.style.top = `${top}px`
        }
      }
    },
    _getNodeDeep(node) {
      const normalHeight = this._normalHeight
      const smallHeight = this._smallHeight
      const getMaxDeep = (list, deepFunc) => {
        let maxDeep = null
        list.forEach(item => {
          const deep = deepFunc(item, {
            superValueDeep: 0,
            subValueDeep: 0,
            superScriptDeep: 0,
            subScriptDeep: 0
          })
          if(!maxDeep) {
            maxDeep = deep
          } else {
            const max = maxDeep.superValueDeep + (smallHeight/normalHeight) * maxDeep.superScriptDeep
            const curr = deep.superValueDeep + (smallHeight/normalHeight) * deep.superScriptDeep
            if(max < curr) {
              maxDeep = deep
            }
          } 
        })
        return maxDeep
      }
      const getDeep = (node, initialDeep) => {
        initialDeep = initialDeep || {
          superValueDeep: 1,
          subValueDeep: 0,
          superScriptDeep: 0,
          subScriptDeep: 0
        }
        if(!hasChildren(node)) return initialDeep
        if(hasSlotChildren(node, SLOT_SUPER_VALUE)) {
          initialDeep.superValueDeep += 1
        }
        if(hasSlotChildren(node, SLOT_SUPER_SCRIPT)) {
          initialDeep.superScriptDeep += 1
        }
        const children = getAnyChildren(node)
        if(children) {
          const childDeep = getMaxDeep(children, getDeep)
          initialDeep.superValueDeep += childDeep.superValueDeep
          initialDeep.superScriptDeep += childDeep.superScriptDeep
        }
        return initialDeep
      }
      const result = getDeep(node)
      result.superScriptDeep = result.superScriptDeep > 0 ? (result.superScriptDeep * (smallHeight/normalHeight) - (10/normalHeight)) : 0
      result.topDeep = result.superValueDeep + result.superScriptDeep
      return result
    }
  }
}
