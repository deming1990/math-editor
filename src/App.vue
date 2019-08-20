<template>
  <div class="container">
    <div class="tab-head">
      <div v-for="item in tabs" 
        :class="'tab-head-item'"
        :key="item.id">
        {{item.name}}
      </div>
    </div>
    <div class="tab-body">
      <div class="tab-body-item big">
        <math-editor 
          :mode="'edit'"
          textAreaWidth="210px"
          ref="mathEditorA">
        </math-editor>
      </div>
      <div class="tab-body-item">
        <math-editor :mode="'preview'" ref="mathEditorB"></math-editor>
      </div>
    </div>
    <ul class="action-group">
      <li class="action">
        <button @click="handleOutput">导出数据</button>
      </li>
      <li class="action">
        <button @click="handleInput">导入数据</button>
      </li>
    </ul>
    <div class="result-section">
      <div class="section-title">
        数据
      </div>
      <div class="section-content">
        {{result}}
      </div>
    </div>
  </div>
</template>
<script>

const TABS = [
  {id: 1, name: '编辑模式'},
  {id: 2, name: '预览模式'}
]

export default {
  data() {
    return {
      tabs: TABS,
      currTab: TABS[0].id,
      result: ''
    }
  },
  methods: {
    switchTab(id) {
      this.currTab = id
    },
    handleOutput() {
      this.result = this.$refs.mathEditorA.getValue()
    },
    handleInput() {
      this.$refs.mathEditorB.setValue(this.result)
    }
  }
}
</script>
<style lang="less" scoped>
@border-color: #d3d3d3;
html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
.container {
  position: relative;
  width: 1000px;
  height: 700px;
  display: flex;
  flex-direction: column;
  border: 1px solid @border-color;
  border-radius: 4px;
  .tab-head {
    height: 30;
    display: flex;
    border-bottom: 1px solid @border-color;
    .tab-head-item {
      flex: 1;
      line-height: 30px;
      font-size: 16px;
      color: #333;
      text-align: center;
      border-right: 1px solid @border-color;
      cursor: pointer;
      &:last-child {
        border-right: none;
      }
    }
  }
  .tab-body {
    flex: 1;
    display: flex;
    .tab-body-item {
      flex: 1;
      overflow: hidden;
      padding: 5px;
      &.big {
        flex: 2;
      }
    }
  }
  .action-group {
    height: 30px;
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    .action {
      flex: 1;
      padding-left: 10px;
    }
  }
  .result-section {
    .section-title {
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      text-align: center;
      color: #333;
      border-top: 1px solid #d3d3d3;
      border-bottom: 1px solid #d3d3d3;
    }
    .section-content {
      height: 150px;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
}
</style>
