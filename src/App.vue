<template>
  <div id="app">
    <fe-designer style="height: 500px;"></fe-designer>

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
    <fe-generator></fe-generator>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import components from '@/components'

@Component({
  components: { ...components }
})
export default class App extends Vue {
  formJson = ''

  formData = ''
}
</script>

<style lang="scss">
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
