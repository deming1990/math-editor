<template>
  <div :class="{'square-node': true, 'sub': hasSubScript && !hasSuperScript}" :id="model.uid">
    <div class="square-value" :style="valueStyle" ref="value">
      <basic-node v-for="item in values" :model="item" :key="item.uid" />
    </div>
    <div class="square-script">
      <div class="square-super-script" ref="superScript" v-if="hasSuperScript">
        <basic-node v-for="item in supers" :model="item" :key="item.uid" />
      </div>
      <div class="square-sub-script" ref="subScript" v-if="hasSubScript">
        <basic-node v-for="item in subs" :model="item" :key="item.uid" />
      </div>
    </div>
  </div>
</template>
<script>
import {
  NODE_TYPES,
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
      valueStyle: {}
    }
  },
  computed: {
    values() {
      return this.model.children.filter(item => item.slot === SLOT_VALUE)
    },
    subs() {
      return this.model.children.filter(item => item.slot === SLOT_SUB_SCRIPT)
    },
    supers() {
      return this.model.children.filter(item => item.slot === SLOT_SUPER_SCRIPT)
    },
    hasSubScript() {
      return this.subs.length > 0
    },
    hasSuperScript() {
      return this.supers.length > 0
    }
  },
  mounted() {
    this.hasSuperScript && this.addSuperScriptObserver()
    this.hasSubScript && this.addSubScriptObserver()
  },
  destroyed() {
    this.hasSuperScript && this.removeSuperScriptObserver()
    this.hasSubScript && this.removeSubScriptObserver()
  },
  methods: {
    resizeValuePosition() {
      if(this.hasSuperScript) {
        let height =  (this.$refs.superScript && this.$refs.superScript.clientHeight) || this._smallHeight
        height -= 10
        this.$set(this.valueStyle, 'marginTop', `${height}px`)
      }
      if(this.hasSubScript) {
        let height = (this.$refs.subScript && this.$refs.subScript.clientHeight) || this._smallHeight
        height -= 10
        this.$set(this.valueStyle, 'marginBottom', `${height}px`)
      }
    },
    addSuperScriptObserver() {
      setTimeout(() => {
        this.resizeValuePosition()
      }, 0)
      this.superScriptObserver = this._addMutationObserver(this.$refs.superScript, this.resizeValuePosition)
    },
    removeSuperScriptObserver() {
      this._removeMutationObserver(this.superScriptObserver)
    },
    addSubScriptObserver() {
      setTimeout(() => {
        this.resizeValuePosition()
      }, 0)
      this.subScriptObserver = this._addMutationObserver(this.$refs.subScript, this.resizeValuePosition)
    },
    removeSubScriptObserver() {
      this._removeMutationObserver(this.subScriptObserver)
    }
  }
}
</script>
<style lang="less" scoped>
  @import '../styles/variables.less';
  .square-node {
    position: relative;
    display: inline-flex;
    &.sub {
      align-items: flex-end;
    }
  }
  .square-script {
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .square-value {
    position: relative;
    display: inline-flex;
    align-items: center;
    height: fit-content;
  }
  .square-super-script, 
  .square-sub-script {
    position: relative;
    height: fit-content;
    display: inline-flex;
  }
</style>
