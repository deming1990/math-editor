import TextNode from "./TextNode"

let uid = 1

export default class RowContianer {
  static compType = 'row-container'
  constructor() {
    this.uid = `row-${uid++}`
    this.compType = 'row-container'
    const textNode = new TextNode({
      parent: this
    })
    this.children = [textNode]
  }
  getLastChild() {
    return this.children[this.children.length - 1]
  }
  getFirstChild() {
    return this.children[0]
  }
  appendChild(node) {
    Array.isArray(node) 
      ? this.children.push(...node) 
      : this.children.push(node)
  }
  removeChild(index) {
    this.children.splice(index, 1)
  }
  getChild(index) {
    return this.children[index]
  }
  size() {
    return this.children.length
  }
  getChildIndex(child) {
    return this.children.indexOf(child)
  }
}
