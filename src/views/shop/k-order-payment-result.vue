<template>
  <b-row class="content-section">
    <b-col
      cols="12"
      class="text-center"
    >
      <img
        class="process-success-diamond bottom-spaced"
        src="@/assets/img/diamond.svg"
        :alt="success ? 'КЛИО | Заказ успешно оплачен': 'КЛИО | Заказ не оплачен'"
      >
      <h2 class="text-upper" v-if="success">
        Заказ <span class="red">
          <b-link class="success-order-link" :to="{ name: 'orders' }" v-scroll-to="{ el: `#${orderId}` }">
            №{{ orderId }}</b-link>
        </span> успешно оплачен!
      </h2>
      <h2 class="text-upper" v-else>
        К сожалению во время оплаты заказа <span class="red">
          <b-link class="success-order-link" :to="{ name: 'orders' }" v-scroll-to="{ el: `#${orderId}` }">
            №{{ orderId }}</b-link>
        </span> произошла ошибка!
      </h2>
      <p  v-if="success">С Вами свяжеться наш менеджер для подтверждения вашего заказа и платежа.</p>
      <p  v-else>Свяжитесь с нашим менеджером или повторите попытку позже по <a :href="redirect" target="_blank">ссылке</a>.</p>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'k-order-success',
  metaInfo: {
    title: 'Заказ успешно оформлен',
    meta: [
      { vmid: 'description', name: 'description', content: 'Результат оплаты заказа на сайте Интернет-магазина Клио' },
      { vmid: 'keywords', name: 'keywords', content: 'заказ, Клио, магазин, инструмент для ювелиров, зуботехническое оборудование, ювелирная упаковка' }
    ]
  },
  props: ['orderId', 'status'],
  data () {
    return {
      redirect: null
    }
  },
  computed: {
    success () {
      return this.status === 'success'
    }
  },
  methods: {
    ...mapActions([
      'SET_ORDER_B2P_STATUS',
      'GET_REDIRECT_B2P_FROM_API'
    ])
  },
  mounted () {
    this.SET_ORDER_B2P_STATUS({
      id: this.orderId,
      operation: this.$route.query.operation,
      resultCode: this.$route.query.code || 1,
      status: this.status
    })
    if (!this.success) {
      this.GET_REDIRECT_B2P_FROM_API(this.orderId).then(res => {
        this.redirect = res.redirect
      })
    }
  }
}
</script>

<style>

</style>
