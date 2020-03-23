<template>
<div>
<attr-field label="栅格间隔">
  <el-input-number v-model="options.gutter" :min="0"></el-input-number>
</attr-field>
<attr-field label="列配置项">
  <options-pane :list="columns" :checkable="false" :add-fn="addFn">
    <template slot-scope="{row}">
      <div style="margin-right: 12px;">
        <el-input-number v-model="row.span" :min="0" size="mini"></el-input-number>
      </div>
    </template>
  </options-pane>
</attr-field>
<attr-field label="操作属性">
  <el-checkbox v-model="options.hidden">隐藏</el-checkbox>
</attr-field>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import ControlMixins from '../ControlMixins'
import { GridDefinition, GridOptions, GridColumn } from '@/components/type'
import OptionsPane from '../../options-pane/index.vue'

@Component({
  components: { OptionsPane }
})
export default class GridAttr extends mixins(ControlMixins) {
  get def (): GridDefinition {
    return this.activeControl as GridDefinition
  }

  get options (): GridOptions {
    return this.def.options
  }

  get columns (): GridColumn[] {
    return this.def.columns
  }

  addFn (list: GridColumn[]) {

  }
}
</script>

<style lang="scss" module>

</style>
