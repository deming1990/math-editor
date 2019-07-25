<template>
  <component :is="model.compType" :model="model"></component>
</template>
<script>
export default {
  name: 'basic-node',
  props: {
    model: Object
  }
}
</script>
<style lang="less" scoped>
</style>
