<template>
<el-tabs v-model="value" :class="[designCls]" :type="options.type" :tab-position="options.tabPosition" :hidden="options.hidden">
  <el-tab-pane lazy :label="row.label" :name="i + ''" v-for="(row, i) in tabs" :key="i">
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
      <form-control :row-form-data="getRow(i)" v-for="item in row.list" :key="item.key" :def="item" :design="design"></form-control>
    </template>
  </el-tab-pane>
</el-tabs>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject } from 'vue-property-decorator'
import { TabsDefinition, TabsOptions, Tab } from '@/components/type'
import draggable from 'vuedraggable'

@Component({
  components: {
    draggable,
    'form-control': () => import('@/components/form-instance/form-control/index.vue')
  }
})
export default class TabsControl extends Vue {
  @Prop() def!: TabsDefinition

  @Inject() getDesign!: () => boolean

  @Inject() getFormData!: () => Record<string, any>

  @Inject() getRowFormData!: () => Record<string, any>

  value = '0'

  get design () {
    return this.getDesign()
  }

  get designCls () {
    return this.design ? this.$style.design : ''
  }

  get options (): TabsOptions {
    return this.def.options
  }

  get tabs (): Tab[] {
    if (this.design) return this.dynamic ? this.def.tabs.slice(0, 1) : this.def.tabs
    else {
      if (!this.dynamic) return this.def.tabs
      const tpl = this.def.tabs[0]
      if (!tpl) return []
      const data = (this.formData && this.formData[this.model]) || []
      const tabs = data.map((v: any) => {
        const item: any = JSON.parse(JSON.stringify(tpl))
        item.label = getParser(item.label)(v)
        return item
      })
      return tabs
    }

    function getParser (expr: string) {
      const body = 'return ' + '`' + expr + '`'
      // eslint-disable-next-line no-new-func
      return new Function('ctx', body)
    }
  }

  get dynamic () {
    return this.options.dynamic
  }

  get model () {
    return this.def.model
  }

  get formData () {
    return this.getRowFormData() || this.getFormData()
  }

  getRow (i: number) {
    if (!this.dynamic) return undefined
    return ((this.formData && this.formData[this.model]) || [])[i] || {}
  }

  onInput (list: any, row: any) {
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
