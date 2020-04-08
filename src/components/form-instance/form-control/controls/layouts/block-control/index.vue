<template>
<div :class="[designCls]" :hidden="options.hidden">
  <div :class="[$style.header]">{{def.name}}</div>
  <div :class="[$style.body]">
    <draggable
      v-if="design"
      :value="def.list"
      @input="onInput($event, def)"
      tag="div"
      :class="[$style.col]"
      :no-transition-on-drag="true"
      v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
    >
      <form-control v-for="item in def.list" :key="item.key" :def="item" :design="design"></form-control>
    </draggable>
    <template v-else>
      <form-control v-for="item in def.list" :key="item.key" :def="item" :design="design"></form-control>
    </template>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject } from 'vue-property-decorator'
import { BlockDefinition, BlockOptions } from '@/components/type'
import draggable from 'vuedraggable'

@Component({
  components: {
    draggable,
    'form-control': () => import('@/components/form-instance/form-control/index.vue')
  }
})
export default class GridControl extends Vue {
  @Prop() def!: BlockDefinition

  @Inject() getDesign!: () => boolean

  get design () {
    return this.getDesign()
  }

  get designCls () {
    return this.design ? this.$style.design : ''
  }

  get options (): BlockOptions {
    return this.def.options
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

.header {
  font-weight: 600;
  font-size: 14px;
  color: #666;
  position: relative;
  padding-left: 8px;

  &::before {
    content: " ";
    position: absolute;
    height: calc(100% - 6px);
    top: 3px;
    width: 4px;
    background-color: #666;
    left: 0;
  }
}

.body {
  padding: 16px 12px;
}
</style>
