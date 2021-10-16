<template>
  <b-row class="content-section">
    <b-col
      cols="12"
      class="text-center"
    >
      <img
        class="process-success-diamond bottom-spaced"
        src="@/assets/img/diamond.svg"
        alt="КЛИО | Заказ успешно оформлен"
      >
      <h2 class="text-upper">
        Заказ <span class="red">
          <b-link class="success-order-link" :to="{ name: 'orders' }" v-scroll-to="{ el: `#${orderId}` }">
            №{{ orderId }}</b-link>
        </span> успешно оформлен!
      </h2>
      <p>На указанный e-mail было отправлено письмо с информацией о заказе.</p>
      <a v-if="is_card" :href="redirect" target="_blank">Если не открылась новая вкладка с оплатой, нажмите сюда.</a>
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
      { vmid: 'description', name: 'description', content: 'Заказ на сайте Интернет-магазина Клио успешно оформлен' },
      { vmid: 'keywords', name: 'keywords', content: 'заказ, Клио, магазин, инструмент для ювелиров, зуботехническое оборудование, ювелирная упаковка' }
    ]
  },
  props: ['orderId', 'paymentType'],
  data () {
    return {
      redirect: null
    }
  },
  methods: {
    ...mapActions([
      'GET_REDIRECT_B2P_FROM_API'
    ])
  },
  computed: {
    is_card () {
      return this.paymentType === 'card'
    }
  },
  mounted () {
    if (this.is_card) {
      this.GET_REDIRECT_B2P_FROM_API(this.orderId).then(res => {
        this.redirect = res.redirect
        window.open(res.redirect, '_blank')
      })
    }
  }
}
</script>

<style>

</style>
