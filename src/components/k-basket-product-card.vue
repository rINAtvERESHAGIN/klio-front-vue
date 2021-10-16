<template>
  <div class="basket-product-card">
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
            class="product-name-link">{{ product.name }}
          </b-link>
          <span
            class="icon icon-trash product-delete-btn"
            @click="deleteFromBasket(product.id)"
          ></span>
          <span
            v-if="!favorite"
            class="icon icon-star product-favorite-btn"
            @click="addToFavorites(product.id)"
          ></span>
          <span
            v-else
            class="icon icon-star active product-favorite-btn"
            @click="removeFromFavorites(product.id)"
          ></span>
        </p>
        <p class="product-art">артикул: {{ product.art }}</p>
        <div class="product-price">
          <div
            v-if="product.special && product.special.new_price"
            class="product-special-price-wrapper"
          >
            <p class="product-old-price"><font-awesome-icon icon="ruble-sign" /> {{ product.price }}</p>
            <p class="product-special-price">
              <font-awesome-icon icon="ruble-sign" /> {{ product.special.new_price }}
              <span class="product-base-unit" v-if="product.special.threshold">
                от {{ product.special.threshold }} {{ product.units }}
              </span>
            </p>
          </div>
          <p v-else><font-awesome-icon icon="ruble-sign" /> {{ product.price }}</p>
          <p v-if="product.wholesale_price"
            class="product-wholesale-price">
            <font-awesome-icon icon="ruble-sign" /> {{ product.wholesale_price }}
            <span class="product-wholesale-price-cond">от <span class="red">{{ product.wholesale_threshold }}</span> {{ product.units }}</span>
          </p>
        </div>
        <b-row class="product-summary">
          <b-col cols="12" md="6" lg="5" order="2" order-md="1" class="mb-2 mb-md-0">
            <b-button v-if="Number(product.in_stock) === 0" squared class="btn btn-yellow" disabled>
              ожидается поставка
            </b-button>
<!--            <b-button-->
<!--              v-else-->
<!--              squared-->
<!--              class="btn btn-yellow"-->
<!--              :disabled="Number(product.quantity) === Number(productAmount)"-->
<!--              @click="updateBasket(product.id, productAmount)"-->
<!--            >-->
<!--              пересчитать-->
<!--            </b-button>-->
          </b-col>
          <b-col cols="12" md="6" lg="3" order="1" order-md="2" class="mb-3 mb-md-0">
            <div class="product-amount" v-if="Number(product.in_stock) !== 0">
              <span
                class="product-remove"
                @click="removeItem">
                -
              </span>
              <b-form-input
                number
                v-model="productAmount"
                class="form-input"
                @input="updateBasket(product.id, productAmount)"
              ></b-form-input>
              <span class="product-add" @click="addItem">+</span>
            </div>
          </b-col>
          <b-col cols="12" lg="4" order="3" class="text-left">
            <p class="product-sum"><font-awesome-icon icon="ruble-sign" /> {{ itemSum() }}</p>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['productId', 'productQuantity'],
  data () {
    return {
      productAmount: Number(this.productQuantity).toFixed(this.countDecimals(Number(this.productQuantity)))
    }
  },
  computed: {
    ...mapGetters([
      'BASKET_PRODUCT',
      'FAVORITE_PRODUCT'
    ]),
    favorite () {
      return this.FAVORITE_PRODUCT(this.productId)
    },
    product () {
      return this.BASKET_PRODUCT(this.productId)
    },
    countedDecimals () {
      return this.countDecimals(Number(this.product.base_amount))
    },
    productBase () {
      return Number(this.product.base_amount).toFixed(this.countDecimals(Number(this.product.base_amount)))
    }
  },
  methods: {
    ...mapActions([
      'ADD_TO_FAVORITES',
      'DELETE_FROM_BASKET',
      'REMOVE_FROM_FAVORITES',
      'UPDATE_BASKET'
    ]),
    addItem () {
      this.productAmount = Number((Number(this.productAmount) + Number(this.product.base_amount)).toFixed(this.countedDecimals))
      this.updateBasket(this.product.id, this.productAmount)
    },
    addToFavorites (id) {
      this.ADD_TO_FAVORITES(id)
    },
    countDecimals (value) {
      if (Math.floor(value) === value) return 0
      var afterDot = value.toString().split('.')[1].replace(/\.0+$/, '')
      if (afterDot !== '') return 2
      return value.toString().split('.')[1].length || 0
    },
    deleteFromBasket (id) {
      this.DELETE_FROM_BASKET(id)
    },
    getPrice () {
      if (this.priceType === 'initial') { return this.product.price }
      if (this.priceType === 'special') { return this.product.special.new_price }
      if (this.priceType === 'wholesale') { return this.product.wholesale_price }
    },
    itemSum () {
      this.priceType = 'initial'
      var product = this.product
      var price = product.price
      if (product.special && product.special.new_price) {
        if (this.productAmount >= product.special.threshold) {
          price = product.special.new_price
          this.priceType = 'special'
        }
      }
      if (product.wholesale_price && product.wholesale_threshold) {
        if (this.productAmount >= product.wholesale_threshold) {
          if (product.special && product.special.new_price) {
            if (product.special.new_price > product.wholesale_price) {
              price = product.wholesale_price
              this.priceType = 'wholesale'
            }
          } else {
            price = product.wholesale_price
            this.priceType = 'wholesale'
          }
        }
      }
      var result = price * (this.productAmount / product.base_amount)
      return result.toFixed(2)
    },
    removeFromFavorites (id) {
      this.REMOVE_FROM_FAVORITES(id)
    },
    removeItem () {
      if (this.productAmount > this.product.base_amount) {
        this.productAmount = Number((Number(this.productAmount) - Number(this.product.base_amount)).toFixed(this.countedDecimals))
        this.updateBasket(this.product.id, this.productAmount)
      }
    },
    updateBasket (id, amount) {
      if (Number(amount) > Number(this.product.in_stock)) {
        this.$bvModal.show('modal-amount-error')
      } else {
        var price = this.getPrice()
        var data = { id: id, amount: Number(amount), price: price }
        this.UPDATE_BASKET(data)
      }
    }
  }
}
</script>

<style lang="scss">
  .icon-star.active {
    background-image: url(/img/star_yellow.c0210b84.svg);
  }
  .product-delete-btn {
    cursor: pointer;
  }
</style>
