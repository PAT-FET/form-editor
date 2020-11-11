<template>
<div>
  <div v-for="(row, i) in rows" :key="i">
    <div :class="$style.title">{{row.title}}</div>
    <draggable
      :class="$style.list"
      tag="ul" :list="row.list"
      v-bind="{group:{ name:'people', pull:'clone', put:false },sort: false, ghostClass: 'ghost'}"
      :move="moveFn" :clone="cloneFn">
      <li :class="[$style.item]" :type="item.type" v-for="item in row.list" :key="item.key" @click="onAdd(item)">
        <i class="iconfont" :class="['icon-' + item.type, $style.icon]"></i>
        <span>{{item.name}}</span>
      </li>
    </draggable>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, InjectReactive, Inject } from 'vue-property-decorator'
import { basicControls, dataControls, layoutControls, otherControls } from './config'
import { FormDefinition, ControlDefinition } from '@/components/type'
import { cloneControlDef, findList, isTableType } from '@/components/utils'
import draggable from 'vuedraggable'
import '@/components/iconfont/iconfont.css'

@Component({
  components: { draggable }
})
export default class ControlPane extends Vue {
  @Prop() def!: FormDefinition

  @Inject() addControl!: (control: ControlDefinition) => void

  @Inject() setActiveControl!: (control: ControlDefinition) => void

  @Inject() cloneControl!: (control: ControlDefinition) => ControlDefinition

  get rows () {
    const ret = []
    ret.push({ title: '布局元件', list: layoutControls })
    ret.push({ title: '数据元件', list: dataControls })
    ret.push({ title: '基本元件', list: basicControls })
    ret.push({ title: '其他元件', list: otherControls })
    return ret
  }

  onAdd (row: ControlDefinition) {
    this.addControl(row)
  }

  cloneFn (clone: any) {
    const ret = this.cloneControl(clone)
    return ret
  }

  moveFn (e: any) {
    const to = e.to as HTMLElement
    const form = e.dragged as HTMLElement
    const formType = (form && form.getAttribute('type')) as string
    if (to && to.classList.contains('fe-table-drop-zone') && !isTableType(formType)) return false
    return true
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
  padding: 0 10px 10px 10px;
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
