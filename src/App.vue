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
      <div class="tab-body-item">
        <math-editor 
          :mode="'edit'"
          ref="mathEditorA">
        </math-editor>
      </div>
      <div class="tab-body-item">
        <math-editor :mode="'preview'" ref="mathEditorB"></math-editor>
      </div>
      <div class="tab-body-item">
        <math-editor :mode="'html'" ref="mathEditorC"></math-editor>
      </div>
    </div>
    <ul class="action-group">
      <li class="action">
        <button @click="handleOutput">导出数据</button>
      </li>
      <li class="action">
        <button @click="handleInput">导入数据</button>
      </li>
      <li class="action">
        <button @click="handleHtml">导出\导入HTML</button>
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
  {id: 2, name: '预览模式'},
  {id: 3, name: 'HTML模式'}
]

const result = [
    [
        "1",
        "2"
    ],
    {
        "uid": "3",
        "compType": "4",
        "children": "5"
    },
    {
        "uid": "6",
        "compType": "4",
        "children": "7"
    },
    "row-1571726105058",
    "row-container",
    [
        "8"
    ],
    "row-1571726105059",
    [
        "9",
        "10",
        "11"
    ],
    {
        "uid": "12",
        "compType": "13",
        "parent": "1",
        "value": "14"
    },
    {
        "uid": "15",
        "compType": "13",
        "parent": "2",
        "value": "16"
    },
    {
        "uid": "17",
        "compType": "18",
        "parent": "2",
        "children": "19"
    },
    {
        "uid": "20",
        "compType": "13",
        "parent": "2",
        "value": "21"
    },
    "node-1571726108911",
    "text-node",
    "【答案】10.28平方厘米 ",
    "node-1573613412294",
    "【分析】4个圆阴影部分各取其中的",
    "node-1573613412293",
    "fractions-node",
    [
        "22",
        "23"
    ],
    "node-1573613412295",
    "圆填补到中间的正方形，这样正方形被补满，外面4个圆中的阴影均剩下半个圆，拼到一起为2个完整的圆.求出阴影面积即可.正方形边长为1×2=2（厘米）；面积为2×2=4（平方厘米）；2个完整圆的面积：2×1×1×3.14=6.28（平方厘米）；阴影总面积：4+6.28=10.28（平方厘米）．",
    {
        "uid": "24",
        "compType": "25",
        "parent": "26",
        "slot": "27",
        "children": "28"
    },
    {
        "uid": "29",
        "compType": "25",
        "parent": "26",
        "slot": "30",
        "children": "31"
    },
    "node-1573613412290",
    "number-node",
    {
        "uid": "17",
        "compType": "18",
        "parent": "2",
        "children": "19"
    },
    "super_value",
    [
        "32"
    ],
    "node-1573613412292",
    "sub_value",
    [
        "33"
    ],
    {
        "uid": "34",
        "compType": "13",
        "parent": "35",
        "slot": "36",
        "value": "37"
    },
    {
        "uid": "38",
        "compType": "13",
        "parent": "39",
        "slot": "36",
        "value": "40"
    },
    "node-1573613412289",
    {
        "uid": "24",
        "compType": "25",
        "parent": "26",
        "slot": "27",
        "children": "28"
    },
    "value",
    "1",
    "node-1573613412291",
    {
        "uid": "29",
        "compType": "25",
        "parent": "26",
        "slot": "30",
        "children": "31"
    },
    "4"
];

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
      this.$refs.mathEditorB.setValue(JSON.stringify(result))
    },
    handleHtml() {
      const html = this.$refs.mathEditorA.getHtml()
      this.$refs.mathEditorC.setHtml(html)
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
