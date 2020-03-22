<template>
<el-row :class="[designCls]">
  <el-col v-for="(row, i) in def.columns" :key="i" :span="row.span" :class="[$style.col]">
    <form-control v-for="item in row.list" :key="item.key" :def="item" :design="design"></form-control>
  </el-col>
</el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue, InjectReactive } from 'vue-property-decorator'
import { GridDefinition, FieldDefinition } from '@/components/type'
import FormControl from '@/components/form-instance/form-control/index.vue'

@Component({
  components: { FormControl }
})
export default class GridControl extends Vue {
  @Prop() def!: GridDefinition

  @InjectReactive() design!: boolean

  get designCls () {
    return this.design ? this.$style.design : ''
  }

  $style!: any
}
</script>

<style lang="scss" module>

.design {
  margin: 4px;
  &>.col {
    min-height: 50px;
    border: 1px dashed #ccc;
    background: #fff;
  }
}
</style>
