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

const result = `[["1","2"],{"uid":"3","compType":"4","children":"5"},{"uid":"6","compType":"4","children":"7"},"row-1567067594026","row-container",["8","9","10","11","12","13","14"],"row-1567067594027",["15","16","17","18","19"],{"uid":"20","compType":"21","parent":"1","value":"22"},{"uid":"23","compType":"24","parent":"1","children":"25"},{"uid":"26","compType":"21","parent":"1","value":"22"},{"uid":"27","compType":"28","parent":"1","children":"29"},{"uid":"30","compType":"21","parent":"1","value":"31"},{"uid":"32","compType":"33","parent":"1","children":"34"},{"uid":"35","compType":"21","parent":"1","value":"36"},{"uid":"37","compType":"21","parent":"2","value":"38"},{"uid":"39","compType":"40","parent":"2","children":"41"},{"uid":"42","compType":"21","parent":"2","value":"43"},{"uid":"44","compType":"45","parent":"2","children":"46"},{"uid":"47","compType":"21","parent":"2","value":"48"},"node-1567067594047","text-node","123","node-1567067594046","sub-script-node",["49","50"],"node-1567067594048","node-1567067594039","super-script-and-sub-script-node",["51","52","53"],"node-1567067594041","12123","node-1567067594030","tan-node",["54"],"node-1567067594032","3123","node-1567067594054","123112","node-1567067594053","fractions-node",["55","56"],"node-1567067594059","3231","node-1567067594058","sqrt-node",["57"],"node-1567067594060","23",{"uid":"58","compType":"59","parent":"9","slot":"60","children":"61"},{"uid":"62","compType":"59","parent":"9","slot":"63","children":"64"},{"uid":"65","compType":"59","parent":"11","slot":"60","children":"66"},{"uid":"67","compType":"59","parent":"11","slot":"63","children":"68"},{"uid":"69","compType":"59","parent":"11","slot":"70","children":"71"},{"uid":"72","compType":"59","parent":"13","slot":"60","children":"73"},{"uid":"74","compType":"59","parent":"16","slot":"75","children":"76"},{"uid":"77","compType":"59","parent":"16","slot":"78","children":"79"},{"uid":"80","compType":"59","parent":"18","slot":"60","children":"81"},"node-1567067594043","number-node","value",["82"],"node-1567067594045","sub_script",["83"],"node-1567067594034",["84"],"node-1567067594036",["85"],"node-1567067594038","super_script",["86"],"node-1567067594029",["87"],"node-1567067594050","super_value",["88"],"node-1567067594052","sub_value",["89"],"node-1567067594057",["90"],{"uid":"91","compType":"21","parent":"49","slot":"60","value":"22"},{"uid":"92","compType":"21","parent":"50","slot":"60","value":"93"},{"uid":"94","compType":"21","parent":"51","slot":"60","value":"95"},{"uid":"96","compType":"21","parent":"52","slot":"60","value":"93"},{"uid":"97","compType":"21","parent":"53","slot":"60","value":"22"},{"uid":"98","compType":"21","parent":"54","slot":"60","value":"99"},{"uid":"100","compType":"21","parent":"55","slot":"60","value":"93"},{"uid":"101","compType":"21","parent":"56","slot":"60","value":"93"},{"uid":"102","compType":"21","parent":"57","slot":"60","value":"103"},"node-1567067594042","node-1567067594044","123123","node-1567067594033","213123","node-1567067594035","node-1567067594037","node-1567067594028","12323","node-1567067594049","node-1567067594051","node-1567067594056","12312323"]`;

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
      // this.result = this.$refs.mathEditorA.getValue()
      this.result = result
    },
    handleInput() {
      console.log('result: ', this.result)
      this.$refs.mathEditorB.setValue(result)
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
        flex: 1;
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
