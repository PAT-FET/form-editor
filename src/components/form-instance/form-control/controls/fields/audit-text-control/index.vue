<template>
<el-form-item :label="label" label-width="auto" :prop="def.model" :hidden="options.hidden" style="margin-bottom: 0;">
  <audit-mark v-model="value"></audit-mark>
</el-form-item>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, InjectReactive } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import FieldMixins from '../FieldMixins'
import { FieldTextDefinition, FieldTextOptions } from '@/components/type'
import AuditMark from '@/components/common/audit-mark/index.vue'

@Component({
  components: { AuditMark }
})
export default class AuditTextControl extends mixins(FieldMixins) {

}
</script>
