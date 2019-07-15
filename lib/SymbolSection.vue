<template>
  <div>
    <div v-for="mathSymbol in mathSymbols"
      class="math-symbol"
      :key="mathSymbol.nodeType"
      :data-math-symbol="mathSymbol.nodeType"
      @click="onMathSymbolClick">
      <img class="math-symbol-icon" :src="mathSymbol.icon" alt="">
    </div>
  </div>
</template>
<script>
import { MATH_SYMBOLS } from './ constants'
export default {
  data() {
    return {
      mathSymbols: MATH_SYMBOLS
    }
  },
  methods: {
    onMathSymbolClick(evt) {
      const { mathSymbol } = evt.currentTarget.dataset
      this.$emit('addMathSymbol', mathSymbol)
    }
  }
}
</script>
<style lang="less" scoped>
  .math-symbol {
    display: inline-block;
    width: 50px;
    height: 50px;
    margin: 10px 0 0 10px;
    background-size: 100% 100%;
    .math-symbol-icon {
      width: 100%;
      height: 100%;
    }
  }
</style>
