<template>
  <div class="sqrt-node" :id="model.uid" ref="sqrtNode">
    <div class="sqrt-node-nth" ref="sqrtNodeNth" v-if="hasSupers">
      <basic-node v-for="item in supers" :model="item" :key="item.uid" />
    </div>
    <div class="sqrt-node-value" ref="sqrtNodeValue" :style="sqrtValueStyle">
      <div class="sqrt-node-part1">
        <svg style="position: absolute;top: 0;left: 0;height: 100%;width: 100%;" viewBox="0 0 74.842293 127.48769" preserveAspectRatio="none">
          <defs id="defs4">
            <clipPath clipPathUnits="userSpaceOnUse" id="clipPath3765">
              <rect style="fill:#b1ded2;fill-opacity:1;stroke:none" id="rect3767" width="74.842293" height="127.62585" x="198.84776" y="668.99451"></rect>
            </clipPath>
          </defs>
          <g inkscape:label="Layer 1" inkscape:groupmode="layer" id="layer1" transform="translate(-198.84776,-668.99451)">
            <g clip-path="url(#clipPath3765)">
              <path d="m 265.30006,796.48219 -47.75994,-111.23309 -14.88621,11.47479 -3.82493,-3.82493 30.28931,-23.46646 44.65864,103.89336 109.8892,-228.9789 c 0.68896,-1.30943 1.89502,-1.96414 3.61817,-1.96415 1.17139,1e-5 2.17069,0.41351 2.99792,1.24052 0.8268,0.82701 1.2403,1.82632 1.24052,2.99791 -2.2e-4,0.68918 -0.0691,1.17161 -0.20676,1.44728 L 273.15667,794.51804 c -0.55144,1.30919 -1.61966,1.96391 -3.20467,1.96415 l -4.65194,0" style="" id="path2987"></path>
            </g>
          </g>
        </svg>
      </div>
      <div class="sqrt-node-part2">
        <svg style="height: 100%;width: 100%;" viewBox="0 0 130.0331 256.45282" preserveAspectRatio="none">
          <g transform="translate(-391.39675,-547.35338)">
            <g transform="scale(1.1433177,0.87464752)" style="">
              <path stroke="black" stroke-width="10" d="m 342.3342,915.58351 0,-0.95508 c 0.053,-0.1064 0.0796,-0.21252 0.0796,-0.31835 0.053,-0.1064 0.0796,-0.21252 0.0796,-0.31836 L 448.42675,628.42526 c 0.42437,-1.37954 1.51208,-2.25503 3.26317,-2.62645 l 0.95507,0 c 1.75084,0.31836 2.89162,1.45914 3.42234,3.42234 l 0,0.95507 c -1.2e-4,0.10612 -0.0267,0.23877 -0.0796,0.39795 -1.2e-4,0.10612 -0.0266,0.21224 -0.0796,0.31836 L 349.97477,916.45899 c -0.42449,1.3262 -1.51221,2.17515 -3.26316,2.54686 l -0.95507,0 c -1.75098,-0.31865 -2.89176,-1.45943 -3.42234,-3.42234" id="path2987">
              </path>
            </g>
          </g>
        </svg>
      </div>
      <div class="sqrt-node-content">
        <basic-node v-for="item in values" :model="item" :key="item.uid" />
      </div>
    </div>
  </div>
</template>
<script>
import {
  SLOT_SUPER_SCRIPT,
  SLOT_SUB_SCRIPT,
  SLOT_VALUE
} from '../constants'
import compMixin from './component-mixin'
export default {
  mixins: [compMixin],
  props: {
    model: Object
  },
  data() {
    return {
      sqrtValueStyle: {}
    }
  },
  computed: {
    values() {
      return this.model.children.filter(item => item.slot === SLOT_VALUE)
    },
    supers() {
      return this.model.children.filter(item => item.slot === SLOT_SUPER_SCRIPT)
    },
    hasSupers() {
      return this.supers.length > 0
    }
  },
  mounted() {
    this.hasSupers && this.addSuperScriptObserver()
  },
  destroyed() {
    this.hasSupers && this.removeSuperScriptObserver()
  },
  methods: {
    resizeSqrtValuePosition() {
      let height = parseFloat(getComputedStyle(this.$refs.sqrtNodeNth).height)
      height -= 10
      this.$set(this.sqrtValueStyle, 'marginTop', `${height}px`)
    },
    addSuperScriptObserver() {
      this.superScriptObserver = this._addMutationObserver(this.$refs.sqrtNodeNth, this.resizeSqrtValuePosition)
    },
    removeSuperScriptObserver() {
      this._removeMutationObserver(this.superScriptObserver)
    }
  }
}
</script>
<style lang="less">
  .sqrt-node {
    .number-node {
      min-width: 14px!important;
    }
  }
</style>
<style lang="less" scoped>
  @import '../styles/variables.less';
  .sqrt-node {
    position: relative;
    display: inline-flex;
  }
  .sqrt-node-nth {
    position: relative;
    height: fit-content;
    margin-right: -17px;
    display: inline-flex;
  }
  .sqrt-node-value {
    position: relative;
    margin-left: 21px;
    display: inline-flex;
    // align-items: center;
    .sqrt-node-part1 {
      position: absolute;
      left: -20px;
      bottom: 0;
      height: 10px;
      width: 11px;
    }
    .sqrt-node-part2 {
      position: absolute;
      top: 0;
      left: -10px;
      height: 100%;
      width: 10px;
    }
    .sqrt-node-content {
      position: relative;
      top: 0px;
      left: 0;
      border-top: 2px solid #333;
    }
  }
</style>
