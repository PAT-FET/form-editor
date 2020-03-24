<template>
<div :class="[$style.container]">
  <el-button type="text" icon="el-icon-upload2" @click="onImport" v-if="upload">导入JSON</el-button>
  <el-button type="text" icon="el-icon-delete" @click="onClear" v-if="clearable">清空</el-button>
  <el-button type="text" icon="el-icon-view" @click="onPreview" v-if="preview">预览</el-button>
  <el-button type="text" icon="el-icon-document" @click="onGenJson" v-if="generateJson">生成JSON</el-button>
  <preview-form ref="pf"></preview-form>
  <generate-json ref="gj"></generate-json>
  <import-json ref="ij"></import-json>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject, InjectReactive, Ref } from 'vue-property-decorator'
import PreviewForm from './preview-form/index.vue'
import GenerateJson from './generate-json/index.vue'
import ImportJson from './import-json/index.vue'

@Component({
  components: { PreviewForm, GenerateJson, ImportJson }
})
export default class ToolBar extends Vue {
  @InjectReactive() preview!: boolean
  @InjectReactive() generateJson!: boolean
  @InjectReactive() clearable!: boolean
  @InjectReactive() upload!: boolean

  @Ref() pf!: PreviewForm

  @Ref() gj!: GenerateJson

  @Ref() ij!: ImportJson

  @Inject() clearControl!: () => void

  onClear () {
    this.clearControl()
  }

  onPreview () {
    this.pf.preview()
  }

  onGenJson () {
    this.gj.generate()
  }

  onImport () {
    this.ij.import()
  }
}
</script>

<style lang="scss" module>
.container {
  height: 45px;
  border-bottom: 2px solid #e4e7ed;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;
}
</style>
