<template>
  <v-btn
      small
      text
      x-large
      @click="handleOnClick"
  >
    <span class="btn-label">
      Новинки
    </span>
  </v-btn>
</template>

<script>

/* компонент кнопка предназначен для перехода в раздел НОВИНКИ */

export default {
  name: 'NewItems', // НОВИНКИ
  props: {
    handleOnCloseDrawer: Function
  },
  methods: {
    handleOnClick () {
      this.$router.push('/new-products')
      this.handleOnCloseDrawer()
    }
  }
}
</script>

<style scoped>
.btn-label {
  font-size: 1.25rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 600;
  line-height: 1.6;
  letter-spacing: 0.0075em;
}
</style>
