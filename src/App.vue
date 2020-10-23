<template>
  <div id="app">

    <fe-designer style="height: 500px;" :options="options"></fe-designer>

    <el-divider></el-divider>

    <div class="content">
      <div>
        <el-input
          v-model.trim='formJson'
          type="textarea"
          :rows="12"
          placeholder="请输入json数据"></el-input>
      </div>
      <div>
        <el-input
          v-model.trim='formData'
          type="textarea"
          :rows="12"
          placeholder="请输入表单数据"></el-input>
      </div>
    </div>
    <div style="text-align: center;">
      <el-button type="primary" size="small" @click="run">执 行</el-button>
    </div>

    <el-divider></el-divider>
    <el-checkbox v-model="edit" style="margin: 0 20px;">是否可编辑</el-checkbox>
    <el-button type="primary" size="small" @click="onCopy">复制数据</el-button>
    <el-button type="primary" size="small" @click="onValidate">验证</el-button>
    <div style="padding: 20px;">
      <fe-generator :data="data" :value="value" :edit="edit" ref="fg"></fe-generator>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import { copyToClipboard } from './components/utils'

@Component
export default class App extends Vue {
  @Ref() fg!: any

  formJson = ''

  formData = ''

  data: any = null

  value: any = null

  edit = true

  options = {
    fileupload: {
      action: 'http://localhost:3000/form/uploadFile'
    },
    imgupload: {
      action: 'http://localhost:3000/form/uploadFile'
    }
    // input: {
    //   disabled: true
    // }
  }

  run () {
    if (!this.formJson) {
      this.data = null
    } else {
      this.data = JSON.parse(this.formJson)
    }

    if (!this.formData) {
      this.value = null
    } else {
      this.value = JSON.parse(this.formData)
    }
  }

  onCopy () {
    if (!this.value) return
    copyToClipboard(JSON.stringify(this.value))
    this.$message.info('已复制')
  }

  onValidate () {
    this.fg.validate((valid: boolean) => {
      if (valid) {
        this.$message.success('验证成功')
      } else {
        this.$message.error('验证失败')
      }
    })
  }
}
</script>

<style lang="scss">
#app {
  padding-bottom: 40px;
}
body {
  margin: 0;
  padding: 0;
}

.content {
  display: flex;
  padding: 20px;
  justify-content: space-between;
  &>div {
    width: 49%;
  }
}
</style>
