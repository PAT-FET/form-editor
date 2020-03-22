<template>
<div>
 InputAttr
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import ControlMixins from '../ControlMixins'

@Component
export default class InputAttr extends mixins(ControlMixins) {
}
</script>

<style lang="scss" module>

</style>
