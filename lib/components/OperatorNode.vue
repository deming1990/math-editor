<template>
  <div class="inline-node" :id="model.uid" :style="_fontStyles">
    <template v-if="hasPrefix || hasPostfix">
      <div v-if="hasPrefix" class="prefix">
        {{OPERATOR_CHARS[model.compType]}}
      </div>
      <basic-node v-for="item in model.children" :model="item" :key="item.uid" />
      <div v-if="hasPostfix" class="postfix" :style="_fontStyles">
        {{OPERATOR_CHARS[model.compType]}}
      </div>
    </template>
    <template v-else>
      <div class="content" :style="contentStyles">
        {{OPERATOR_CHARS[model.compType]}}
      </div>
    </template>
  </div>
</template>
<script>
import {
  NODE_TYPES,
  OPERATOR_CHARS
} from '../constants'
import compMixin from './component-mixin'

const NO_PADDING_NODES = [
  NODE_TYPES.PI_NODE,
  NODE_TYPES.ANGLE_NODE,
  NODE_TYPES.TRIANGLE_NODE,
  NODE_TYPES.PARALLELOGRAM_NODE
]
const ITALIC_NODES = [
  NODE_TYPES.PARALLEL_NODE
]
const CENTER_NODES = [
  NODE_TYPES.ELLIPSIS_NODE
]

export default {
  mixins: [compMixin],
  props: {
    model: Object
  },
  computed: {
    hasPrefix() {
      return [
        NODE_TYPES.SIN_NODE,
        NODE_TYPES.COS_NODE,
        NODE_TYPES.TAN_NODE
      ].includes(this.model.compType)
    },
    hasPostfix() {
      return [
        NODE_TYPES.DEGREE_NODE,
        NODE_TYPES.PRECENT_NODE
      ].includes(this.model.compType)
    },
    contentStyles() {
      const styles = {}
      NO_PADDING_NODES.includes(this.model.compType) && (styles['padding'] = 0)
      CENTER_NODES.includes(this.model.compType) && (styles['lineHeight'] = 0.5)
      ITALIC_NODES.includes(this.model.compType) && (styles['fontStyle'] = 'italic')
      return Object.assign({}, this._fontStyles, styles)
    }
  },
  data() {
    return {
      OPERATOR_CHARS
    }
  }
}
</script>
<style lang="less" scoped>
  @import '../styles/variables.less';
  .inline-node {
    position: relative;
    height: fit-content;
    display: inline-flex;
    align-items: center;
    .prefix, 
    .postfix,
    .content {
      font-family: @text-font-family;
    }
    .content {
      padding: 0 5px;
    }
  }
</style>
