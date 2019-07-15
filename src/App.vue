<template>
  <div class="main">
    <MathEditor />
  </div>
</template>
<script>
import MathEditor from '../lib/MathEditor.vue'
export default {
  components: {
    MathEditor
  }
}
</script>
<style lang="less" scoped>
  .main {
    width: 500px;
    height: 300px;
    border: 1px solid #000;
  }
</style>
