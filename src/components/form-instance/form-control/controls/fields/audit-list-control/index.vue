<template>
<el-form-item :hidden="options.hidden">
<div :class="[$style.container, fullScreenCls, previewVisibleCls]" ref="container">
  <div :class="[$style.content]" :style="[fullscreenContentRadioCls]">
    <div :class="[$style.header]">
      <span style="display: flex;">
        <span>{{def.name}}</span>
        <span v-if="fullscreen && previewVisible" style="min-width: 240px; margin-left: 24px;">
          <el-slider v-model="radio" :min="40" :max="80"></el-slider>
        </span>
      </span>
      <span>
        <span v-if="fullscreen">
          <span :class="[$style.fullscreenIcon]" title="显示右侧栏" @click="previewVisible = true" v-if="!previewVisible"><i class="el-icon-back"></i></span>
          <span :class="[$style.fullscreenIcon]" title="隐藏右侧栏" @click="previewVisible = false" v-else><i class="el-icon-right"></i></span>
        </span>
        <span :class="[$style.fullscreenIcon]" title="全屏" @click="onFullScreen" v-if="!fullscreen"><i class="el-icon-full-screen"></i></span>
        <span :class="[$style.fullscreenIcon]" title="退出全屏" @click="onFullScreen" v-else><i class="el-icon-bottom-left"></i></span>
      </span>
    </div>

    <div :class="[$style.group, expandCls]">
      <ul :class="[$style.list]" ref="list">
        <li v-for="(item, i) in value" :key="i" :class="[$style.item, markCls(item), activeCls(i)]" :title="item.name" @click="active = i">
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
        <div :class="[$style.iconBtn]" title="展开/收起" @click="onToggleExpand">
          <span><i class="el-icon-s-grid"></i></span>
        </div>
      </div>
    </div>

    <transition name="form-editor-slide">
    <div :class="[$style.body]" v-if="!loading">
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
    </transition>

    <div :class="[$style.footer]" v-if="activeItem">
      <template v-if="!disabled">
        <el-button type="primary" size="small" @click="onMark(true)">标记无误</el-button>
        <el-button type="danger" size="small" @click="onMark(false)">标记有误</el-button>
      </template>
      <template v-else>
        <el-button type="priamry" size="small" style="visibility: hidden;"></el-button>
      </template>

      <div :class="[$style.pagination]">
        <el-button-group>
          <el-button plain size="small" @click="onSwitchPage(-1)" :disabled="active <= 0">上一页</el-button>
          <el-button plain size="small" @click="onSwitchPage(1)" :disabled="active >= (value || []).length - 1">下一页</el-button>
        </el-button-group>
      </div>
    </div>
  </div>
  <div :class="[$style.preview]" :style="[fullscreenPreviewRadioCls]" v-if="fullscreen && previewVisible">
    <file-preview :list="files" ref="filePreview"></file-preview>
  </div>
</div>
</el-form-item>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject, Watch, Provide } from 'vue-property-decorator'
import { FieldAuditListDefinition, FieldAuditListOptions } from '@/components/type'
import FilePreview from '@/components/common/file-preview/index.vue'
import draggable from 'vuedraggable'

@Component({
  components: {
    FilePreview,
    draggable,
    'form-control': () => import('@/components/form-instance/form-control/index.vue')
  }
})
export default class AuditListControl extends Vue {
  @Prop() def!: FieldAuditListDefinition

  @Inject() getDesign!: () => boolean

  @Inject() getFormData!: () => Record<string, any>

  @Inject() getRowFormData!: () => Record<string, any>

  @Inject() getEdit!: () => boolean

  fileControls: any = []

  active = 0

  expand = false

  fullscreen = false

  previewVisible = true

  loading = false

  radio = 70

  get design () {
    return this.getDesign()
  }

  get designCls () {
    return this.design ? this.$style.design : ''
  }

  get options (): FieldAuditListOptions {
    return this.def.options
  }

  get edit () {
    return this.getEdit()
  }

