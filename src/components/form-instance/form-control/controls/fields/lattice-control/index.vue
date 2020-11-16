<template>
<el-row :class="[designCls]" :gutter="options.gutter" :justify="options.justify" :align="options.align" :hidden="options.hidden">
  <el-col v-for="(row, i) in columns" :key="i" :span="row.span">
    <draggable
      v-if="design"
      :value="row.list"
      @input="onInput($event, row)"
      tag="div"
      :class="[$style.col]"
      :no-transition-on-drag="true"
      v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
    >
      <form-control v-for="item in row.list" :key="item.key" :def="item" :design="design"></form-control>
    </draggable>
    <template v-else>
      <form-control v-for="item in row.list" :key="item.key" :def="item" :design="design"></form-control>
    </template>
  </el-col>
</el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject, Watch } from 'vue-property-decorator'
import { FieldLatticeDefinition, FieldLatticeOptions, FieldLatticeColumn } from '@/components/type'
import draggable from 'vuedraggable'

@Component({
  components: {
    draggable,
    'form-control': () => import('@/components/form-instance/form-control/index.vue')
  }
})
export default class LatticeControl extends Vue {
  @Prop() def!: FieldLatticeDefinition

  @Inject() getDesign!: () => boolean

  get design () {
    return this.getDesign()
  }

  get designCls () {
    return this.design ? this.$style.design : ''
  }

  get options (): FieldLatticeOptions {
    return this.def.options
  }

  get columns (): FieldLatticeColumn[] {
    return this.def.columns
  }

  get grid () {
    return {
      col: this.options?.col || 1,
      row: this.options?.row || 1
    }
  }

  onInput (list: any, row: any) {
    row.list = list || []
  }

  @Watch('grid', { immediate: true }) gridChange () {
    const origins = this.columns || []
    const ret: any[] = []
    const total = this.grid.row * this.grid.col
    const span = Math.floor(24 / this.grid.col)
    for (let i = 0; i < total; i++) {
      const item = origins[i] || new FieldLatticeColumn()
      item.span = span
      ret.push(item)
    }
    this.def.columns = ret
  }

  $style!: any
}
</script>

<style lang="scss" module>
.col {
  position: relative;
  z-index: 100;
}

.design {
  margin: 4px;
  & .col {
    min-height: 50px;
    border: 1px dashed #ccc;
    background: #fff;
  }
}
</style>
