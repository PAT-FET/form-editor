<template>
<div>
<attr-field label="数据源">
  <el-input v-model.trim="def.model"></el-input>
</attr-field>
<attr-field label="标题">
  <el-input v-model.trim="def.name"></el-input>
</attr-field>
<attr-field label="默认值">
  <el-input v-model.trim="options.defaultValue"></el-input>
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
import { FieldTextDefinition, FieldTextOptions } from '@/components/type'

@Component
export default class TextAttr extends mixins(ControlMixins) {
  get def (): FieldTextDefinition {
    return this.activeControl as FieldTextDefinition
  }

  get options (): FieldTextOptions {
    return this.def.options
  }
}
</script>

<style lang="scss" module>

</style>
