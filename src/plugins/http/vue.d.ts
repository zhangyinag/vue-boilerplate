/**
 * Augment the typings of Vue.js
 */

import {http} from '@/plugins'

declare module "vue/types/vue" {
  interface Vue {
    $http: typeof http
  }
}