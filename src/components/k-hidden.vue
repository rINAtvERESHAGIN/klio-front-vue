<template>
  <div class="hidden">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'k-home'
}
</script>

<style lang="scss">
  .hidden {
    width: 0;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }
</style>
