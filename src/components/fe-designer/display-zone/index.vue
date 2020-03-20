<template>
<div :class="[$style.container]">
  <div :class="[$style.content]">

  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DisplayZone extends Vue {
}
</script>

<style lang="scss" module>
.container {
  display: flex;
  align-items: stretch;
}

.content {
  width: 100%;
  margin: 10px;
  border: 1px dashed #999;
  margin: 10px;
  overflow: auto;
}
</style>
