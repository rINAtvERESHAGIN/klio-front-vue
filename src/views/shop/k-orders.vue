<template>
  <b-row class="content-section">
    <b-col cols="12" lg="10" xl="8" offset-lg="1" offset-xl="2">
      <div class="personal-info-blk">
        <b-nav tabs justified>
          <b-nav-item :to="{ name: 'profile' }">Профиль</b-nav-item>
          <b-nav-item active>Заказы</b-nav-item>
          <b-nav-item :to="{ name: 'favorites' }">Избранное</b-nav-item>
          <b-nav-item :to="{ name: 'basket' }">Корзина</b-nav-item>
        </b-nav>
        <b-container fluid>
          <b-row v-if="loadingStatus === 'pending'" class="bottom-spaced">
            <b-col cols="12" class="text-center">
              <b-spinner type="grow" class="m-3"></b-spinner>
              <b-spinner type="grow" class="m-3"></b-spinner>
              <b-spinner type="grow" class="m-3"></b-spinner>
            </b-col>
          </b-row>
          <b-row v-else-if="loadingStatus === 'success'" class="orders-list">
            <b-col cols="12" v-if="ORDERS.length">
               <OrderCard v-for="order in ORDERS" :key="order.id" :orderData="order" />
            </b-col>
            <b-col cols="12" v-else>
                <p class="orders-empty-msg">Вы пока не оформляли заказы</p>
            </b-col>
          </b-row>
          <b-row v-else-if="loadingStatus === 'error'" class="text-center">
            <b-col cols="12" class="text-center">
              <p class="favorites-empty-msg">
                Для просмотра заказов <b-link v-b-modal.modal-login>войдите</b-link>
              </p>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import OrderCard from '../../components/k-order-card.vue'

export default {
  name: 'k-orders',
  metaInfo: {
    title: 'Заказы',
    meta: [
      { vmid: 'description', name: 'description', content: 'Список моих заказов на сайте Интернет-магазина Клио' },
      { vmid: 'keywords', name: 'keywords', content: 'заказы, Клио, магазин, инструмент для ювелиров, зуботехническое оборудование, ювелирная упаковка' }
    ]
  },
  components: {
    OrderCard
  },
  data () {
    return {
      loadingStatus: 'pending'
    }
  },
  computed: {
    ...mapGetters([
      'CURRENT_USER',
      'ORDERS'
    ])
  },
  methods: {
    ...mapActions([
      'GET_ORDERS_FROM_API'
    ])
  },
  mounted () {
    this.GET_ORDERS_FROM_API()
      .then((res) => {
        if (res.data) {
          this.loadingStatus = 'success'
        }
      })
      .catch(() => {
        this.loadingStatus = 'error'
      })
  }
}
</script>

<style lang="scss">
  .orders-empty-msg {
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
