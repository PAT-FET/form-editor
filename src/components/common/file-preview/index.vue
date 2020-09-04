<template>
<div>
  <div :class="[$style.header]">
    <span></span>
    <span>{{current && current.name}}</span>
    <span></span>
  </div>
  <div :class="[$style.body]">Body</div>
  <div :class="[$style.footer]">
    <ul>
      <li v-for="(item, i) in list" :key="i">{{item.name}}</li>
    </ul>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, InjectReactive, Emit } from 'vue-property-decorator'

@Component
export default class FilePreview extends Vue {
  @Prop(Array) list!: any[]

  index = 0

  get current () {
    return this.list && this.list[this.index]
  }
}
</script>

<style lang="scss" module>
.header {

}

.body {

}

.footer {

}
</style>
