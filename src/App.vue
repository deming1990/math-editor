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

const result = `[["1","2"],{"uid":"3","compType":"4","children":"5"},{"uid":"6","compType":"4","children":"7"},"row-1567420124982","row-container",["8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72"],"row-1567420124983",["73","74","75","76","77","78","79","80","81","82","83","84","85"],{"uid":"86","compType":"87","parent":"1","value":"88"},{"uid":"89","compType":"90","parent":"1"},{"uid":"91","compType":"87","parent":"1","value":"92"},{"uid":"93","compType":"94","parent":"1"},{"uid":"95","compType":"87","parent":"1","value":"96"},{"uid":"97","compType":"90","parent":"1"},{"uid":"98","compType":"87","parent":"1","value":"99"},{"uid":"100","compType":"101","parent":"1"},{"uid":"102","compType":"87","parent":"1","value":"103"},{"uid":"104","compType":"105","parent":"1"},{"uid":"106","compType":"87","parent":"1","value":"107"},{"uid":"108","compType":"90","parent":"1"},{"uid":"109","compType":"87","parent":"1","value":"110"},{"uid":"111","compType":"112","parent":"1","children":"113"},{"uid":"114","compType":"87","parent":"1","value":"110"},{"uid":"115","compType":"94","parent":"1"},{"uid":"116","compType":"87","parent":"1","value":"110"},{"uid":"117","compType":"118","parent":"1","children":"119"},{"uid":"120","compType":"87","parent":"1","value":"110"},{"uid":"121","compType":"105","parent":"1"},{"uid":"122","compType":"87","parent":"1","value":"110"},{"uid":"123","compType":"124","parent":"1","children":"125"},{"uid":"126","compType":"87","parent":"1","value":"110"},{"uid":"127","compType":"90","parent":"1"},{"uid":"128","compType":"87","parent":"1","value":"110"},{"uid":"129","compType":"130","parent":"1","children":"131"},{"uid":"132","compType":"87","parent":"1","value":"110"},{"uid":"133","compType":"134","parent":"1"},{"uid":"135","compType":"87","parent":"1","value":"136"},{"uid":"137","compType":"138","parent":"1"},{"uid":"139","compType":"87","parent":"1","value":"140"},{"uid":"141","compType":"142","parent":"1"},{"uid":"143","compType":"87","parent":"1","value":"144"},{"uid":"145","compType":"146","parent":"1"},{"uid":"147","compType":"87","parent":"1","value":"88"},{"uid":"148","compType":"149","parent":"1"},{"uid":"150","compType":"87","parent":"1","value":"103"},{"uid":"151","compType":"152","parent":"1"},{"uid":"153","compType":"87","parent":"1","value":"154"},{"uid":"155","compType":"156","parent":"1"},{"uid":"157","compType":"87","parent":"1","value":"158"},{"uid":"159","compType":"160","parent":"1"},{"uid":"161","compType":"87","parent":"1","value":"162"},{"uid":"163","compType":"164","parent":"1"},{"uid":"165","compType":"87","parent":"1","value":"166"},{"uid":"167","compType":"168","parent":"1"},{"uid":"169","compType":"87","parent":"1","value":"170"},{"uid":"171","compType":"172","parent":"1","children":"173"},{"uid":"174","compType":"87","parent":"1","value":"110"},{"uid":"175","compType":"176","parent":"1"},{"uid":"177","compType":"87","parent":"1","value":"178"},{"uid":"179","compType":"180","parent":"1"},{"uid":"181","compType":"87","parent":"1","value":"182"},{"uid":"183","compType":"184","parent":"1"},{"uid":"185","compType":"87","parent":"1","value":"186"},{"uid":"187","compType":"188","parent":"1"},{"uid":"189","compType":"87","parent":"1","value":"190"},{"uid":"191","compType":"192","parent":"1","children":"193"},{"uid":"194","compType":"87","parent":"1","value":"110"},{"uid":"195","compType":"196","parent":"1","children":"197"},{"uid":"198","compType":"87","parent":"1","value":"186"},{"uid":"199","compType":"200","parent":"1","children":"201"},{"uid":"202","compType":"87","parent":"1","value":"110"},{"uid":"203","compType":"200","parent":"1","children":"204"},{"uid":"205","compType":"87","parent":"1","value":"110"},{"uid":"206","compType":"87","parent":"2","value":"110"},{"uid":"207","compType":"208","parent":"2","children":"209"},{"uid":"210","compType":"87","parent":"2","value":"110"},{"uid":"211","compType":"212","parent":"2","children":"213"},{"uid":"214","compType":"87","parent":"2","value":"110"},{"uid":"215","compType":"216","parent":"2","children":"217"},{"uid":"218","compType":"87","parent":"2","value":"110"},{"uid":"219","compType":"220","parent":"2","children":"221"},{"uid":"222","compType":"87","parent":"2","value":"110"},{"uid":"223","compType":"224","parent":"2","children":"225"},{"uid":"226","compType":"87","parent":"2","value":"110"},{"uid":"227","compType":"228","parent":"2"},{"uid":"229","compType":"87","parent":"2","value":"110"},"node-1567420169761","text-node","2","node-1567420169762","plus-node","node-1567420169764","3","node-1567420169765","minus-node","node-1567420169767","a","node-1567420169768","node-1567420169770","B","node-1567420169771","multiplication-node","node-1567420169773","45","node-1567420169774","division-node","node-1567420169776","BD","node-1567420169777","node-1567420169783","","node-1567420169782","sqrt-node",["230"],"node-1567420169786","node-1567420169785","node-1567420169793","node-1567420169792","nth-sqrt-node",["231","232"],"node-1567420169796","node-1567420169795","node-1567420169803","node-1567420169802","fractions-node",["233","234"],"node-1567420169806","node-1567420169805","node-1567420169813","node-1567420169812","square-node",["235","236"],"node-1567420169819","node-1567420169818","greater-than-node","node-1567420169779","4","node-1567420169821","less-than-node","node-1567420169823","cv","node-1567420169824","greater-equal-node","node-1567420169826","FT","node-1567420169827","less-equal-node","node-1567420169829","node-1567420169830","equal-node","node-1567420169832","node-1567420169833","unequal-node","node-1567420169835","555","node-1567420169836","parallel-node","node-1567420169838","77","node-1567420169839","perp-node","node-1567420169841","56","node-1567420169842","swung-dash-node","node-1567420169844","67","node-1567420169845","equal-or-approximately-equal-node","node-1567420169847","T","node-1567420169850","sin-node",["237"],"node-1567420169864","node-1567420169863","angle-node","node-1567420169852","33","node-1567420169866","triangle-node","node-1567420169868","44","node-1567420169869","parallelogram-node","node-1567420169871","55","node-1567420169872","ellipsis-node","node-1567420169874","66","node-1567420169877","bracket-node",["238"],"node-1567420169883","node-1567420169882","square-bracket-node",["239"],"node-1567420169879","node-1567420169887","curly-brace-node",["240"],"node-1567420169893","node-1567420169892",["241"],"node-1567420169899","node-1567420169897","node-1567420169896","number-node",["242"],"node-1567420169904","node-1567420169903","degree-node",["243"],"node-1567420169911","node-1567420169910","sub-script-node",["244","245"],"node-1567420169916","node-1567420169915","precent-node",["246"],"node-1567420169925","node-1567420169924","super-script-and-sub-script-node",["247","248","249"],"node-1567420169928","node-1567420169927","pi-node","node-1567420169889",{"uid":"250","compType":"208","parent":"21","slot":"251","children":"252"},{"uid":"253","compType":"208","parent":"25","slot":"251","children":"254"},{"uid":"255","compType":"208","parent":"25","slot":"256","children":"257"},{"uid":"258","compType":"208","parent":"29","slot":"259","children":"260"},{"uid":"261","compType":"208","parent":"29","slot":"262","children":"263"},{"uid":"264","compType":"208","parent":"33","slot":"251","children":"265"},{"uid":"266","compType":"208","parent":"33","slot":"256","children":"267"},{"uid":"268","compType":"208","parent":"55","slot":"251","children":"269"},{"uid":"270","compType":"208","parent":"65","slot":"251","children":"271"},{"uid":"272","compType":"208","parent":"67","slot":"251","children":"273"},{"uid":"274","compType":"208","parent":"69","slot":"251","children":"275"},{"uid":"276","compType":"208","parent":"71","slot":"251","children":"277"},{"uid":"278","compType":"87","parent":"74","slot":"251","value":"279"},{"uid":"280","compType":"208","parent":"76","slot":"251","children":"281"},{"uid":"282","compType":"208","parent":"78","slot":"251","children":"283"},{"uid":"284","compType":"208","parent":"78","slot":"285","children":"286"},{"uid":"287","compType":"208","parent":"80","slot":"251","children":"288"},{"uid":"289","compType":"208","parent":"82","slot":"251","children":"290"},{"uid":"291","compType":"208","parent":"82","slot":"285","children":"292"},{"uid":"293","compType":"208","parent":"82","slot":"256","children":"294"},"node-1567420169781","value",["295"],"node-1567420169789",["296"],"node-1567420169791","super_script",["297"],"node-1567420169799","super_value",["298"],"node-1567420169801","sub_value",["299"],"node-1567420169809",["300"],"node-1567420169811",["301","302"],"node-1567420169849",["303","304","305","306"],"node-1567420169876",["307"],"node-1567420169881",["308"],"node-1567420169886",["309"],"node-1567420169891",["310"],"node-1567420169895","88","node-1567420169902",["311"],"node-1567420169907",["312"],"node-1567420169909","sub_script",["313"],"node-1567420169914",["314"],"node-1567420169919",["315"],"node-1567420169921",["316"],"node-1567420169923",["317"],{"uid":"318","compType":"87","parent":"230","slot":"251","value":"319"},{"uid":"320","compType":"87","parent":"231","slot":"251","value":"321"},{"uid":"322","compType":"87","parent":"232","slot":"251","value":"323"},{"uid":"324","compType":"87","parent":"233","slot":"251","value":"325"},{"uid":"326","compType":"87","parent":"234","slot":"251","value":"327"},{"uid":"328","compType":"87","parent":"235","slot":"251","value":"329"},{"uid":"330","compType":"87","parent":"236","slot":"251","value":"331"},{"uid":"332","compType":"87","parent":"236","slot":"251","value":"110"},{"uid":"333","compType":"87","parent":"237","slot":"251","value":"331"},{"uid":"334","compType":"87","parent":"237","slot":"251","value":"335"},{"uid":"336","compType":"337","parent":"237","slot":"251","children":"338"},{"uid":"339","compType":"87","parent":"237","slot":"251","value":"110"},{"uid":"340","compType":"87","parent":"238","slot":"251","value":"182"},{"uid":"341","compType":"87","parent":"239","slot":"251","value":"182"},{"uid":"342","compType":"87","parent":"240","slot":"251","value":"186"},{"uid":"343","compType":"87","parent":"241","slot":"251","value":"158"},{"uid":"344","compType":"87","parent":"243","slot":"251","value":"329"},{"uid":"345","compType":"87","parent":"244","slot":"251","value":"186"},{"uid":"346","compType":"87","parent":"245","slot":"251","value":"88"},{"uid":"347","compType":"87","parent":"246","slot":"251","value":"182"},{"uid":"348","compType":"87","parent":"247","slot":"251","value":"178"},{"uid":"349","compType":"87","parent":"248","slot":"251","value":"88"},{"uid":"350","compType":"87","parent":"249","slot":"251","value":"92"},"node-1567420169780","12","node-1567420169788","AB","node-1567420169790","XS","node-1567420169798","WER","node-1567420169800","ACV","node-1567420169808","23","node-1567420169810","34","node-1567420169817","node-1567420169848","node-1567420169857","5","node-1567420169860","tan-node",["351"],"node-1567420169862","node-1567420169875","node-1567420169880","node-1567420169885","node-1567420169890","node-1567420169901","node-1567420169906","node-1567420169908","node-1567420169913","node-1567420169918","node-1567420169920","node-1567420169922",{"uid":"352","compType":"208","parent":"305","slot":"251","children":"353"},"node-1567420169859",["354"],{"uid":"355","compType":"87","parent":"351","slot":"251","value":"186"},"node-1567420169858"]`

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
