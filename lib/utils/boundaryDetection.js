import {MUTATION_TYPES, NODE_TYPES} from '../constants'

const BOUNDARY = {}

const detectBoundary = (rowModel, rowContainer, changedTargets) => {
  const calcWidth = (widths, ids) => {
    return Array.isArray(ids) 
      ? ids.reduce((total, id) => total += widths[id], 0)
      : Object.values(widths).reduce((total, width) => total += width, 0)
  }
  const rowId = rowContainer.id
  if(!BOUNDARY[rowId]) {
    BOUNDARY[rowId] = {
      width: parseFloat(getComputedStyle(rowContainer).width),
      children: {}
    }
  }
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
      if(beyondWidth < width 
        && nodeModel.compType === NODE_TYPES.TEXT_NODE) {
        const unitWidth = width / nodeModel.value.length
        return {
          cursorPosition: Math.floor((width - beyondWidth) / unitWidth) + 1,
          nodeModel
        }
      }
      count += 1
    }
  }
}

const removeBoundary = (rowId) => {
  delete BOUNDARY[rowId]
}

export default {
  detectBoundary,
  removeBoundary
}
