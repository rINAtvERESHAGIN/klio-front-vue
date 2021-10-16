<template>
  <div :class="`order-card ${order.status}`">
    <b-row>
      <b-col cols="12" md="6" class="mb-3">
        <p class="order-name" :id="order.id">Заказ #{{ order.id }}</p>
        <p class="order-date">от {{ order.created }}</p>
        <p class="order-sum" v-if="order.price"><font-awesome-icon icon="ruble-sign" /> {{ order.price }} <b-badge v-if="order.promo" class="badge-yellow">промокод</b-badge></p>
        <p class="order-sum" v-else><font-awesome-icon icon="ruble-sign" /> {{ totalSum() }}</p>
      </b-col>
      <b-col cols="12" md="6">
        <p class="order-status text-right">
          <b-badge>{{ statuses.find(status => status.name === order.status).label }}</b-badge>
        </p>
        <p class="order-products-btn" v-b-toggle="`collapse-${order.id}`">
          смотреть список товаров
          <img
            src="@/assets/icons/arrow_grey.svg"
            alt=""
          >
        </p>
      </b-col>
    </b-row>
    <b-collapse
      :id="`collapse-${order.id}`"
      class="mt-2"
    >
      <OrderProductCard
        v-for="product in order.basket.products"
        :key="product.id"
        :productData="product"
      />
    </b-collapse>
  </div>
</template>

<script>
import OrderProductCard from '../components/k-order-product-card.vue'

export default {
  components: {
    OrderProductCard
  },
  props: ['orderData'],
  data () {
    return {
      order: this.orderData,
      statuses: [
        { name: 'active', label: 'активен' },
        { name: 'pending', label: 'на исполнении' },
        { name: 'completed', label: 'завершен' },
        { name: 'denied', label: 'отменен' },
        { name: 'delivery', label: 'доставляется' }
      ]
    }
  },
  methods: {
    totalSum: function () {
      var result = 0
      if (this.order.basket.products) {
        var products = this.order.basket.products
        for (var i = 0; i < products.length; i++) {
          var product = products[i]
          result += Number(product.current_price) * (product.quantity / product.base_amount)
        }
      }
      return result.toFixed(2)
    }
  }
}
</script>

<style>

</style>
