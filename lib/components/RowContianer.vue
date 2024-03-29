<template>
  <div class="row-container"
    :id="model.uid"
    @click="onRowContainerClick" 
    ref="rowContainer">
    <basic-node
      v-for="child in model.children"
      :ref="'basic-node-' + child.uid"
      :model="child"
      :key="child.uid"
      :data-uid="child.uid"/>
  </div>
</template>
<script>
import { MUTATION_TYPES } from '../constants'
import compMixin from './component-mixin'
import NodeManager from '../models/NodeManager'
import RowContianer from '../models/RowContianer'

const isRowContianer = (obj) => obj instanceof RowContianer

export default {
  name: 'row-container',
  mixins: [compMixin],
  props: {
    model: Object
  },
  mounted() {
    this.addRowFormatListener()
  },
  destroyed() {
    this.removeRowFormatListener()
  },
  watch: {
    model: {
      handler(val) {
        if(val && (this.isPreviewMode || this.isPreviewSimpleMode)) {
          this.$nextTick(() => {
            // 上线相对位置计算
            this._format()
          })
          setTimeout(() => {
            // 由于折行原因，在一行中存在最高度元素，被折到下一行，需要再次进行计算
            this._format()
          },0)
        }
      },
      immediate: true
    }
  },
  methods: {
    onRowContainerClick(evt) {
      if(!evt.target.matches('.row-container')) return
      this._focusContainer(this.model)
    },
    boundaryDetection(mutationsList) {
      const rowContainer = this.$refs.rowContainer
      const handleMutationsList = (mutationsList) => {
        if(!mutationsList) return
        mutationsList = Array.from(mutationsList)
        return mutationsList.reduce((obj, mutation) => {
          let {
            target,
            type,
            removedNodes,
            addedNodes
          } = mutation
          if(target.nodeType !== document.TEXT_NODE 
            && target.matches('.row-container')) {
            if(type === 'childList') {
              if(addedNodes.length > 0) {
                addedNodes.forEach(node => {
                  const uid = node.dataset.uid
                  if(!obj[uid]) {
                    obj[uid] = {
                      target: node
                    }
                  }
                  obj[uid].type = MUTATION_TYPES.ADD_OR_UPDATE
                })
              }
              if(removedNodes.length > 0) {
                removedNodes.forEach(node => {
                  const uid = node.dataset.uid
                  if(!obj[uid]) {
                    obj[uid] = {
                      target: node
                    }
                  }
                  obj[uid].type = MUTATION_TYPES.DELETE
                })
              }
            }
          } else {
            while(target.parentNode 
              && !target.parentNode.matches('.row-container')) {
              target = target.parentNode
            }
            const uid = target.dataset.uid
            if(!obj[uid]) {
              obj[uid] = {
                target
              }
            }
            if(obj[uid].type !== MUTATION_TYPES.DELETE) {
              obj[uid].type = MUTATION_TYPES.ADD_OR_UPDATE
            }
          }
          return obj
        }, {})
      }
      const changedTargets = handleMutationsList(mutationsList)
      if(changedTargets) {
        this.$emit('boundaryDetection', {
          rowModel: this.model,
          rowContainer,
          changedTargets
        })
      }
    },
    rowFormat() {
      this.removeRowFormatListener()
      this.$nextTick(() => {
        this._format()
        this.$nextTick(() => {
          this.addRowFormatListener()
        })
      })
    },
    addRowFormatListener() {
      if(this.isEditMode) {
        this._addFormatListener(this.$refs.rowContainer, (mutationsList) => {
            // 注释掉边界检测
            if(this.isEditLineFeed) {
              this.boundaryDetection(mutationsList)
            }
        })
      }
    },
    removeRowFormatListener() {
      this._removeFormatListener()
    }
  }
}
</script>
<style lang="less" scoped>
  @import '../styles/variables.less';
  .row-container {
    padding: 5px;
    font-size: 15px;
    box-sizing: border-box;
    white-space: nowrap;
    display: flex;
    align-items: flex-start;
  }
</style>
