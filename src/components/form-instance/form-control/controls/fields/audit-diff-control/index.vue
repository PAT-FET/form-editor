<template>
<el-form-item label="" :prop="def.model" :hidden="options.hidden">
  <el-table :data="dataSource" border stripe style="width: 100%" size="mini">
    <el-table-column prop="__label" :label="def.name"></el-table-column>
    <el-table-column :prop="col.name" :label="col.label" v-for="col in cols" :key="col.name">
      <template v-slot="{row}"> <audit-mark v-model="row.value">{{row[col.name] && row[col.name].value}}</audit-mark> </template>
    </el-table-column>
  </el-table>
</el-form-item>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, InjectReactive } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import FieldMixins from '../FieldMixins'
import { FieldAuditDiffDefinition, FieldAuditDiffOptions } from '@/components/type'
import AuditMark from '@/components/common/audit-mark/index.vue'

@Component({
  components: { AuditMark }
})
export default class AuditDiffControl extends mixins(FieldMixins) {
  get cols () {
    return this.def.cols || []
  }

  get rows () {
    return this.def.rows || []
  }

  get dataMap () {
    const list: any[] = this.value || []
    const map: Record<string, Record<string, any>> = {}
    list.forEach(v => {
      const subMap: Record<string, any> = {}
      const data = v.data || []
      data.forEach((w: any) => {
        subMap[w.name] = w.value
      })
      map[v.name] = subMap
    })
    return map
  }

  get dataSource () {
    return this.rows.map(v => {
      const row: any = { __label: v.label }
      const rest = this.cols.forEach((w: any) => {
        row[w.name] = this.dataMap[w.name] && this.dataMap[w.name][v.name]
      })
      return row
    })
  }

  def!: FieldAuditDiffDefinition
}
</script>
