<template>
<el-form-item :label="def.name" :prop="def.model" :rules="rules" :hidden="options.hidden">
  <el-select v-model="value"
    collapse-tags
    :disabled="options.disabled"
    :multiple="options.multiple"
    :clearable="options.clearable"
    :placeholder="options.placeholder">
    <el-option v-for="row in def.options.options" :label="row.label" :value="row.value" :key="row.value">
    </el-option>
  </el-select>
</el-form-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import FieldMixins from '../FieldMixins'
import { FieldSelectDefinition } from '@/components/type'

@Component
export default class SelectControl extends mixins(FieldMixins) {
}
</script>
