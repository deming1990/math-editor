import {MUTATION_TYPES, NODE_TYPES} from '../constants'

class BoundaryDetection {
  constructor() {
    this.BOUNDARY = {}
  }
  detectBoundary(rowModel, rowContainer, changedTargets) {
    const calcWidth = (widths, ids) => {
      return Array.isArray(ids)
        ? ids.reduce((total, id) => total += widths[id], 0)
        : Object.keys(widths).map(id => widths[id]).reduce((total, width) => total += width, 0)
    }
    const rowId = rowContainer.id
    const BOUNDARY = this.BOUNDARY
    if(!BOUNDARY[rowId]) {
      BOUNDARY[rowId] = {
        width: parseFloat(getComputedStyle(rowContainer).width),
        children: {}
      }
    }
    if(changedTargets) {
      Object.keys(changedTargets).forEach(uid => {
        const {
          type,
          target
        } = changedTargets[uid]
        if(MUTATION_TYPES.DELETE === type) {
          if(BOUNDARY[rowId].children[uid]) {
            delete BOUNDARY[rowId].children[uid]
          }
        } else {
          BOUNDARY[rowId].children[uid] = parseFloat(getComputedStyle(target).width)
        }
      })
    } else {
      rowModel.children.forEach((item) => {
        const element = document.querySelector(`[data-uid="${item.uid}"]`)
        if(element) {
          BOUNDARY[rowId].children[item.uid] = parseFloat(getComputedStyle(element).width)
        }
      })
    }
    const maxWidth = BOUNDARY[rowId].width
    const actualWidth = calcWidth(BOUNDARY[rowId].children)
    const beyondWidth = (actualWidth + 15) - maxWidth
    if(beyondWidth > 0) {
      let count = 1
      const length = rowModel.children.length
      const uids = rowModel.children.map(item => item.uid)
      while(count <= length) {
        const width = calcWidth(BOUNDARY[rowId].children, uids.slice(length - count))
        const nodeModel = rowModel.children[length - count]
        if(nodeModel.compType === NODE_TYPES.TEXT_NODE && beyondWidth < width) {
          const unitWidth = width / nodeModel.value.length
          const cursorPosition = Math.floor((width - beyondWidth) / unitWidth)
          return {
            cursorPosition: cursorPosition > -1 ? cursorPosition : 0,
            nodeModel
          }
        }
        count += 1
      }
    }
  }
  removeBoundary(rowId) {
    delete this.BOUNDARY[rowId]
  }
}

export default BoundaryDetection
