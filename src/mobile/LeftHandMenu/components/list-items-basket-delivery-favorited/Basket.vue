<template>
  <v-list-item @click="handleOnClick">
    <!--    иконка корзины которую оборачивает -->
    <v-list-item-icon style="color: #efd665; margin-right: 16px">
      <!--иконка показывающая количества товара-->
      <v-badge v-if="BASKET && BASKET.products.length"
               :content="BASKET.products.length"
               :value="BASKET.products.length"
               color="rgba(1,1,1,1)"
               bordered
      >
        <v-icon>{{ item.icon }}</v-icon>
      </v-badge>
      <v-icon v-else>{{ item.icon }}</v-icon>
    </v-list-item-icon>
    <!--подпись-->
    <v-list-item-content>
      <v-list-item-title>
        <span class="text">{{ item.text }}</span>
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Basket',
  props: {
    closeDrawer: Function
  },
  data: () => ({
    item: {
      text: 'Корзина',
      icon: 'mdi-basket-outline',
      to: '/basket,'
    }
  }),
  methods: {
    handleOnClick () {
      this.$router.push('/basket')
      this.closeDrawer()
    }
  },
  computed: {
    ...mapGetters([
      'BASKET'
    ])
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
