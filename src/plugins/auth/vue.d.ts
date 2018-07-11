/**
 * Augment the typings of Vue.js
 */

import {auth} from '@/plugins/auth/index'

declare module "vue/types/vue" {
  interface Vue {
    $auth: typeof auth
  }
}