const BOUNDARY = {}

const diffArr = (newArr, oldArr) => {
  const needDelete = []
  const needAdd = []
  newArr.forEach((item) => {
    !oldArr.includes(item) && needAdd.push(item)
  })
  oldArr.forEach((item) => {
    !newArr.includes(item) && needDelete.push(item)
  })
  return {
    needDelete,
    needAdd
  }
}

const addBoundary = (row) => {
  const $row = document.getElementById(row.uid)
  const width = parseFloat(getComputedStyle($row).width)
  const children = {}
  Array.from($row.children).forEach((child, index) => {
    children[row.children[index].uid] = parseFloat(getComputedStyle(child).width)
  })
  BOUNDARY[row.uid] = {
    width,
    children
  }
}

const updateBoundaryNode = (row, node) => {
  const rowId = typeof row === 'string' ? row : row.uid
  const nodeId = typeof node === 'string' ? node : node.uid
  const $node = document.getElementById(nodeId)
  BOUNDARY[rowId].children[nodeId] = parseFloat(getComputedStyle($node).width)
}

const updateBoundary = (row, node) => {
  if(BOUNDARY[row.uid]) {
    node && updateBoundaryNode(row, node)
    const newIds = row.children.map(item => item.uid)
    const oldIds = Object.keys(BOUNDARY[row.uid].children)
    const diffRes = diffArr(newIds, oldIds)
    diffRes.needDelete.forEach((id) => {
      delete BOUNDARY[row.uid].children[id]
    })
    diffRes.needAdd.forEach((id) => {
      updateBoundaryNode(row.uid, id)
    })
  } else {
    addBoundary(row)
  }
}

const detectBoundary = (row, node) => {
  const calcActualWidth = (widthList) => widthList.reduce((result, item) => result += item.width, 0)
  updateBoundary(row, node)
  const widthList = row.children.map(item => ({id: item.uid, width: BOUNDARY[row.uid].children[item.uid]}))
  const maxWidth = BOUNDARY[row.uid].width
  let actualWidth = calcActualWidth(widthList)
  let nodeIndex = row.getChildIndex(node)
  if((maxWidth < actualWidth + 5) && nodeIndex === 0) {
    return node
  }
  let crossBoundary = false
  while((maxWidth < actualWidth + 5) && nodeIndex > 0) {
    crossBoundary = true
    nodeIndex -= 1
    actualWidth = calcActualWidth(widthList.slice(0, nodeIndex + 1))
  }
  return crossBoundary ? row.getChild(nodeIndex) : null
}

const removeBoundary = (rowId) => {
  delete BOUNDARY[rowId]
}

export default {
  detectBoundary,
  removeBoundary
}
