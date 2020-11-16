<template>
<div>
<attr-field label="数据源">
  <el-input v-model.trim="def.model"></el-input>
</attr-field>
<attr-field label="栅格间隔">
  <el-input-number v-model="options.gutter" :min="0"></el-input-number>
</attr-field>
<attr-field label="列数">
  <el-input-number v-model="options.col" :min="1"></el-input-number>
</attr-field>
<attr-field label="行数">
  <el-input-number v-model="options.row" :min="1"></el-input-number>
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
export default class LatticeAttr extends mixins(ControlMixins) {
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
