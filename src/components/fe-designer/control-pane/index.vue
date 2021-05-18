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
        <div>
          <!-- <i class="iconfont" :class="['icon' + item.type, $style.icon]"></i> -->
          <i :class="[$style.icon]">
            <svg class="fe-icon" aria-hidden="true">
              <use :xlink:href="'#icon' + item.type"></use>
            </svg>
          </i>
        </div>
        <div>{{item.name}}</div>
      </li>
    </draggable>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, InjectReactive, Inject } from 'vue-property-decorator'
import { basicControls, dataControls, layoutControls, otherControls, infoControls } from './config'
import { FormDefinition, ControlDefinition } from '@/components/type'
import { cloneControlDef, findList, isTableType } from '@/components/utils'
import draggable from 'vuedraggable'
import '@/components/iconfont/iconfont'
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
    ret.push({ title: '信息元件', list: infoControls })
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
  height: 76px;
  background-color: #eeeeee;
  border-radius: 4px;
  margin: 4px 2px;
  font-size: 12px;
  color: #666;
  text-align: center;

  &:hover {
    cursor: pointer;
    // border: dashed 1px #409eff;
    color: #359C67;
    background-color: #fafafa;
  }
}

.icon {
  font-size: 36px;
}
</style>

<style lang="scss">
.fe-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
