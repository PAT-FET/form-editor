<template>
<el-form-item label="" :prop="def.model" :hidden="options.hidden">
  <el-table :data="dataSource" border :row-class-name="rowClassNameFn" style="width: 100%" size="mini">
    <el-table-column prop="__label" :label="def.name"></el-table-column>
    <el-table-column :prop="col.name" :label="col.label" v-for="col in cols" :key="col.name">
      <template v-slot="{row}">
        <audit-mark v-model="row[col.name].value">
          <el-link type="danger" :underline="false" style="margin-right: 6px;" v-if="showDiffMark(row, col)"><i class="el-icon-warning"></i></el-link>
          <span>{{resolveNewValue(col, row)}}</span>
        </audit-mark>
      </template>
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

  get normalized () {
    if (!Array.isArray(this.value)) return false
    return this.cols.every(v => {
      const col = this.value.find((w: any) => w?.name === v.name)
      if (!col || !Array.isArray(col.data)) return false
      return this.rows.every(w => {
        const row = col.data.find((z: any) => z?.name === w.name)
        if (!row) return false
        return true
      })
    })
  }

  get dataMap () {
    const list: any[] = this.value || []
    const map: Record<string, Record<string, any>> = {}
    list.forEach(v => {
      const subMap: Record<string, any> = {}
      const data = v.data || []
      data.forEach((w: any) => {
        subMap[w.name] = w
      })
      map[v.name] = subMap
    })
    return map
  }

  get dataSource () {
    if (!this.normalized) return []
    return this.rows.map(v => {
      const row: any = { __label: v.label }
      const statMap: any = {}
      const rest = this.cols.forEach((w: any) => {
        const value = this.dataMap[w.name] && this.dataMap[w.name][v.name]
        row[w.name] = value
        const newValue = value?.value?.value
        if (newValue !== undefined) statMap[newValue || '-'] = (statMap[newValue || '-'] || 0) + 1
      })
      const markedKeys = []
      if (Object.keys(statMap).length > 1) {
        const ret = Object.entries(statMap).sort((a: any, b: any) => b[1] - a[1]).map(v => v[0]).slice(1)
        markedKeys.push(...ret)
      }
      row.__meta = {
        diffs: statMap,
        diff: Object.keys(statMap).length > 1,
        markedKeys
      }
      return row
    })
  }

  rowClassNameFn ({ row, rowIndex }: any) {
    return row.__meta?.diff ? this.$style.highlightRow : ''
  }

  resolveNewValue (col: any, row: any) {
    let ret = row[col.name] && row[col.name].value
    ret = ret?.value
    return ret === undefined ? undefined : (ret || '-')
  }

  showDiffMark (row: any, col: any) {
    return row.__meta.markedKeys.includes(this.resolveNewValue(col, row))
  }

  normalizeValue () {
    if (this.normalized) return
    const origin = this.value
    const ret = this.cols.map(v => {
      const data = this.rows.map(w => {
        const row = this.dataMap[v.name] && this.dataMap[v.name][w.name]
        return row || { name: w.name, value: null }
      })
      return { name: v.name, data }
    })
    this.value = ret
  }

  @Watch('normalized', { immediate: true }) normalizedChange () {
    this.normalizeValue()
  }

  def!: FieldAuditDiffDefinition

  $style!: any
}
</script>

<style lang="scss" module>
.highlightRow {
  background-color: #FFF7F7 !important;
}
</style>
