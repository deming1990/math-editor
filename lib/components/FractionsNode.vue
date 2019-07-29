<template>
  <div :id="model.uid" class="fractions-node">
    <div>
      <basic-node v-for="item in numerator" :model="item" :key="item.uid" />
    </div>
    <div class="split"></div>
    <div>
      <basic-node v-for="item in denominator" :model="item" :key="item.uid" />
    </div>
  </div>  
</template>
<script>
import {NODE_TYPES} from '../constants'

// 分子
const SLOT_NUMERATOR = 'numerator'
// 分母
const SLOT_DENOMINATOR = 'denominator'

export default {
  name: NODE_TYPES.FRACTIONS_NODE,
  props: {
    model: Object
  },
  computed: {
    numerator() {
      return this.model.children.filter(item => item.slot === SLOT_NUMERATOR)
    },
    denominator() {
      return this.model.children.filter(item => item.slot === SLOT_DENOMINATOR)
    },
    hasNumerator() {
      return this.numerator.length > 1 || this.numerator[0].value !== ''
    },
    hasDenominator() {
      return this.denominator.length > 1 || this.denominator[0].value !== ''
    }
  }
}
</script>
<style lang="less" scoped>
  @import "../styles/variables.less";

  .fractions-node {
    width: fit-content;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    .split {
      width: 100%;
      height: 2px;
      background: @border-color;
      margin: 2px;
    }
  }
</style>
