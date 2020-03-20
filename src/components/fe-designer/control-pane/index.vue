<template>
<div>
  <div :class="$style.title">控件列表</div>
  <ul :class="$style.list">
    <li :class="$style.item" v-for="row in rows" :key="row.name">{{row.label}}</li>
  </ul>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { getControls } from './config'

@Component
export default class ControlPane extends Vue {
  rows = getControls()
}
</script>

<style lang="scss" module>
.title {
  font-size: 13px;
  padding: 8px 12px;
}

.list {
  margin: 0;
  padding: 0 10px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}

.item {
  box-sizing: border-box;
  width: calc(50% - 4px);
  line-height: 26px;
  background-color: #f4f6fc;;
  border: 1px solid #f4f6fc;
  margin: 4px 2px;
  font-size: 12px;
  color: #333;
  text-align: center;

  &:hover {
    cursor: pointer;
    border: dashed 1px #409eff;
    color: #409eff;
  }
}
</style>
