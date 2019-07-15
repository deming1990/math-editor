<template>
  <div class="fractions">
    <div :class="['box', hasNumerator ? '' : 'none']">
      <Node v-for="item in numerator" :dataSet="item" :key="item.id" />
    </div>
    <div class="split"></div>
    <div :class="['box', hasDenominator ? '' : 'none']">
      <Node v-for="item in denominator" :dataSet="item" :key="item.id" />
    </div>
  </div>  
</template>
<script>
export default {
  components: {
    Node
  },
  props: {
    dataSet: Object
  },
  computed: {
    numerator() {
      return this.dataSet.children.filter(item => item.options.slotName === 'numerator')
    },
    denominator() {
      return this.dataSet.children.filter(item => item.options.slotName === 'denominator')
    },
    hasNumerator() {
      return this.numerator.length > 1 || this.numerator[0].options.value !== ''
    },
    hasDenominator() {
      return this.denominator.length > 1 || this.denominator[0].options.value !== ''
    }
  },
  beforeCreate() {
    this.$options.components.Node = require('../Node.vue').default
  }
}
</script>
<style lang="less" scoped>
  @import "./styles.less";
  .fractions {
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .split {
    width: 100%;
    height: 2px;
    background: #000;
    margin: 5px;
  }
</style>
