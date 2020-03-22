<template>
<el-row>
  <el-col v-for="(row, i) in def.columns" :key="i">

  </el-col>
</el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { GridDefinition, FieldDefinition } from '@/components/type'

@Component
export default class GridControl extends Vue {
  @Prop() def!: GridDefinition | FieldDefinition
}
</script>
