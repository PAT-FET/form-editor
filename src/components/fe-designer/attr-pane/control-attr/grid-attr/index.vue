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
<attr-field label="水平排列方式">
  <el-select v-model="options.justify">
    <el-option label="左对齐" value="start"></el-option>
    <el-option label="右对齐" value="end"></el-option>
    <el-option label="局中" value="center"></el-option>
    <el-option label="两侧间隔相等" value="space-around"></el-option>
    <el-option label="两端对齐" value="space-between"></el-option>
  </el-select>
</attr-field>
<attr-field label="垂直排列方式">
  <el-select v-model="options.align">
    <el-option label="顶部对齐" value="top"></el-option>
    <el-option label="居中" value="middle"></el-option>
    <el-option label="底部对齐" value="bottom"></el-option>
  </el-select>
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
    list.push(new GridColumn())
  }
}
</script>

<style lang="scss" module>

</style>
