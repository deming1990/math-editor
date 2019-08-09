<template>
  <ul class="math-toolbar">
    <li v-for="category in categories" 
      class="math-toolbar-item" 
      :key="category.code"
      @click="onCategoryClick(category.code)">
      {{category.name}}
    </li>
  </ul>  
</template>
<script>
import {MATH_NODE_CATEGORYS} from '../constants'

export default {
  name: 'math-toolbar',
  data() {
    return {
      categories: MATH_NODE_CATEGORYS
    }
  },
  methods: {
    onCategoryClick(code) {
      this.$emit('categoryClick', code)
    }
  }
}
</script>
<style lang="less" scoped>
  @import '../styles/variables.less';

  .math-toolbar {
    position: relative;
    margin: 0;
    padding: 0;
    list-style: none;
    .math-toolbar-item {
      height: 24px;
      padding: 0 5px;
      line-height: 24px;
      font-size: 12px;
      cursor: pointer;
      border: 1px solid #d3d3d3;
      border-radius: 4px;
      display: inline-block;
      margin: 5px;
    }
  }
</style>
