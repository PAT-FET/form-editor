<template>
<div>
<attr-field label="标题">
  <el-input v-model.trim="def.name"></el-input>
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
import { BlockDefinition, BlockOptions } from '@/components/type'

@Component
export default class BlockAttr extends mixins(ControlMixins) {
  get def (): BlockDefinition {
    return this.activeControl as BlockDefinition
  }

  get options (): BlockOptions {
    return this.def.options
  }
}
</script>

<style lang="scss" module>

</style>
