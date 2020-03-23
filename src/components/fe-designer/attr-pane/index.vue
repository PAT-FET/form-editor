<template>
<div>
  <el-tabs v-model="activeName" :class="[$style.tabs]">
    <el-tab-pane label="字段属性" name="field" :class="[$style.pane]">
      <control-attr></control-attr>
    </el-tab-pane>
    <el-tab-pane label="表单属性" name="form" :class="[$style.pane]">
      <form-attr></form-attr>
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import FormAttr from './form-attr/index.vue'
import ControlAttr from './control-attr/index.vue'

@Component({
  components: { FormAttr, ControlAttr }
})
export default class AttrPane extends Vue {
  activeName: 'field' | 'form' = 'field'
}
</script>

<style lang="scss" module>
.tabs {
  width: 100%;
  height: 100%;

  :global {
    .el-tabs__nav {
      width: 100%;
      .el-tabs__item {
        width: 50%;
        padding: 0;
        text-align: center;
      }
    }
    .el-tabs__content {
      height: calc(100% - 48px);
      overflow: auto;
    }
  }
}

.pane {
  height: 100%;
}
</style>
