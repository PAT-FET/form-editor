<template>
<el-form-item :hidden="options.hidden">
<div :class="[$style.content]" ref="content">
  <div :class="[$style.header]">
    <span>{{def.name}}</span>
    <span :class="[$style.fullscreen]" title="全屏" @click="onFullScreen"><i class="el-icon-full-screen"></i></span>
  </div>

  <div :class="[$style.group, expandCls]">
    <ul :class="[$style.list]" ref="list">
      <li v-for="(item, i) in value" :key="i" :class="[$style.item, markCls(item), activeCls(i)]" @click="active = i">
        <span :class="[$style.markIcon]">
          <i class="el-icon-error" v-if="item && item.mark === false"></i>
          <i class="el-icon-success" v-else-if="item && item.mark === true"></i>
          <i class="el-icon-warning" v-else></i>
        </span>
        <span>{{item.name}}</span>
      </li>
    </ul>
    <div :class="[$style.action]">
      <div :class="[$style.arrowGroup]">
        <div :class="[$style.iconBtn]" @click="onScroll(1)"><span><i class="el-icon-arrow-up"></i></span></div>
        <div :class="[$style.arrowGroupDivider]"></div>
        <div :class="[$style.iconBtn]" @click="onScroll(-1)"><span><i class="el-icon-arrow-down"></i></span></div>
      </div>
      <div :class="[$style.iconBtn]" title="展开/收起" @click="expand = !expand">
        <span><i class="el-icon-s-grid"></i></span>
      </div>
    </div>
  </div>

  <div :class="[$style.body]">
    <div :class="[designCls]">
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
        <template v-if="row">
          <form-control :row-form-data="row" v-for="item in def.list" :key="item.key" :def="item" :design="design"></form-control>
        </template>
      </template>
    </div>
  </div>

  <div :class="[$style.footer]" v-if="activeItem">
    <el-button type="priamry" size="small" @click="onMark(true)">标记无误</el-button>
    <el-button type="danger" size="small" @click="onMark(false)">标记有误</el-button>

    <div :class="[$style.pagination]">
      <el-button-group>
        <el-button plain size="small" @click="onSwitchPage(-1)" :disabled="active <= 0">上一页</el-button>
        <el-button plain size="small" @click="onSwitchPage(1)" :disabled="active >= (value || []).length - 1">下一页</el-button>
      </el-button-group>
    </div>
  </div>
</div>
</el-form-item>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject } from 'vue-property-decorator'
import { FieldAuditListDefinition, FieldAuditListOptions } from '@/components/type'
import draggable from 'vuedraggable'

@Component({
  components: {
    draggable,
    'form-control': () => import('@/components/form-instance/form-control/index.vue')
  }
})
export default class AuditListControl extends Vue {
  @Prop() def!: FieldAuditListDefinition

  @Inject() getDesign!: () => boolean

  @Inject() getFormData!: () => Record<string, any>

  @Inject() getRowFormData!: () => Record<string, any>

  active = 0

  expand = false

  get design () {
    return this.getDesign()
  }

  get designCls () {
    return this.design ? this.$style.design : ''
  }

  get options (): FieldAuditListOptions {
    return this.def.options
  }

  // get tabs (): Tab[] {
  //   if (this.design) return this.dynamic ? this.def.tabs.slice(0, 1) : this.def.tabs
  //   else {
  //     if (!this.dynamic) return this.def.tabs
  //     const tpl = this.def.tabs[0]
  //     if (!tpl) return []
  //     const data = (this.formData && this.formData[this.model]) || []
  //     const tabs = data.map((v: any) => {
  //       const item: any = JSON.parse(JSON.stringify(tpl))
  //       item.label = getParser(item.label)(v)
  //       return item
  //     })
  //     return tabs
  //   }

  //   function getParser (expr: string) {
  //     const body = 'return ' + '`' + expr + '`'
  //     // eslint-disable-next-line no-new-func
  //     return new Function('ctx', body)
  //   }
  // }

