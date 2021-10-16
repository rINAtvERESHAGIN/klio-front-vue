<template>
  <v-btn
      small
      text
      x-large
      @click="handleOnClick"
  >
    <span class="btn-label">
      Распродажа
    </span>
  </v-btn>
</template>

<script>
/* компонент кнопка для перехода в раздел распродажи */

export default {
  name: 'Sale',
  props: {
    closeDrawer: Function
  },
  methods: {
    handleOnClick () {
      this.$router.push('/specials')
      this.closeDrawer()
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
