<template>
<div>
<attr-field label="数据源">
  <el-input v-model.trim="def.model"></el-input>
</attr-field>
<attr-field label="标题">
  <el-input v-model.trim="def.name"></el-input>
</attr-field>
<attr-field label="占位内容">
  <el-input v-model.trim="options.placeholder"></el-input>
</attr-field>
<attr-field label="是否多选">
  <el-switch :value="options.multiple" @input="onMultipleInput"></el-switch>
</attr-field>
<attr-field label="选项">
  <options-pane v-model="options.defaultValue" :multiple="options.multiple" :list="options.options"></options-pane>
</attr-field>
<attr-field label="操作属性">
  <el-checkbox v-model="options.hidden">隐藏</el-checkbox>
  <el-checkbox v-model="options.disabled">禁用</el-checkbox>
  <el-checkbox v-model="options.clearable">显示清除按钮</el-checkbox>
</attr-field>
<attr-field label="校验">
  <el-checkbox v-model="options.required">必填</el-checkbox> <br/>
</attr-field>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import ControlMixins from '../ControlMixins'
import { FieldSelectDefinition, FieldSelectOptions } from '@/components/type'
import OptionsPane from '../../options-pane/index.vue'

@Component({
  components: { OptionsPane }
})
export default class SelectAttr extends mixins(ControlMixins) {
  get def (): FieldSelectDefinition {
    return this.activeControl as FieldSelectDefinition
  }

  get options (): FieldSelectOptions {
    return this.def.options
  }

  get multiple () {
    return this.options.multiple
  }

  onMultipleInput (multiple: boolean) {
    this.options.multiple = multiple
    if (multiple) {
      if (Array.isArray(this.options.defaultValue)) return
      const val = this.options.defaultValue
      this.options.defaultValue = []
      if (val) this.options.defaultValue.push(val)
    } else {
      if (!Array.isArray(this.options.defaultValue)) return
      this.options.defaultValue = this.options.defaultValue[0] || ''
    }
  }
}
</script>

<style lang="scss" module>

</style>
