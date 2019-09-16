<template>
  <component :is="model.compType" :model="model" class="basic-node"></component>
</template>
<script>
export default {
  props: {
    model: Object
  }
}
</script>
<style lang="less" scoped>
  .basic-node {
    box-sizing: content-box;
    flex-shrink: 0;
  }
</style>
