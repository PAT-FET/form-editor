<template>
<el-form-item :label="def.name" :prop="def.model">
  <el-select :value="def.defaultValue">
    <el-option v-for="row in def.options.options" :label="row.label" :value="row.value" :key="row.value">
    </el-option>
  </el-select>
</el-form-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { FieldSelectDefinition } from '@/components/type'

@Component
export default class SelectControl extends Vue {
  @Prop() def!: FieldSelectDefinition
}
</script>