  get model () {
    return this.def.model
  }

  get formData () {
    return this.getRowFormData() || this.getFormData()
  }

  get value () {
    return (this.formData && this.formData[this.model]) || []
  }

  get activeItem () {
    return this.value[this.active] || null
  }

  get row () {
    return (this.value[this.active] || {})?.value || {}
  }

  markCls (item: any) {
    if (item?.mark === true) return this.$style.markRight
    else if (item?.mark === false) return this.$style.markError
    else return this.$style.markNone
  }

  activeCls (i: number) {
    return i === this.active ? this.$style.active : ''
  }

  get expandCls () {
    return this.expand ? this.$style.expand : ''
  }

  onInput (list: any, row: any) {
    row.list = list || []
  }

  onMark (mark: boolean) {
    if (this.activeItem) this.activeItem.mark = mark
  }

  onSwitchPage (offset: number) {
    const min = 0
    const max = Math.max((this.value || []).length - 1, 0)
    const ret = offset + this.active
    this.active = ret > max ? max : (ret < min ? min : ret)
  }

  onFullScreen () {
    if (this.$refs.content) {
      if (!(document as any).webkitIsFullScreen) {
        (this.$refs.content as any).webkitRequestFullscreen()
      } else {
        (document as any).webkitCancelFullScreen()
      }
    }
  }

  onScroll (num: number) {
    const target = this.$refs.list as any
    if (!target) return
    const unit = 40
    const fixedHeight = 80
    const height = target.scrollHeight
    const top = Number((target.style.marginTop || '').replace('px', ''))
    const offset = top + num * unit
    if (offset > 0 || Math.abs(offset) > height - fixedHeight) return
    target.style.marginTop = offset + 'px'
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

.content {
  background-color: #F3F3F3;
  border-radius: 2px;
  border: 1px solid #EAEAEA;
}

.header {
  height: 42px;
  line-height: 42px;
  font-size: 16px;
  color: #333;
  font-weight: 600;
  position: relative;
  padding-left: 12px;
  display: flex;
  justify-content: space-between;

  &::after {
    content: " ";
    position: absolute;
    width: 4px;
    height: 16px;
    background-color: #359C67;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}

.fullscreen {
  font-size: 24px;
  margin-right: 8px;

  &:hover {
    cursor: pointer;
  }
}

.group {
  display: flex;
  height: 80px;
  overflow: hidden;

  &.expand {
    height: auto;
  }
}

.action {
  flex: 0 0 auto;
  width: 24px;
  margin-left: 4px;
  color: #999;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.arrowGroup {
  border-radius: 2px;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
  background-color: #fff;

}

.iconBtn {
  height: 24px;
  line-height: 24px;
  text-align: center;
  background-color: #fff;
  &:hover {
    cursor: pointer;
    color: #359C67;
    background-color: #F2FAF5;
  }
}

.arrowGroupDivider {
  height: 1px;
  margin: 0 4px;
  background-color: #EAEAEA;
}

.list {
  flex: 1 1 auto;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin-top: 0;
}

.item {
  height: 38px;
  line-height: 38px;
  background: #FFFFFF;
  border-radius: 2px;
  border: 1px solid #EAEAEA;
  padding: 0 14px 0 6px;
  flex: 1 0 120px;

  &.active {
    color: #fff;
    background-color: #359C67;
  }

  &:hover {
    cursor: pointer;
  }
}

.markRight {
  color: #359C67;
}

.markError {
  color: #FF4F4F;
}

.markNone {
  &>.markIcon {
    color: #C5C5C5;
  }
  &.active>.markIcon {
    color: #fff;
  }
}

.markIcon {
  margin-right: 4px;
}

.body {
  padding: 20px;
}

.footer {
  text-align: center;
  position: relative;

  padding: 12px 0;
}

.pagination {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>