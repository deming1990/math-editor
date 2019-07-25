import NodeManager from "./NodeManager"

let uid = 1

export default class RowContianer {
  constructor() {
    this.uid = uid++
    const textNode = NodeManager.createNode(NodeManager.TextNode)
    textNode.parent = this
    this.children = [textNode]
  }
}
