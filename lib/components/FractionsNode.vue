<template>
  <div :id="model.uid" :class="fractionsClazz">
    <div class="superValue">
      <template v-if="!isSlantedFractions">
        <basic-node v-for="item in superValue" :model="item" :key="item.uid" />
      </template>
      <template v-else>
        <div>
          <basic-node v-for="item in superValue" :model="item" :key="item.uid" />
        </div>
        <div class="hidden">
          <basic-node v-for="item in subValue" :model="item" :key="item.uid" />
        </div>
      </template>
    </div>
    <div class="split"></div>
    <div class="subValue">
      <template v-if="!isSlantedFractions">
        <basic-node v-for="item in subValue" :model="item" :key="item.uid" />
      </template>
      <template v-else>
        <div class="hidden">
          <basic-node v-for="item in superValue" :model="item" :key="item.uid" />
        </div>
        <div>
          <basic-node v-for="item in subValue" :model="item" :key="item.uid" />
        </div>
      </template>
    </div>
  </div>  
</template>
<script>
import {
  NODE_TYPES,
  SLOT_SUPER_VALUE,
  SLOT_SUB_VALUE
} from '../constants'

export default {
  name: NODE_TYPES.FRACTIONS_NODE,
  props: {
    model: Object
  },
  computed: {
    isSlantedFractions() {
      return this.model.compType === NODE_TYPES.SLANTED_FRACTION_NODE
    },
    fractionsClazz() {
      const compType = this.model.compType
      return {
        'fractions-node': compType === NODE_TYPES.FRACTIONS_NODE,
        'slanted-fractions-node': compType === NODE_TYPES.SLANTED_FRACTION_NODE
      }
    },
    superValue() {
      return this.model.children.filter(item => item.slot === SLOT_SUPER_VALUE)
    },
    subValue() {
      return this.model.children.filter(item => item.slot === SLOT_SUB_VALUE)
    },
    hasSuperValue() {
      return this.superValue.length > 1 || this.superValue[0].value !== ''
    },
    hasSubValue() {
      return this.subValue.length > 1 || this.subValue[0].value !== ''
    }
  }
}
</script>
<style lang="less" scoped>
  @import "../styles/variables.less";

  .fractions-node {
    position: relative;
    width: fit-content;
    margin: 0 5px;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    &>.split {
      width: 100%;
      height: 2px;
      background: @border-color;
      margin: 2px;
    }
    &>.superValue, &>.subValue {
      padding: 0 5px;
    }
  }

  .slanted-fractions-node {
    position: relative;
    display: inline-flex;
    &>.split {
      position: relative;
      width: 20px;
      margin: 0 2.5px;
      background: linear-gradient(to bottom right, transparent calc(50% - 2px), black calc(50% - 2px), black 50%, transparent 50%);
    }
    &>.superValue, &>.subValue {
      .hidden {
        visibility: hidden;
        width: 1px;
      }
    }
    &>.superValue {
      margin-right: -8px;
    }
    &>.subValue {
      margin-left: -8px;
    }
  }
</style>
