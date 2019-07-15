<template>
  <div class="math-editor">
    <InputSection class="section" ref="inputSection" />
    <SymbolSection class="section" @addMathSymbol="handleAddMathSymbol" />
  </div>  
</template>
<script>
import Vue from 'vue'
import InputSection from './InputSection.vue'
import SymbolSection from './SymbolSection.vue'

export default {
  components: {
    InputSection,
    SymbolSection
  },
  methods: {
    handleAddMathSymbol(mathSymbol) {
      this.$refs.inputSection.addMathSymbol(mathSymbol)
    }
  }
}
</script>
<style lang="less" scoped>
  .math-editor {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .section {
      flex: 1;
      border-bottom: 1px solid #000;
      &:last-child {
        border-bottom: none;
      }
    }
  }
</style>
