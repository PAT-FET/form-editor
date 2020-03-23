<template>
<el-row :class="[designCls]" :gutter="options.gutter" :hidden="options.hidden">
  <el-col v-for="(row, i) in columns" :key="i" :span="row.span">
    <div :class="[$style.col]">
      <form-control v-for="item in row.list" :key="item.key" :def="item" :design="design"></form-control>
    </div>
  </el-col>
</el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject } from 'vue-property-decorator'
import { GridDefinition, GridOptions, GridColumn } from '@/components/type'
import FormControl from '@/components/form-instance/form-control/index.vue'

@Component({
  components: { FormControl }
})
export default class GridControl extends Vue {
  @Prop() def!: GridDefinition

  @Inject() getDesign!: () => boolean

  get design () {
    return this.getDesign()
  }

  get designCls () {
    return this.design ? this.$style.design : ''
  }

  get options (): GridOptions {
    return this.def.options
  }

  get columns (): GridColumn[] {
    return this.def.columns
  }

  $style!: any
}
</script>

<style lang="scss" module>
.col {}

.design {
  margin: 4px;
  & .col {
    height: 50px;
    border: 1px dashed #ccc;
    background: #fff;
  }
}
</style>
