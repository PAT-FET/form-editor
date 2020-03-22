<template>
<div :class="[$style.container]">
  <el-form-item :label="label">
    <slot></slot>
  </el-form-item>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, InjectReactive } from 'vue-property-decorator'
import { FormDefinition, FormOptions } from '@/components/type'

@Component
export default class FormAttr extends Vue {
  @Prop(String) label!: string
}
</script>

<style lang="scss" module>
.container {
  :global {
    .el-form-item {
      border-bottom: 1px solid #e1e1e1;
      padding-bottom: 10px;
    }
  }
}
</style>
