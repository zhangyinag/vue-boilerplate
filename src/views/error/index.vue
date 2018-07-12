<template>
    <error-page :code="code"></error-page>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import ErrorPage from '@/components/error-page/index.vue'

@Component({
  components: {ErrorPage},
  })
export default class Error extends Vue {
  get code (): string {
    return this.$route.params['code']
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
@import "~@/styles/variables.scss";

</style>
