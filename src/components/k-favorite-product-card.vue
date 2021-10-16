<template>
  <div class="basket-product-card favorite">
    <b-row>
      <b-col cols="12" md="4">
        <b-link :to="`/catalog/products/${product.slug}`">
          <div class="product-img-container">
            <img
              v-if="product.image.url"
              :src="product.image.url"
              :alt="product.image.label"
              class="product-img"
            >
            <img
              v-else
              src="@/assets/icons/diamond_grey.svg"
              width="100px"
              alt="no image available"
              class="product-img-none"
            >
          </div>
        </b-link>
      </b-col>
      <b-col cols="12" md="8">
        <p class="product-name">
          <b-link
            :to="`/catalog/products/${product.slug}`"
            class="product-name-link"
          >
            {{ product.name }}
          </b-link>
          <span
            class="icon icon-trash"
            @click="removeFromFavorites(product.id)"
          ></span>
        </p>
        <p class="product-art">артикул: {{ product.art }}</p>
          <div class="product-price">
            <div
              v-if="product.special && product.special.new_price && Number(product.in_stock) !== 0"
              class="product-special-price-wrapper"
            >
              <p class="product-old-price"><font-awesome-icon icon="ruble-sign" /> {{ product.price }} </p>
              <p class="product-special-price">
                <font-awesome-icon icon="ruble-sign" /> {{ product.special.new_price }}
                <span class="product-base-unit" v-if="product.special.threshold">
                  от {{ product.special.threshold }} {{ product.units }}
                </span>
                <span v-else class="product-base-unit">/ {{ productBase }} {{ product.units }}</span>
              </p>
            </div>
            <p v-else-if="Number(product.in_stock) !== 0"><font-awesome-icon icon="ruble-sign" /> {{ product.price }} <span class="product-base-unit">/ {{ productBase }} {{ product.units }}</span></p>
            <p v-if="product.wholesale_price && Number(product.in_stock) !== 0"
              class="product-wholesale-price">
              <font-awesome-icon icon="ruble-sign" /> {{ product.wholesale_price }}
                <span class="product-wholesale-price-cond">от <span class="red">{{ product.wholesale_threshold }}</span> {{ product.units }}</span></p>
        </div>
        <b-row class="product-summary">
          <b-col cols="12" md="6" lg="5" order="2" order-md="1" class="mb-2 mb-md-0">
            <b-button v-if="isAdded()" squared size="lg" class="btn btn-yellow" :to="{ name: 'basket' }">
              просмотр корзины
            </b-button>
            <b-button v-else-if="Number(product.in_stock) === 0" squared size="lg" class="btn btn-yellow" disabled>
              ожидается поставка
            </b-button>
            <b-button v-else squared size="lg" class="btn btn-yellow" @click="addToBasket(product.id, productAmount)">
              в корзину
            </b-button>
          </b-col>
          <b-col cols="12" md="6" lg="3" order="1" order-md="2" class="mb-3 mb-md-0">
            <div class="product-amount" v-if="!isAdded() && Number(product.in_stock) !== 0">
              <span
                class="product-remove"
                @click="removeItem">
                -
              </span>
              <b-form-input
                number
                v-model="productAmount"
                class="form-input"
              ></b-form-input>
              <span class="product-add" @click="addItem">+</span>
            </div>
          </b-col>
          <b-col cols="12" lg="4" order="3" class="text-left">
            <p v-if="!isAdded() && Number(product.in_stock) !== 0" class="product-sum"><font-awesome-icon icon="ruble-sign" /> {{ itemSum() }}</p>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['favorite'],
  data () {
    return {
      product: this.favorite,
      countedDecimals: this.countDecimals(Number(this.favorite.base_amount)),
      productAmount: Number(this.favorite.base_amount).toFixed(this.countDecimals(Number(this.favorite.base_amount)))
    }
  },
  computed: {
    ...mapGetters([
      'BASKET_PRODUCTS_IDS'
    ]),
    productBase () {
      return Number(this.product.base_amount).toFixed(this.countDecimals(Number(this.product.base_amount)))
    }
  },
  methods: {
    ...mapActions([
      'ADD_TO_BASKET',
      'REMOVE_FROM_FAVORITES'
    ]),
    addItem: function () {
      this.productAmount = (Number(this.productAmount) + Number(this.product.base_amount)).toFixed(this.countedDecimals)
    },
    addToBasket (id, amount) {
      if (Number(amount) > Number(this.product.in_stock)) {
        this.$bvModal.show('modal-amount-error')
      } else {
        var price = this.getPrice()
        var data = { id: id, amount: Number(amount), price: price }
        this.ADD_TO_BASKET(data)
      }
    },
    countDecimals: function (value) {
      if (Math.floor(value) === value) return 0
      var afterDot = value.toString().split('.')[1].replace(/\.0+$/, '')
      if (afterDot !== '') return 2
      return value.toString().split('.')[1].length || 0
    },
    getPrice () {
      var product = this.product
      var price = product.price
      if (product.special && product.special.new_price) {
        if (this.productAmount >= product.special.threshold) {
          price = product.special.new_price
        }
      }
      if (product.wholesale_price && product.wholesale_threshold) {
        if (this.productAmount >= product.wholesale_threshold) {
          if (product.special && product.special.new_price) {
            price = product.wholesale_price < product.special.new_price ? product.wholesale_price : price
          } else { price = product.wholesale_price }
        }
      }
      return price
    },
    isAdded () {
      const isAdded = this.BASKET_PRODUCTS_IDS.includes(this.product.id)
      return isAdded
    },
    itemSum () {
      var price = this.getPrice()
      var result = Number(price) * ((Number(this.productAmount) / (this.product.base_amount ? this.product.base_amount : 1)))
      return result.toFixed(2)
    },
    removeFromFavorites (id) {
      this.REMOVE_FROM_FAVORITES(id)
    },
    removeItem: function () {
      if (this.productAmount > this.product.base_amount) {
        this.productAmount = (Number(this.productAmount) - Number(this.product.base_amount)).toFixed(this.countedDecimals)
      }
    }
  }
}
</script>

<style lang="scss">
  .basket-product-card.favorite .product-price p {
      font-size: 32px;
      font-weight: 700;
  }
</style>
