<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'svg-icon',
  props: {
    icon: {
      type: String,
      required: true
    },
    className: {
      type: String
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.icon}`
    },
    svgClass () {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    font-size: 24px;
    overflow: hidden;
  }
  .svg-icon.sm{
    font-size: 16px;
  }
  .svg-icon.md{
    font-size: 32px;
  }
  .svg-icon.lg{
    font-size: 48px;
  }
  .svg-icon.xl{
    font-size: 64px;
  }
</style>
