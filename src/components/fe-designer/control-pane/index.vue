<template>
<div>
  <div :class="$style.title">控件列表</div>
  <draggable
    :class="$style.list"
    tag="ul" :list="rows"
    v-bind="{group:{ name:'people', pull:'clone', put:false },sort: false, ghostClass: 'ghost'}"
    :clone="cloneFn">
    <li :class="$style.item" v-for="row in rows" :key="row.key" @click="onAdd(row)">
      <i class="iconfont" :class="['icon-' + row.type, $style.icon]"></i>
      <span>{{row.name}}</span>
    </li>
  </draggable>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, InjectReactive, Inject } from 'vue-property-decorator'
import { getControls } from './config'
import { FormDefinition, ControlDefinition } from '@/components/type'
import { cloneControlDef, findList } from '@/components/utils'
import draggable from 'vuedraggable'
import '@/components/iconfont/iconfont.css'

@Component({
  components: { draggable }
})
export default class ControlPane extends Vue {
  @Prop() def!: FormDefinition

  @Inject() addControl!: (control: ControlDefinition) => void

  @Inject() setActiveControl!: (control: ControlDefinition) => void

  rows = getControls()

  onAdd (row: ControlDefinition) {
    this.addControl(row)
  }

  cloneFn (clone: any) {
    const ret = cloneControlDef(clone)
    this.$nextTick(() => {
      const ls = findList(this.def.list, ret)
      if (ls) this.setActiveControl(ret)
    })
    return ret
  }
}
</script>

<style lang="scss" module>
.title {
  font-size: 13px;
  padding: 8px 12px;
}

.list {
  margin: 0;
  padding: 0 10px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}

.item {
  box-sizing: border-box;
  width: calc(50% - 4px);
  line-height: 26px;
  background-color: #f4f6fc;;
  border: 1px solid #f4f6fc;
  margin: 4px 2px;
  font-size: 12px;
  color: #333;
  text-align: left;

  &:hover {
    cursor: pointer;
    border: dashed 1px #409eff;
    color: #409eff;
  }
}

.icon {
  margin-right: 6px;
  margin-left: 8px;
  font-size: 14px;
}
</style>
