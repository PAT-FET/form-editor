import _Vue from 'vue'
import FeDesigner from './fe-designer/index.vue'
import FeGenerator from './fe-generator/index.vue'
import config from './config'

export { FeDesigner, FeGenerator }

export default {
  install (Vue: typeof _Vue, options: any = {}) {
    Object.assign(config, options)
    Vue.component('fe-designer', FeDesigner)
    Vue.component('fe-generator', FeGenerator)
  }
}
