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
      height: 40px;
      width: 100px;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
      cursor: pointer;
      border-right: 1px solid @border-color;
      display: inline-block;
    }
  }
</style>
