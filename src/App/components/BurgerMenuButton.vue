<template>
  <div>
    <div className="bar1"></div>
    <div className="bar2"></div>
    <div className="bar3"></div>
  </div>
</template>

<script>
export default {
  name: 'BurgerMenuButton',
  props: {
    openBurgerMenu: Function,
    burgerMenuActive: Boolean
  }
}
</script>

<style scoped>

</style>
