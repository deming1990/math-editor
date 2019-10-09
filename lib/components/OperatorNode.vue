<template>
  <div class="inline-node" :id="model.uid" ref="operatorNode">
    <template v-if="hasPrefix || hasPostfix">
      <div 
        v-if="hasPrefix" 
        class="prefix" 
        :style="_fontStyles" v-html="OPERATOR_CHARS[model.compType]" ref="operatorNodePrefix"></div>
      <basic-node v-for="item in model.children" :model="item" :key="item.uid" />
      <div 
        v-if="hasPostfix" 
        class="postfix" 
        :style="_fontStyles" v-html="OPERATOR_CHARS[model.compType]" ref="operatorNodePostfix"></div>
    </template>
    <template v-else>
      <div 
        class="content" 
        :style="contentStyles" 
        @click="handleOperatorClick">
        <div v-if="!isImageNode" v-html="OPERATOR_CHARS[model.compType]"></div>
        <img v-if="isPINode" :style="symbolImageStyles" src="../assets/images/math-pi.png" alt="">
        <img v-if="isPerpNode" :style="symbolImageStyles" src="../assets/images/math-perp.png" alt="">
        <img v-if="isSwungDashNode" :style="symbolImageStyles" src="../assets/images/math-swung-dash.png" alt="">
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
  data() {
    return {
      OPERATOR_CHARS
    }
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
    isPINode() {
      return this.model.compType === NODE_TYPES.PI_NODE
    },
    isPerpNode() {
      return this.model.compType === NODE_TYPES.PERP_NODE
    },
    isSwungDashNode() {
      return this.model.compType === NODE_TYPES.SWUNG_DASH_NODE
    },
    isImageNode() {
      return [
        NODE_TYPES.PI_NODE,
        NODE_TYPES.PERP_NODE,
        NODE_TYPES.SWUNG_DASH_NODE
      ].includes(this.model.compType)
    },
    contentStyles() {
      const styles = {}
      NO_PADDING_NODES.includes(this.model.compType) && (styles['padding'] = 0)
      CENTER_NODES.includes(this.model.compType) && (styles['lineHeight'] = 0.5)
      ITALIC_NODES.includes(this.model.compType) && (styles['fontStyle'] = 'italic')
      return Object.assign({}, this._fontStyles, styles)
    },
    symbolImageStyles() {
      const styles = (fontSize) => ({
        height: `${fontSize}px`,
        width: `${fontSize}px`
      })
      return this._isScriptChild 
        ? styles(this._smallFontSize)
        : styles(this._normalFontSize)
    }
  },
  watch: {
    model: {
      handler(val) {
        if(val && this.isPreviewMode) {
          this.$nextTick(() => {
            this._format()
          })
        }
      },
      immediate: true
    }
  },
  mounted() {
    if(this.isEditMode) {
      this._addFormatListener(this.$refs.operatorNode)
    }
  },
  destroyed() {
    this._removeFormatListener()
  },
  methods: {
    handleOperatorClick() {
      this._dispatch('.row-container', 'operatorClick', {
        node: this.model
      })
    }
  }
}
</script>
<style lang="less" scoped>
  @import '../styles/variables.less';
  .inline-node {
    position: relative;
    display: inline-flex;
    .prefix, 
    .postfix,
    .content {
      position: relative;
      font-family: @text-font-family;
      width: max-content;
    }
    .content {
      padding: 0 5px;
    }
  }
</style>