  get disabled () {
    if (!this.edit) return true
    return this.options.disabled
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

  get files () {
    const ret: any[] = []
    this.fileControls.forEach((v: any) => {
      ret.push(...v.files)
    })
    return ret
  }

  get fullscreenContentRadioCls () {
    if (!this.fullscreen || !this.previewVisible) return {}
    return { maxWidth: this.radio + '%' }
  }

  get fullscreenPreviewRadioCls () {
    if (!this.fullscreen || !this.previewVisible) return {}
    return { width: (100 - this.radio) + '%' }
  }

  @Provide() addFileControl (c: any) {
    this.fileControls.push(c)
  }

  @Provide() removeFileControl (c: any) {
    const idx = this.fileControls.findIndex((v: any) => v === c)
    if (idx >= 0) this.fileControls.splice(idx, 1)
  }

  @Provide() onAuditFilePreview (file: any) {
    if (!this.fullscreen) return false
    const $e = this.$refs.filePreview as any
    if ($e) $e.select(file && file.url)
    return true
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

  get fullScreenCls () {
    return this.fullscreen ? this.$style.fullscreen : ''
  }

  get previewVisibleCls () {
    return this.previewVisible ? this.$style.previewExpand : ''
  }

  onInput (list: any, row: any) {
    row.list = list || []
  }

  onMark (mark: boolean) {
    if (this.activeItem) {
      Vue.set(this.activeItem, 'mark', mark)
      this.onSwitchPage(1)
    }
  }

  onSwitchPage (offset: number) {
    const min = 0
    const max = Math.max((this.value || []).length - 1, 0)
    const ret = offset + this.active
    this.active = ret > max ? max : (ret < min ? min : ret)
  }

  onFullScreen () {
    if (this.$refs.container) {
      if (!(document as any).webkitIsFullScreen) {
        (this.$refs.container as any).webkitRequestFullscreen()
      } else {
        (document as any).webkitCancelFullScreen()
      }
    }
  }

  onScroll (num: number) {
    if (this.expand) return
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

  onToggleExpand () {
    this.expand = !this.expand
    const target = this.$refs.list as any
    if (target) target.style.marginTop = '0px'
  }

  mounted () {
    const hanlder = () => {
      if (!(document as any).webkitIsFullScreen) this.fullscreen = false
      else {
        this.fullscreen = true
        this.previewVisible = true
      }
    }
    window.addEventListener('resize', hanlder)
    this.$once('hook:beforeDestroy', function () {
      window.removeEventListener('resize', hanlder)
    })
  }

  @Watch('active') activeChange () {
    this.loading = true
    this.$nextTick(() => {
      this.loading = false
      this.$nextTick(() => {
        const c = this.$refs.container as any
        if (c) c.scrollTop = 0
      })
    })
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

.container {
  display: flex;
  max-width: 100%;
  min-width: 0;

  &.fullscreen {
    .content {
      max-width: 100%;
      overflow-y: auto;
      position: relative;

      .header {
        position: sticky;
        top: 0;
        background-color: #f3f3f3;
        z-index: 10;
      }

      .group {
        position: sticky;
        top: 42px;
        background-color: #f3f3f3;
        z-index: 10;
      }

      .footer {
        position: sticky;
        bottom: 0;
        background-color: #f3f3f3;
        z-index: 10;
      }
    }
    .preview {
      background-color: #fff;
      width: 0%;
      min-width: 0;
      flex: 0 0 auto;
      resize: horizontal;
    }

    &.previewExpand {
      .content {
        max-width: 70%;
      }
      .preview {
        width: 30%;
      }
    }
  }
}

.content {
  background-color: #F3F3F3;
  border-radius: 2px;
  border: 1px solid #EAEAEA;
  height: 100%;
  flex: 1 1 auto;
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

.fullscreenIcon {
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
  min-width: 160px;
  max-width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1 2 120px;

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
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
<style lang="scss">
.form-editor-slide-enter-active {
  transition: all .75s ease;
}
.form-editor-slide-leave-active {
  transition: all .2s ease-out;
}
.form-editor-slide-enter {
  transform: translateX(-60px);
  opacity: 0;
}

.form-editor-slide-leave-to {
  transform: translateX(60px);
  opacity: 0;
}
</style>
