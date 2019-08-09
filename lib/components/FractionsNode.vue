<template>
  <div :id="model.uid" class="fractions-node">
    <div class="superValue">
      <basic-node v-for="item in superValue" :model="item" :key="item.uid" />
    </div>
    <div class="split"></div>
    <div class="subValue">
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

export default {
  name: NODE_TYPES.FRACTIONS_NODE,
  props: {
    model: Object
  },
  computed: {
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
    }
  }
}
</script>
<style lang="less" scoped>
  @import "../styles/variables.less";

  .fractions-node {
    position: relative;
    height: fit-content;
    width: fit-content;
    margin: 0 5px;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    .split {
      width: 100%;
      height: 2px;
      background: @border-color;
      margin: 2px;
    }
    .superValue, .subValue {
      padding: 0 5px;
      line-height: @normal-input-height;
    }
  }
</style>
