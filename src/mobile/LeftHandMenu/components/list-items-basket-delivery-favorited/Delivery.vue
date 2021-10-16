<template>
  <v-list-item @click="handleOnClick">
    <v-list-item-icon style="color: #efd665; margin-right: 16px">
      <v-icon>{{ item.icon }}</v-icon>
    </v-list-item-icon>

    <v-list-item-content>
      <v-list-item-title>
        <span class="text">{{ item.text }}</span>
      </v-list-item-title>
    </v-list-item-content>

  </v-list-item>
</template>

<script>

export default {
  name: 'Delivery',
  props: {
    closeDrawer: Function
  },
  data: () => ({
    item: {
      text: 'Доставка',
      icon: 'mdi-truck-delivery-outline',
      to: '/info/dostavka'
    }
  }),
  methods: {
    handleOnClick () {
      this.$router.push(this.item.to)
      this.closeDrawer()
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 1rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.00938em;
}
</style>
