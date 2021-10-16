<template>
    <b-row class="content-section">
      <client-only>
        <b-col cols="12" lg="10" xl="8" offset-lg="1" offset-xl="2">
          <div class="personal-info-blk">
            <b-nav tabs justified>
              <b-nav-item :to="{ name: 'profile' }">Профиль</b-nav-item>
              <b-nav-item :to="{ name: 'orders' }">Заказы</b-nav-item>
              <b-nav-item active>Избранное</b-nav-item>
              <b-nav-item :to="{ name: 'basket' }">Корзина</b-nav-item>
            </b-nav>
            <b-container fluid>
              <b-row v-if="FAVORITES && FAVORITES.length" class="basket-products-list">
                  <FavoriteProductCard v-for="product in FAVORITES" :key="product.id" :favorite="product" />
              </b-row>
              <p v-else-if="CURRENT_USER" class="favorites-empty-msg">Избранных товаров пока нет</p>
              <p v-else class="favorites-empty-msg">
                Для выбора и просмотра избранных товаров <b-link v-b-modal.modal-login>войдите</b-link>
              </p>
            </b-container>
          </div>
        </b-col>
      </client-only>
    </b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import FavoriteProductCard from '../../components/k-favorite-product-card.vue'

export default {
  metaInfo: {
    title: 'Избранные товары',
    meta: [
      { vmid: 'description', name: 'description', content: 'Избранные товары пользователя на сайте Интернет-магазина Клио' },
      { vmid: 'keywords', name: 'keywords', content: 'избранное, Клио, магазин, инструмент для ювелиров, зуботехническое оборудование, ювелирная упаковка' }
    ]
  },
  components: {
    FavoriteProductCard
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'CURRENT_USER',
      'FAVORITES'
    ])
  }
}
</script>

<style lang="scss">
  .favorites-empty-msg {
    font-size: 24px;
    text-align: center;
    padding: 1rem 0 3rem 0;
    a {
      color: inherit;
      text-decoration: underline;
      &:hover {
        color: inherit;
      }
    }
  }
</style>
