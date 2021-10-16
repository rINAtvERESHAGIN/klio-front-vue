<template>
  <div class="basket-product-card">
    <b-row>
      <b-col cols="12" md="6" lg="7" class="text-left">
        <p class="product-name">
          <b-link :to="{ name: 'product-detail', params: {category_name: product.category, product_name: product.slug } }" class="product-name-link">{{ product.name }}</b-link>
        </p>
        <p class="product-art">артикул: {{ product.art }}</p>
        <div class="product-price">
          <p><font-awesome-icon icon="ruble-sign" /> {{ product.current_price }} <span class="product-base-unit">/ {{ productBase }} {{ product.units }}</span></p>
        </div>
      </b-col>
      <b-col cols="12" md="6" lg="5">
        <div class="product-summary">
          <p class="float-left product-quantity"><span class="product-quantity-cross">✕</span> {{ product.quantity }} {{ product.units }}</p>
          <p class="product-sum"><font-awesome-icon icon="ruble-sign" /> {{ itemSum(product.current_price, product.quantity, product.base_amount) }}</p>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: ['productData'],
  data () {
    return {
      product: this.productData
    }
  },
  computed: {
    productBase () {
      return Number(this.product.base_amount).toFixed(this.countDecimals(Number(this.product.base_amount)))
    }
  },
  methods: {
    countDecimals (value) {
      if (Math.floor(value) === value) return 0
      var afterDot = value.toString().split('.')[1].replace(/\.0+$/, '')
      if (afterDot !== '') return 2
      return value.toString().split('.')[1].length || 0
    },
    itemSum: function (price, ammount, baseAmmount) {
      return (price * (ammount / baseAmmount)).toFixed(2)
    }
  }
}
</script>

<style>

</style>
