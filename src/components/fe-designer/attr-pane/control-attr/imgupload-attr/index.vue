<template>
<div>
<attr-field label="数据源">
  <el-input v-model.trim="def.model"></el-input>
</attr-field>
<attr-field label="标题">
  <el-input v-model.trim="def.name"></el-input>
</attr-field>
<attr-field label="最大上传数">
  <el-input v-model.number="options.limit"></el-input>
</attr-field>
<attr-field label="上传地址">
  <el-input v-model.trim="options.action"></el-input>
</attr-field>

<attr-field label="默认值">
  <options-pane :list="options.defaultValue" :checkable="false" :add-fn="addFn">
    <template slot-scope="{row}">
      <div>
        <el-input v-model="row.name" size="mini" placeholder="文件名"></el-input>
      </div>
      <div style="margin-right: 12px;">
          <el-input v-model="row.url" size="mini" placeholder="url"></el-input>
      </div>
    </template>
  </options-pane>
</attr-field>
<attr-field label="操作属性">
  <el-checkbox v-model="options.hidden">隐藏</el-checkbox>
  <el-checkbox v-model="options.disabled">禁用</el-checkbox>
</attr-field>
<attr-field label="校验">
  <el-checkbox v-model="options.required">必填</el-checkbox> <br/>
</attr-field>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import ControlMixins from '../ControlMixins'
import { FieldImguploadDefinition, FieldImguploadOptions } from '@/components/type'
import OptionsPane from '../../options-pane/index.vue'

@Component({
  components: { OptionsPane }
})
export default class ImguploadAttr extends mixins(ControlMixins) {
  get def (): FieldImguploadDefinition {
    return this.activeControl as FieldImguploadDefinition
  }

  get options (): FieldImguploadOptions {
    return this.def.options
  }

  addFn (list: any[]) {
    list.push({ name: '', url: '', uid: Date.now(), status: 'success' })
  }
}
</script>

<style lang="scss" module>

</style>
