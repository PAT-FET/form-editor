<template>
<el-form-item :label="def.name">
  <el-input :value="def.defaultValue"></el-input>
</el-form-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { FieldInputDefinition } from '@/components/type'

@Component
export default class InputControl extends Vue {
  @Prop() def!: FieldInputDefinition
}
</script>
