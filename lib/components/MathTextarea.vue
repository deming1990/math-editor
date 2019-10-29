<template>
  <div class="math-textarea"
    ref="mathTextarea"
    @click="onMathTextareaClick"
    @click.right="onMathTextareaClick"
    :contenteditable="isEditMode">
    <row-container 
      v-for="row in rows"
      :model="row"
      :key="row.uid"
      @changeCurrentFocusNode="onChangeCurrentFocusNode"
      @moveCursor="onMoveCursor"
      @deleteNode="onDeleteNode"
      @lineFeed="onLineFeed"
      @boundaryDetection="onBoundaryDetection"
      @operatorClick="onOperatorClick"
      ref="rows">
    </row-container>
  </div>  
</template>
<script>
import RowContianer from '../models/RowContianer'
import NodeManager from '../models/NodeManager'
import helper from '../utils/helper'
import compMixin from './component-mixin'
import BoundaryDetection from '../utils/boundaryDetection'

const isRowContainer = (node) => {
  return node 
    && (node instanceof RowContianer || node.compType === 'row-container')
}

const hasChildren = (node) => {
  return node.children
    && node.children.length > 0
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
  created() {
    this.boundaryDetection = new BoundaryDetection()
  },
  destroyed() {
    this.boundaryDetection = null
  },
  methods: {
    getValue() {
      return helper.arrToStr(this.rows)
    },
    setValue(val) {
      let newRows = NodeManager.cloneRows(helper.strToArr(val))
      this.rows = newRows
      this.$nextTick(async () => {
        this.$refs.rows.forEach((row) => {
          row.rowFormat()
        })
        if(this.isPreviewMode) {
          this.boundaryDetectionRows()
        }
      })
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
              rowIndex > 0 && this.deleteRow(parent, 1)
            } else {
              if(rowIndex > 0) {
                const prevRow = this.getRow(rowIndex - 1)
                this.concatRow(prevRow, parent, 1)
              }
            }
          }
        }
      }
      const deleteRightSiblingNode = (node, type) => {
        const parent = node.parent
        const children = parent.children
        const nodeIndex = children.indexOf(node)
        if(nodeIndex === children.length - 1) {
          if(isRowContainer(parent)) {
            const rowIndex = this.getRowIndex(parent)
            const rowCount = this.getRowCount()
            if(parent.size() === 1 && type === 1) {
              (rowIndex < rowCount - 1) && this.deleteRow(parent, 2)
            } else {
              if(rowIndex < rowCount - 1) {
                const nextRow = this.getRow(rowIndex + 1)
                this.concatRow(parent, nextRow, 2)
              }
            }
          }
        } else {
          let nextIndex = nodeIndex + 1
          let nextNode = children[nextIndex]
          if(NodeManager.isTextNode(nextNode)) {
            type === 1 && children.splice(nodeIndex, 1)
            helper.setElementFocus(nextNode.uid, 0)
          } else {
            children.splice(nextIndex, 1)
          }
        }
      }
      direction === 1 
        ? deleteLeftSiblingNode(node, type)
        : deleteRightSiblingNode(node, type)
      
    },
    concatRow(beforeRow, afterRow, direction) {
      const nodes = afterRow.children
      const middleNode = nodes[0]
      beforeRow.appendChild(nodes)
      nodes.forEach((item) => {
        item.parent = beforeRow
      })
      this.deleteRow(afterRow, direction)
    },
    deleteRow(row, direction = 1) {
      if(this.getRowCount() > 1) {
        this.boundaryDetection.removeBoundary(row.uid)
        let idx = this.getRowIndex(row)
        this.rows.splice(idx, 1)
        if(idx > 0) idx -= 1

        let selectedChild = direction === 1
          ? this.getRow(idx).getLastChild()
          : this.getRow(idx).getFirstChild()
        if(!NodeManager.isTextNode(selectedChild)) {
          selectedChild = NodeManager.createTextNode()
          selectedChild.parent = this.getRow(idx)
          direction === 1
            ? this.getRow(idx).appendChild(selectedChild)
            : this.getRow(idx).unshift(selectedChild)
        }
        this.$nextTick(() => {
          helper.setElementFocus(selectedChild.uid)
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
    async onLineFeed({
      node,
      cursorPosition,
      active = true
    }) {
      const handleTextNode = (beforeChildren, afterChildren, node, nodeIndex, cursorPosition) => {
        if(cursorPosition === 0) {
          afterChildren.unshift(node)
          beforeChildren.splice(nodeIndex, 1)
        } else if (cursorPosition > 0 && cursorPosition < node.value.length) {
          const beforeNode = NodeManager.createTextNode()
          const afterNode = NodeManager.createTextNode()
          beforeNode.value = node.value.slice(0, cursorPosition)
          afterNode.value = node.value.slice(cursorPosition)
          beforeChildren.splice(nodeIndex, 1, beforeNode)
          afterChildren.unshift(afterNode)
        }
      }
      if(!isRowContainer(node.parent)) 
        return Promise.resolve()
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
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          active 
            ? helper.setElementFocus(newRow.children[0].uid, 0)
            : helper.setElementFocus(newRow.children[newRow.children.length - 1].uid)
          resolve()
        })
      })
    },
    async onBoundaryDetection({
      rowModel,
      rowContainer,
      changedTargets
    }) {     
      const res = this.boundaryDetection.detectBoundary(rowModel, rowContainer, changedTargets)
      if(res) {
        const {
          nodeModel,
          cursorPosition
        } = res
        await this.onLineFeed({
          node: nodeModel,
          cursorPosition,
          active: false
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
      const setFocus = (mathNode, textNode) => {
        this.$nextTick(() => {
          if(hasChildren(mathNode)) {
            const firstChild = mathNode.children[0]
            if(NodeManager.isNumberNode(firstChild)) {
              helper.setElementFocus(firstChild.children[0].uid, 0)
            } else if(NodeManager.isTextNode(firstChild)) {
              helper.setElementFocus(firstChild.uid, 0)
            }
          } else {
            helper.setElementFocus(textNode.uid, 0)
          }
        })
      }
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

        NodeManager.isNumberNode()
        setFocus(mathNode, afterTextNode)
      } else {
        const lastRow = this.getLastRow()
        const afterTextNode = NodeManager.createTextNode()
        afterTextNode.parent = lastRow
        lastRow.children.push(mathNode, afterTextNode)
        setFocus(mathNode, afterTextNode)
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
        let nodeIndex = children.findIndex(item => item.uid === node.uid)
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
        let nodeIndex = children.findIndex(item => item.uid === node.uid)
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
    },
    onOperatorClick({
      node
    }) {
      const parent = node.parent
      if(hasChildren(parent)) {
        let index = parent.children.indexOf(node)
        let len = parent.children.length
        while (index > -1 && index < len){
          if(NodeManager.isTextNode(parent.children[index])) {
            helper.setElementFocus(parent.children[index].uid, 0)
            return
          }
          index += 1
        }
      }
    },
    async boundaryDetectionRows() {
      const onBoundaryDetection = this.onBoundaryDetection.bind(this)
      const handleBoundaryDetection = async (rows, index) => {
        await onBoundaryDetection({
          rowModel: rows[index],
          rowContainer: document.getElementById(rows[index].uid)
        })
        index += 1
        if(rows.length > index) {
          await handleBoundaryDetection(rows, index)
        }
      }
      await handleBoundaryDetection(this.rows, 0)
      // 折行存在空行问题
      let len = this.rows.length - 1
      while(len >= 0) {
        const children = this.rows[len].children
        if(children.length === 1 
        && NodeManager.isTextNode(children[0]) 
        && children[0].value.length === 0) {
          this.rows.splice(len, 1)
        }
        len--
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .preview-mode, .html-mode {
    .math-textarea {
      overflow-x: auto;
      overflow-y: hidden;
      border: none!important;
    }  
  }
  .math-textarea {
    position: relative;
    height: 100%;
    width: 100%;
    line-height: 1;
    overflow: auto;
  }
</style>
