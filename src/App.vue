<template>
  <div id="app">

    <fe-designer style="height: 500px;" :file-action="action" :img-action="action"></fe-designer>

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
    <div style="padding: 20px;">
      <fe-generator :data="data" :value="value" :edit="edit"></fe-generator>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  action = 'http://localhost:3000/form/uploadFile'

  formJson = ''

  formData = ''

  data: any = null

  value: any = null

  edit = true

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
