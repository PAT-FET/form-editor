<template>
<div>
<div :class="[designCls]" :hidden="options.hidden" v-if="design">
  <el-table border :data="dataSource" :class="[$style.fixTable]">
    <el-table-column type="index" width="50" fixed="left" label="#"></el-table-column>
  </el-table>
  <draggable
      :value="def.tableColumns"
      @input="onInput($event, def)"
      tag="div"
      :class="[$style.col]"
      :no-transition-on-drag="true"
      v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
    >
    <form-control v-for="item in def.tableColumns" :key="item.key" :def="item" :design="design"></form-control>
  </draggable>
</div>
<div v-else>
  <el-table border :data="value">
    <el-table-column type="index" width="50" fixed="left" label="#"></el-table-column>
    <el-table-column v-for="col in def.tableColumns" :key="col.key" :label="col.name" :prop="col.key">
      <template slot-scope="{row}">
        <form-control :row-form-data="row" :def="col" :design="design"></form-control>
      </template>
    </el-table-column>
  </el-table>
  <el-button type="text" @click="onAddRow">添加行</el-button>
</div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject, Provide } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import FieldMixins from '../FieldMixins'
import { FieldTableDefinition, FieldTableOptions, TableColumn } from '@/components/type'
import draggable from 'vuedraggable'
// import { cloneControlDef } from '@/components/utils'

@Component({
  components: {
    draggable,
    'form-control': () => import('@/components/form-instance/form-control/index.vue')
  }
})
export default class TableControl extends mixins(FieldMixins) {
  row: any = {}

  get designCls () {
    return this.design ? this.$style.design : ''
  }

  get dataSource () {
    if (this.design) return [this.row]
    return this.value
  }

  @Provide() getTable (): any {
    return this
  }

  onInput (list: any, row: any) {
    row.tableColumns = list || []
  }

  onAddRow () {
    this.value.push({})
  }

  $style!: any
}
</script>

<style lang="scss" module>
.fixTable {
  width: 51px;
  flex: 0 0 auto;
}

.col {
  position: relative;
  z-index: 100;
  max-width: calc(100% - 54px);
  width: 0;
  flex: 1 0 auto;
  display: flex;
  overflow: auto;

  :global {
    .ghost{
      background-color: #F56C6C !important;
      border: 2px solid #F56C6C !important;
      outline-width: 0 !important;
      height: 100% !important;
      width: 3px !important;
      box-sizing: border-box;
      font-size: 0;
      content: '';
      overflow: hidden;
      padding: 0;
    }
  }
}

.design {
  margin: 4px;
  display: flex;
  & .col {
    min-height: 50px;
    border: 1px dashed #ccc;
    background: #fff;
  }
}
</style>
