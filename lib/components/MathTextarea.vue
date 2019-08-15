<template>
  <div class="math-textarea"
    ref="mathTextarea"
    @click="onMathTextareaClick">
    <row-container 
      v-for="row in rows"
      :model="row"
      :key="row.id"
      @changeCurrentFocusNode="onChangeCurrentFocusNode"
      @moveCursor="onMoveCursor"
      @deleteNode="onDeleteNode"
      @lineFeed="onLineFeed"
      @boundaryDetection="onBoundaryDetection">
    </row-container>
  </div>  
</template>
<script>
import RowContianer from '../models/RowContianer'
import NodeManager from '../models/NodeManager'
import helper from '../utils/helper'
import compMixin from './component-mixin'
import boundaryDetection from '../utils/boundaryDetection'

const isRowContainer = (node) => {
  return node 
    && (node instanceof RowContianer || node.compType === 'row-container')
}

export default {
  name: 'math-textarea',
  mixins: [compMixin],
  data() {
    return {
      rows: [],
      currentFocusNode: null,
      currentCursorPosition: 0
    }
  },
  methods: {
    getValue() {
      return helper.arrToStr(this.rows)
    },
    setValue(val) {
      this.rows = NodeManager.cloneRows(helper.strToArr(val))
    },
    isEmpty() {
      const firstRow = this.getRow(0)
      if(firstRow 
        && firstRow.children
        && firstRow.children.length > 0
        && (firstRow.children.length > 1 || firstRow.children[0].value)) {
          return false
        }
      return true
    },
    onMathTextareaClick(evt) {
      if(!evt.target.matches('.math-textarea')) return
      const lastRowContainer = this.getLastRowContainer()
      this._focusContainer(lastRowContainer)
    },
    onChangeCurrentFocusNode({
      node,
      cursorPosition
    }) {
      this.currentFocusNode = node
      this.currentCursorPosition = cursorPosition
    },
    onMoveCursor({
      node,
      direction
    }) {
      const getPrevOrNextRow = (node, direction) => {
        const currRow = this.getBelongRow(node)
        const rowIndex = this.getRowIndex(currRow)
        const rowCount = this.getRowCount()
        if(direction === 'prev' && rowIndex > 0) {
          const prevRow = this.getRow(rowIndex - 1)
          return prevRow.getLastChild()
        } else if(direction === 'next' && rowIndex < rowCount - 1) {
          const nextRow = this.getRow(rowIndex + 1)
          return nextRow.getFirstChild()
        }
      }
      let currNode
      switch(direction) {
        case 'left':
          currNode = this.getPrevTextNode(node)
          currNode && helper.setElementFocus(currNode.uid)
          break
        case 'right':
          currNode = this.getNextTextNode(node)
          currNode && helper.setElementFocus(currNode.uid, 0)
          break
        case 'up':
          currNode = getPrevOrNextRow(node, 'prev')
          currNode && helper.setElementFocus(currNode.uid)
          break
        case 'down':
          currNode = getPrevOrNextRow(node, 'next')
          currNode && helper.setElementFocus(currNode.uid, 0)
          break
      }
    },
    /**
     * 处理删除节点
     */
    onDeleteNode({
      type,
      node,
      direction
    }) {
      const deleteLeftSiblingNode = (node, type) => {
        const parent = node.parent
        const children = parent.children
        const nodeIndex = children.indexOf(node)
        
        if(nodeIndex > 0) {
          let prevIndex = nodeIndex - 1
          let prevNode = children[prevIndex]
          if(NodeManager.isTextNode(prevNode)) {
            type === 1 && children.splice(nodeIndex, 1)
            helper.setElementFocus(prevNode.uid)
          } else {
            children.splice(prevIndex, 1)
          }
        } else {
          if(isRowContainer(parent)) {
            const rowIndex = this.getRowIndex(parent)
            if(parent.size() === 1 && type === 1) {
              rowIndex > 0 && this.deleteRow(parent)
            } else {
              if(rowIndex > 0) {
                const prevRow = this.getRow(rowIndex - 1)
                this.concatRow(prevRow, parent)
              }
            }
          }
        }
      }
      const deleteRightSiblingNode = (node, type) => {
        // const parent = node.parent
        // const children = parent.children
        // const nodeIndex = children.indexOf(node)
        // if(nodeIndex === children.length - 1) {
        // } else {
        // }
      }
      direction === 1 
        ? deleteLeftSiblingNode(node, type)
        : deleteRightSiblingNode(node, type)
      
    },
    concatRow(beforeRow, afterRow) {
      const nodes = afterRow.children
      const middleNode = nodes[0]
      beforeRow.appendChild(nodes)
      nodes.forEach((item) => {
        item.parent = beforeRow
      })
      this.deleteRow(afterRow)
    },
    deleteRow(row) {
      if(this.getRowCount() > 1) {
        boundaryDetection.removeBoundary(row.uid)
        let idx = this.getRowIndex(row)
        this.rows.splice(idx, 1)
        if(idx > 0) idx -= 1
        let lastChild = this.getRow(idx).getLastChild()
        if(!NodeManager.isTextNode(lastChild)) {
          lastChild = NodeManager.createTextNode()
          this.getRow(idx).appendChild(lastChild)
        }
        this.$nextTick(() => {
          helper.setElementFocus(lastChild.uid)
        })
      }
    },
    getRow(index) {
      return this.rows[index]
    },
    getRowIndex(row) {
      return this.rows.indexOf(row)
    },
    getRowCount() {
      return this.rows.length
    },
    getBelongRow(node) {
      let parent = node.parent
      while(!isRowContainer(parent)) {
        parent = parent.parent
      }
      return parent
    },
    // 去除首尾多余空文本节点
    trimLine(nodes) {
      if(nodes.length<2) return;
      const start = 0
      let curr = start
      while(NodeManager.isTextNode(nodes[curr])
        && nodes[curr].isEmpty()
        && NodeManager.isTextNode(nodes[curr + 1])) {
          nodes.splice(curr,1)
      }
      if(nodes.length<2) return;
      curr = nodes.length - 1
      while(NodeManager.isTextNode(nodes[curr])
        && nodes[curr].isEmpty()
        && NodeManager.isTextNode(nodes[curr - 1])) {
          nodes.splice(curr,1)
          curr -= 1
      }
    },
    /**
     * 处理换行
     */
    onLineFeed({
      node,
      cursorPosition
    }) {
      const handleTextNode = (beforeChildren, afterChildren, node, nodeIndex, cursorPosition) => {
        if(cursorPosition === 0) {
          beforeChildren.splice(nodeIndex, 1, NodeManager.createTextNode())
          afterChildren.unshift(node)
        } else if (cursorPosition > 0 && cursorPosition < node.value.length) {
          const beforeNode = NodeManager.createTextNode()
          const afterNode = NodeManager.createTextNode()
          beforeNode.value = node.value.slice(0, cursorPosition)
          afterNode.value = node.value.slice(cursorPosition)
          beforeChildren.splice(nodeIndex, 1, beforeNode)
          afterChildren.unshift(afterNode)
        }
      }
      if(!isRowContainer(node.parent)) return
      const row = node.parent
      const rowIndex = this.rows.indexOf(row)
      const children = row.children
      const nodeIndex = children.indexOf(node)
      const beforeChildren = children.slice(0, nodeIndex + 1)
      const afterChildren = children.slice(nodeIndex + 1)
      if(NodeManager.isTextNode(node)) {
        handleTextNode(beforeChildren, afterChildren, node, nodeIndex, cursorPosition)
      }
      const newRow = new RowContianer()
      newRow.children.push(...afterChildren)
      afterChildren.forEach(child => {
        child.parent = newRow
      })
      row.children.splice(0, children.length, ...beforeChildren)
      beforeChildren.forEach(child => {
        child.parent = row
      })
      this.trimLine(row.children)
      this.trimLine(newRow.children)
      this.rows.splice(rowIndex, 1, row, newRow)
      this.$nextTick(() => {
        helper.setElementFocus(newRow.children[0].uid, 0)
      })
    },
    onBoundaryDetection({
      rowModel,
      rowContainer,
      changedTargets
    }) {     
      const res = boundaryDetection.detectBoundary(rowModel, rowContainer, changedTargets)
      if(res) {
        const {
          nodeModel,
          cursorPosition
        } = res
        this.onLineFeed({
          node: nodeModel,
          cursorPosition
        })
      }
    },
    getLastRowContainer() {
      if(this.rows.length === 0) {
        this.rows.push(new RowContianer())
      }
      return this.rows[this.rows.length - 1]
    },
    /**
     * 添加数学节点
     */
    addMathNode(compType) {
      const mathNode = NodeManager.createNode(compType)
      if(this.currentFocusNode) {
        const currentFocusNode = this.currentFocusNode
        const currentCursorPosition = this.currentCursorPosition
        const parent = currentFocusNode.parent
        const index = parent.children.indexOf(currentFocusNode)
        mathNode.parent = parent
        mathNode.slot = currentFocusNode.slot
        let beforeTextNode = NodeManager.createTextNode()
        let afterTextNode = NodeManager.createTextNode()
        beforeTextNode.parent = parent
        beforeTextNode.slot = currentFocusNode.slot
        afterTextNode.parent = parent
        afterTextNode.slot = currentFocusNode.slot
        const nodes = []
        if(currentCursorPosition === 0) {
          !NodeManager.isTextNode(parent.children[index - 1]) && nodes.push(beforeTextNode)
          nodes.push(mathNode)
          !NodeManager.isTextNode(parent.children[index]) 
            ? nodes.push(afterTextNode)
            : (afterTextNode = parent.children[index])
          parent.children.splice(index, 0, ...nodes)
        } else if(currentCursorPosition === currentFocusNode.value.length) {
          !NodeManager.isTextNode(parent.children[index]) && nodes.push(beforeTextNode)
          nodes.push(mathNode)
          !NodeManager.isTextNode(parent.children[index + 1]) 
            ? nodes.push(afterTextNode)
            : (afterTextNode = parent.children[index + 1])
          parent.children.splice(index + 1, 0, ...nodes)
        } else {
          beforeTextNode.value = currentFocusNode.value.substring(0, currentCursorPosition)
          afterTextNode.value = currentFocusNode.value.substring(currentCursorPosition)
          parent.children.splice(index, 1, beforeTextNode, mathNode, afterTextNode)
        }
        this.$nextTick(() => {
          helper.setElementFocus(afterTextNode.uid, 0)
        })
      } else {
        const lastRow = this.getLastRow()
        const afterTextNode = NodeManager.createTextNode()
        afterTextNode.parent = lastRow
        lastRow.children.push(mathNode, afterTextNode)
        this.$nextTick(() => {
          helper.setElementFocus(afterTextNode.uid, 0)
        })
      }
    },
    getNextTextNode(node) {
      const getNextChildTextNode = (parent) => {
        const children = parent.children;
        if(children && children.length > 0) {
          const subNode = children[0]
          if(NodeManager.isTextNode(subNode)) {
            return subNode
          } else {
            return getNextChildTextNode(subNode)
          }
        }
      }
      const getNextSiblingTextNode = (node) => {
        let children = node.parent.children
        let nodeIndex = children.indexOf(node)
        while(nodeIndex < children.length - 1) {
          nodeIndex += 1
          let nextNode = children[nodeIndex]
          if(NodeManager.isTextNode(nextNode)) {
            return nextNode
          } else {
            nextNode = getNextChildTextNode(nextNode)
            if(NodeManager.isTextNode(nextNode)) {
              return nextNode
            }
          }
        }
        if(node.parent.parent) {
          return getNextSiblingTextNode(node.parent)
        }
      }
      let nextTextNode
      if(NodeManager.isTextNode(node)) {
        nextTextNode = getNextSiblingTextNode(node)
      } else {
        nextTextNode = getNextChildTextNode(node)
        if(!nextTextNode) {
          nextTextNode = getNextSiblingTextNode(node)
        }
      }
      if(nextTextNode) {
        return nextTextNode
      } else {
        let row = this.getBelongRow(node)
        let rowIndex = this.getRowIndex(row)
        if(rowIndex < this.getRowCount() - 1) {
          row = this.getRow(rowIndex + 1)
          let firstChild = row.getFirstChild()
          if(NodeManager.isTextNode(firstChild)) {
            return firstChild
          } else {
            return this.getNextTextNode(firstChild)
          }
        }
      }
    },
    getPrevTextNode(node) {
      const getPrevChildTextNode = (parent) => {
        const children = parent.children;
        if(children && children.length > 0) {
          const subNode = children[children.length - 1]
          if(NodeManager.isTextNode(subNode)) {
            return subNode
          } else {
            return getPrevChildTextNode(subNode)
          }
        }
      }
      const getPrevSiblingTextNode = (node) => {
        let children = node.parent.children
        let nodeIndex = children.indexOf(node)
        while(nodeIndex > 0) {
          nodeIndex -= 1
          let prevNode = children[nodeIndex]
          if(NodeManager.isTextNode(prevNode)) {
            return prevNode
          } else {
            prevNode = getPrevChildTextNode(prevNode)
            if(NodeManager.isTextNode(prevNode)) {
              return prevNode
            }
          }
        }
        if(node.parent.parent) {
          return getPrevSiblingTextNode(node.parent)
        }
      }
      let prevTextNode
      if(NodeManager.isTextNode(node)) {
        prevTextNode = getPrevSiblingTextNode(node)
      } else {
        prevTextNode = getPrevChildTextNode(node)
        if(!prevTextNode) {
          prevTextNode = getPrevSiblingTextNode(node)
        }
      }
      if(prevTextNode) {
        return prevTextNode
      } else {
        let row = this.getBelongRow(node)
        let rowIndex = this.getRowIndex(row)
        if(rowIndex > 0) {
          row = this.getRow(rowIndex - 1)
          let lastChild = row.getLastChild()
          if(NodeManager.isTextNode(lastChild)) {
            return lastChild
          } else {
            return this.getPrevTextNode(lastChild)
          }
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .preview-mode {
    .math-textarea {
      overflow-x: auto;
      overflow-y: hidden;
    }  
  }
  .math-textarea {
    position: relative;
    height: 100%;
    width: 100%;
    line-height: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
