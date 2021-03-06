<template>
<div :class="[$style.content]" v-if="!loading">
  <div :class="[$style.text]">
    <el-link :underline="false" :type="type"><slot>{{newValue || '-'}}</slot></el-link>
  </div>
  <div :class="[$style.suffix]">
    <span style="position: relative;">
      <span :class="[$style.mark, floatCls]" v-if="changed">
        <el-tooltip effect="dark" placement="top" :append-to-body="!fullscreen" v-tooltip-append-to v-if="changed">
          <template v-slot:content="">
            <span style="white-space: nowrap;">{{changeTip}}</span>
          </template>
          <span style="white-space: nowrap;">已变更</span>
        </el-tooltip>
      </span>
    </span>
    <span v-if="markable">
      <el-popover placement="top" width="400" v-model="visible" :append-to-body="!fullscreen" title="审批标记" :disabled="disabled">
        <div>
          <el-radio-group v-model="form.mark">
            <el-radio label="0">有误</el-radio>
            <el-radio label="1">无误</el-radio>
            <!-- <el-radio label="2">取消标记</el-radio> -->
          </el-radio-group>
          <el-input v-model="form.remark" style="margin-top: 12px;" type="textarea" :rows="2" placeholder="请输入批注"></el-input>
          <div style="margin-top: 12px; text-align: right;">
            <el-button size="mini" @click="onCancel">取 消</el-button>
            <el-button type="primary" size="mini" @click="onSave">确 认</el-button>
          </div>
        </div>
        <span slot="reference" @click="onEdit">
          <el-tooltip effect="dark" content="无误" placement="top" :append-to-body="!fullscreen" v-tooltip-append-to v-if="mark === '1'">
            <el-link :underline="false" type="primary" :class="[$style.icon]"><i class="el-icon-circle-check"></i></el-link>
          </el-tooltip>
          <el-tooltip effect="dark" content="有误" placement="top" :append-to-body="!fullscreen" v-tooltip-append-to v-if="mark === '0'">
            <el-link :underline="false" type="danger" :class="[$style.icon]"><i class="el-icon-circle-close"></i></el-link>
          </el-tooltip>
          <el-tooltip effect="dark" content="批注" placement="top" :append-to-body="!fullscreen" v-tooltip-append-to v-if="mark === '2'">
            <el-link :underline="false" type="info" :class="[$style.icon]"><i class="el-icon-discover"></i></el-link>
          </el-tooltip>
        </span>
      </el-popover>
    </span>
    <span v-if="markable">
      <el-tooltip effect="dark" :content="remark" placement="top" :append-to-body="!fullscreen" v-tooltip-append-to v-if="remark">
        <el-link :underline="false" type="info" :class="[$style.icon]"><i class="el-icon-chat-line-square"></i></el-link>
      </el-tooltip>
    </span>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, InjectReactive, Emit, Inject } from 'vue-property-decorator'
import TooltipAppendTo from './tooltip-append-to-directive'

@Component({
  directives: { TooltipAppendTo }
})
export default class AuditMark extends Vue {
  @Prop() value!: any

  @Prop() valueFn!: (value: any) => string

  @Emit() input (value: any) {}

  @Prop(Boolean) disabled!: boolean

  @Prop({ type: Boolean, default: true }) markable!: boolean

  @Prop() diff!: false | string | undefined // 手动指定对比， false - 无更改， string - 有更改，更改信息， undefined - 使用默认对比

  @Prop({ type: Boolean, default: true }) float!: boolean

  form = {
    mark: '2',
    remark: ''
  }

  visible = false

  fullscreen = false

  loading = false

  get mark (): '0' | '1' | '2' {
    const ret = this.value?.mark
    return ret === true ? '1' : (ret === false ? '0' : '2')
  }

  // set mark (m: '0' | '1' | '2') {
  //   const v = m === '0' ? false : (m === '1' ? true : undefined)
  //   this.setValue({ mark: v })
  // }

  get newValue () {
    return (this.valueFn ? this.valueFn(this.value?.value) : this.value?.value) || ''
  }

  get oldValue () {
    return (this.valueFn ? this.valueFn(this.value?.oldValue) : this.value?.oldValue)
  }

  get changed () {
    if (this.diff || this.diff === false) return !!this.diff
    if (this.oldValue === undefined) return false
    return this.newValue !== this.oldValue
  }

  get changeTip () {
    if (this.diff && typeof this.diff === 'string') return this.diff
    return `变更前: ${this.oldValue}`
  }

  get remark () {
    return this.value?.remark || ''
  }

  // set remark (r: string) {
  //   this.setValue({ remark: r })
  // }

  get floatCls () {
    return this.float ? this.$style.floatMark : ''
  }

  get type () {
    if (!this.markable) return undefined
    return this.mark === '0' ? 'danger' : (this.mark === '1' ? 'primary' : undefined)
  }

  @Inject({ default: () => () => {} }) addMarkedItem!: (item: any, remove?: boolean) => void

  setValue (value: any) {
    this.input(Object.assign({}, this.value || {}, value || {}))
  }

  onEdit () {
    if (this.disabled) return
    this.form = {
      mark: this.mark,
      remark: this.remark
    }
  }

  onSave () {
    this.visible = false
    const mark = this.form?.mark === '0' ? false : (this.form?.mark === '1' ? true : undefined)
    const remark = this.form.remark
    this.setValue({ mark, remark })
  }

  onCancel () {
    this.visible = false
  }

  mounted () {
    const hanlder = () => {
      if (!(document as any).webkitIsFullScreen) this.fullscreen = false
      else {
        this.fullscreen = true
        this.loading = true
        this.$nextTick(() => {
          this.loading = false
        })
      }
    }
    window.addEventListener('resize', hanlder)
    this.$once('hook:beforeDestroy', function () {
      window.removeEventListener('resize', hanlder)
    })
  }

  @Watch('mark', { immediate: true }) markChange () {
    if (this.mark === '0') {
      this.addMarkedItem(this)
    } else {
      this.addMarkedItem(this, true)
    }
  }

  beforeDestroy () {
    this.addMarkedItem(this, true)
  }

  $style!: any
}
</script>

<style lang="scss" module>
.content {
  display: flex;
}

.text {
  // flex: 1 1 auto;
}

.suffix {
  flex: 0 0 auto;
  margin-left: 8px;
  padding-right: 24px;
}

.icon {
  margin: 0 2px;
}

.mark {

  font-size: 12px;
  background-color: #FF902A;
  color: #fff;
  line-height: 12px;
  padding: 2px 4px;
  border-radius: 2px 2px 2px 0;

  &.floatMark {
    position: absolute;
    top: -12px;
    left: -8px;
    font-size: 12px;
    background-color: #FF902A;
    color: #fff;
    line-height: 12px;
    padding: 2px 4px;
    border-radius: 2px 2px 2px 0;

    &::after {
      content: " ";
      position: absolute;
      left: 0;
      bottom: -4px;
      border-top: 4px solid #FF902A;
      border-right: 4px solid transparent;
    }
  }
}
</style>
