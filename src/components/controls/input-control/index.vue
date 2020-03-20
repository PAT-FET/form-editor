<template>
<div>FeGenerator</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { FieldInputDefinition } from '@/components/type'

@Component
export default class InputControl extends Vue {
  @Prop() definition!: FieldInputDefinition
}
</script>
