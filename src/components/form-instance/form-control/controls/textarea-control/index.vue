<template>
<el-form-item :label="def.name" :prop="def.model">
  <el-input type="textarea" :rows="3" :value="def.defaultValue">
</el-input>
</el-form-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { FieldTextareaDefinition } from '@/components/type'

@Component
export default class TextareaControl extends Vue {
  @Prop() def!: FieldTextareaDefinition
}
</script>
