<template>
<div :class="[$style.container]">
  ToolBar
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ToolBar extends Vue {
}
</script>

<style lang="scss" module>
.container {
  height: 45px;
  border-bottom: 2px solid #e4e7ed;
}
</style>
