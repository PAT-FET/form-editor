<template>
<el-row :class="[designCls]" :gutter="options.gutter" :hidden="options.hidden">
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
import { Component, Prop, Vue, Inject } from 'vue-property-decorator'
import { GridDefinition, GridOptions, GridColumn } from '@/components/type'
import draggable from 'vuedraggable'

@Component({
  components: {
    draggable,
    'form-control': () => import('@/components/form-instance/form-control/index.vue')
  }
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

  onInput (list: any, row: any) {
    console.log(list, row)
    row.list = list || []
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
