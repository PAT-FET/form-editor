<template>
  <div id="app">
    <fe-designer style="height: 500px;"></fe-designer>
    <fe-generator></fe-generator>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import components from '@/components'

@Component({
  components: { ...components }
})
export default class App extends Vue {}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
</style>
