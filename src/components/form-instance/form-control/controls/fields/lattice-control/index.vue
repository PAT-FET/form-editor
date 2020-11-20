<template>
<div>
<div :class="[$style.header]">{{def.name}}</div>

<table :class="[designCls, $style.table]">
  <tbody>
    <tr v-for="(rows, i) in columns" :key="i">
      <td v-for="(row, j) in rows" :key="j" :class="[$style.cell]">
        <draggable
          v-if="design"
          :value="row.list"
          @input="onInput($event, row)"
          tag="div"
          :class="[$style.col]"
          :no-transition-on-drag="true"
          v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
        >
          <form-control :row-form-data="value" :prop="model" v-for="item in row.list" :key="item.key" :def="item" :design="design"></form-control>
        </draggable>
        <template v-else>
          <form-control :row-form-data="value" :prop="model" v-for="item in row.list" :key="item.key" :def="item" :design="design"></form-control>
        </template>
      </td>
    </tr>
  </tbody>
</table>
<!--
<el-row :class="[designCls]" :gutter="options.gutter" :justify="options.justify" :align="options.align" :hidden="options.hidden">
  <el-col v-for="(row, i) in columns" :key="i" :span="row.span" :class="[borderCls]">
    <draggable
      v-if="design"
      :value="row.list"
      @input="onInput($event, row)"
      tag="div"
      :class="[$style.col]"
      :no-transition-on-drag="true"
      v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
    >
      <form-control :row-form-data="value" :prop="model" v-for="item in row.list" :key="item.key" :def="item" :design="design"></form-control>
    </draggable>
    <template v-else>
      <form-control :row-form-data="value" :prop="model" v-for="item in row.list" :key="item.key" :def="item" :design="design"></form-control>
    </template>
  </el-col>
</el-row> -->
</div>
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

  @Inject() getFormData!: () => Record<string, any>

  @Inject() getRowFormData!: () => Record<string, any>

  @Inject() getDesign!: () => boolean

  get design () {
    return this.getDesign()
  }

  get designCls () {
    return this.design ? this.$style.design : ''
  }

  get borderCls () {
    return this.options?.border ? this.$style?.border : ''
  }

  get options (): FieldLatticeOptions {
    return this.def.options
  }

  get columns (): FieldLatticeColumn[][] {
    return this.def.columns
  }

  get grid () {
    return {
      col: this.options?.col || 1,
      row: this.options?.row || 1
    }
  }

  get model () {
    return this.def.model
  }

  get formData () {
    return this.getRowFormData() || this.getFormData()
  }

  get value () {
    return (this.formData && this.formData[this.model]) || []
  }

  onInput (list: any, row: any) {
    row.list = list || []
  }

  // @Watch('grid', { immediate: true }) gridChange () {
  //   const origins = this.columns || []
  //   const ret: any[] = []
  //   const total = this.grid.row * this.grid.col
  //   const span = Math.floor(24 / this.grid.col)
  //   for (let i = 0; i < total; i++) {
  //     const item = origins[i] || new FieldLatticeColumn()
  //     item.span = span
  //     ret.push(item)
  //   }
  //   this.def.columns = ret
  // }

  @Watch('grid', { immediate: true }) gridChange () {
    const vm = this as any
    const ret: any[] = []
    const { row, col } = this.grid
    for (let i = 1; i <= row; i++) {
      const rows: any[] = []
      for (let j = 1; j <= col; j++) {
        rows.push(genItem(i, j))
      }
      ret.push(rows)
    }
    this.def.columns = ret

    function genItem (i: number, j: number) {
      const origins = flat(vm.columns as any[][])
      let ret = origins.find(v => v.row === i && v.col === j)
      if (!ret) {
        ret = new FieldLatticeColumn()
        ret.row = i
        ret.col = j
      }
      return ret

      function flat (ls: any[][]) {
        const ret: any[] = []
        ls.forEach(v => {
          (v || []).forEach(w => {
            ret.push(w)
          })
        })
        return ret
      }
    }
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

.header {
  font-weight: 600;
  font-size: 14px;
  color: #666;
  position: relative;
  padding-left: 12px;
  background-color: #fff;
  margin-bottom: 8px;

  &::before {
    content: " ";
    position: absolute;
    height: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    background-color: #359C67;
    left: 0;
  }
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.cell {
  border: 1px solid rgba(53, 156, 103, 0.4);
  padding: 4px 8px;
}
</style>
