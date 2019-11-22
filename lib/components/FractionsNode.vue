<template>
  <div :id="model.uid" :class="fractionsClazz">
    <div class="superValue" :style="superStyle" ref="superEl">
      <basic-node v-for="item in superValue" :model="item" :key="item.uid" />
    </div>
    <div class="split"></div>
    <div class="subValue" :style="subStyle" ref="subEl">
      <basic-node v-for="item in subValue" :model="item" :key="item.uid" />
    </div>
  </div>  
</template>
<script>
import {
  NODE_TYPES,
  SLOT_SUPER_VALUE,
  SLOT_SUB_VALUE
} from '../constants'
import compMixin from './component-mixin'
export default {
  name: NODE_TYPES.FRACTIONS_NODE,
  mixins: [compMixin],
  data() {
    return {
      superStyle: { marginBottom: 0 },
      subStyle: { marginTop: 0 }
    }
  },
  props: {
    model: Object
  },
  computed: {
    fractionsClazz() {
      const compType = this.model.compType
      return {
        'fractions-node': this.isFractionsNode,
        'slanted-fractions-node': this.isSlantedFractionNode
      }
    },
    superValue() {
      return this.model.children.filter(item => item.slot === SLOT_SUPER_VALUE)
    },
    subValue() {
      return this.model.children.filter(item => item.slot === SLOT_SUB_VALUE)
    },
    hasSuperValue() {
      return this.superValue.length > 1 || this.superValue[0].value !== ''
    },
    hasSubValue() {
      return this.subValue.length > 1 || this.subValue[0].value !== ''
    },
    isSlantedFractionNode() {
      return this.model.compType === NODE_TYPES.SLANTED_FRACTION_NODE
    },
    isFractionsNode() {
      return this.model.compType === NODE_TYPES.FRACTIONS_NODE
    }
  },
  mounted() {
    if(this.isSlantedFractionNode) {
      this.addSlantedFractionObserver()
    }
  },
  destroyed() {
    if(this.isSlantedFractionNode) {
      this.removeSlantedFractionObserver()
    }
  },
  methods: {
    resizeSuperValuePosition() {
      const offset = (this.$refs.superEl && this.$refs.superEl.clientHeight) || this._normalHeight
      this.subStyle.marginTop = `${offset}px`
    },
    resizeSubValuePosition() {
      const offset = (this.$refs.subEl && this.$refs.subEl.clientHeight) || this._normalHeight
      this.superStyle.marginBottom = `${offset}px`
    },
    addSlantedFractionObserver() {
      this.superValueObserver = this._addMutationObserver(this.$refs.superEl, this.resizeSuperValuePosition)
      this.subValueObserver = this._addMutationObserver(this.$refs.subEl, this.resizeSubValuePosition)
      setTimeout(() => {
        this.resizeSuperValuePosition()
        this.resizeSubValuePosition()
      }, 0)
    },
    removeSlantedFractionObserver() {
      this._removeMutationObserver(this.superValueObserver)
      this._removeMutationObserver(this.subValueObserver)
    }
  }
}
</script>
<style lang="less" scoped>
  @import "../styles/variables.less";

  .fractions-node {
    position: relative;
    width: fit-content;
    margin: 0 5px;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    &>.split {
      width: 100%;
      height: 2px;
      background: @border-color;
      margin: 2px;
    }
    &>.superValue, &>.subValue {
      padding: 0 5px;
    }
  }

  .slanted-fractions-node {
    position: relative;
    display: inline-flex;
    &>.split {
      position: relative;
      width: 20px;
      margin: 0 2.5px;
      background: linear-gradient(to bottom right, transparent calc(50% - 2px), black calc(50% - 2px), black 50%, transparent 50%);
    }
    &>.superValue {
      margin-right: -8px;
    }
    &>.subValue {
      margin-left: -8px;
    }
  }
</style>
