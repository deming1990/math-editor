<template>
  <component :is="model.compType" :model="model"></component>
</template>
<script>
export default {
  props: {
    model: Object
  }
}
</script>
<style lang="less" scoped>
</style>
