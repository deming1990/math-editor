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
  html, body {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
  }
  .main {
    position: absolute;
    width: 500px;
    height: 500px;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
</style>
