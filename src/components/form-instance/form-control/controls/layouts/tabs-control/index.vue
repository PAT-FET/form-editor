<template>
<el-tabs v-model="value" :class="[designCls]" :type="options.type" :tab-position="options.tabPosition" :hidden="options.hidden">
  <el-tab-pane :label="row.label" :name="i" v-for="(row, i) in tabs" :key="i">
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

  value = 0

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
    return this.def.tabs
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
