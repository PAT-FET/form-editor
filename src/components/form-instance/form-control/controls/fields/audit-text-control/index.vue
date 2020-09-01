<template>
<el-form-item :label="label" :label-width="labelWidth" :prop="def.model" :hidden="options.hidden">
  <div :class="[$style.content]">
    <div :class="[$style.text]">
      <el-link :underline="false" :type="type">{{newValue}}</el-link>
    </div>
    <div :class="[$style.suffix]">
      <span :class="[$style.mark]" v-if="changed">
        <el-tooltip effect="dark" :content="'变更前: ' + oldValue" placement="top" v-if="changed">
          <span>已变更</span>
        </el-tooltip>
      </span>
      <span>
        <el-popover placement="top" width="400" v-model="visible" title="审批标记">
          <div>
            <el-radio-group v-model="form.mark">
              <el-radio label="1">有误</el-radio>
              <el-radio label="0">无误</el-radio>
              <el-radio label="2">取消标记</el-radio>
            </el-radio-group>
            <el-input v-model="form.remark" style="margin-top: 12px;" type="textarea" :rows="2" placeholder="请输入审批意见"></el-input>
            <div style="margin-top: 12px; text-align: right;">
              <el-button size="mini" @click="onCancel">取 消</el-button>
              <el-button type="primary" size="mini" @click="onSave">确 认</el-button>
            </div>
          </div>
          <span slot="reference" @click="onEdit">
            <el-tooltip effect="dark" content="无误" placement="top" v-if="mark === '1'">
              <el-link :underline="false" type="primary" :class="[$style.icon]"><i class="el-icon-circle-check"></i></el-link>
            </el-tooltip>
            <el-tooltip effect="dark" content="有误" placement="top" v-if="mark === '0'">
              <el-link :underline="false" type="danger" :class="[$style.icon]"><i class="el-icon-circle-close"></i></el-link>
            </el-tooltip>
            <el-tooltip effect="dark" content="批注" placement="top" v-if="mark === '2'">
              <el-link :underline="false" type="info" :class="[$style.icon]"><i class="el-icon-discover"></i></el-link>
            </el-tooltip>
          </span>
        </el-popover>
      </span>
      <span>
        <el-tooltip effect="dark" content="内容" placement="top" v-if="remark">
          <el-link :underline="false" type="info" :class="[$style.icon]"><i class="el-icon-chat-line-square"></i></el-link>
        </el-tooltip>
      </span>
    </div>
  </div>
</el-form-item>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, InjectReactive } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import FieldMixins from '../FieldMixins'
import { FieldTextDefinition, FieldTextOptions } from '@/components/type'
import { AuditTextData } from '@/components/type/core'

@Component
export default class AuditTextControl extends mixins(FieldMixins) {
  form = {
    mark: '2',
    remark: ''
  }

  visible = false

  get mark (): '0' | '1' | '2' {
    const ret = this.value?.mark
    return ret === true ? '1' : (ret === false ? '0' : '2')
  }

  set mark (m: '0' | '1' | '2') {
    const v = m === '0' ? false : (m === '1' ? true : undefined)
    this.setValue({ mark: v })
  }

  get newValue () {
    return this.value?.value || ''
  }

  get oldValue () {
    return this.value?.oldValue
  }

  get changed () {
    if (this.oldValue === undefined) return false
    return this.value !== this.oldValue
  }

  get remark () {
    return this.value?.remark || ''
  }

  set remark (r: string) {
    this.setValue({ remark: r })
  }

  get type () {
    return this.mark === '0' ? 'danger' : (this.mark === '1' ? 'primary' : undefined)
  }

  setValue (value: AuditTextData) {
    this.value = Object.assign({}, this.value || {}, value || {})
  }

  onEdit () {
    this.form = {
      mark: this.mark,
      remark: this.remark
    }
  }

  onSave () {
    this.visible = false
    this.mark = this.form.mark as any
    this.remark = this.form.remark
  }

  onCancel () {
    this.visible = false
  }
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
  position: relative;
  margin-left: 8px;
  padding-right: 24px;
}

.icon {
  margin: 0 2px;
}

.mark {
  position: absolute;
  top: -10px;
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
</style>
