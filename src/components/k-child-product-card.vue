<template>
  <div class="product-child-card-container product-card-container">
    <div class="product-card product-child-card">
      <div class="product-stock">
        <div class="product-stock-content">
          <b-badge
            v-if="Number(product.in_stock) !== 0"
            class="float-left"
          >
            в наличии
          </b-badge>
          <b-badge
            v-else
            class="float-left"
          >
            нет на складе
          </b-badge>
    </div>
      </div>
      <b-link
        :to="`/catalog/products/${product.slug}`"
        class="product-name-link"
      >
        <p class="product-name">{{ product.name }}</p>
      </b-link>
      <div class="product-price">
        <div
          v-if="product.special && product.special.new_price && Number(product.in_stock) !== 0"
          class="product-special-price-wrapper"
        >
          <p class="product-old-price"><font-awesome-icon icon="ruble-sign" /> {{ product.price }}</p>
          <p class="product-special-price">
            <span v-if="product.special.threshold" class="product-special-price-threshold">от {{ product.special.threshold }} {{ product.units }}</span>
            <font-awesome-icon icon="ruble-sign" /> {{ product.special.new_price }}
          </p>
        </div>
        <p v-else-if="Number(product.in_stock) !== 0"><font-awesome-icon icon="ruble-sign" /> {{ product.price }}</p>
        <p v-if="product.wholesale_price && Number(product.in_stock) !== 0"
           class="product-wholesale-price">
          <font-awesome-icon icon="ruble-sign" /> {{ product.wholesale_price }}
          <span class="product-wholesale-price-cond" >от <span class="red">{{ product.wholesale_threshold }}</span> {{ product.units }}</span></p>
        <div v-if="!isAdded() && Number(product.in_stock) !== 0" class="product-amount">
          <span class="product-remove" @click="removeItem">-</span>
          <b-form-input
            v-model="productAmount"
            number
            class="form-input"
          ></b-form-input>
          <span class="product-add" @click="addItem">+</span>
        </div>
      </div>
      <div class="product-btn-container">
        <b-button v-if="isAdded()" squared size="lg" class="btn btn-yellow" :to="{ name: 'basket' }">
          <font-awesome-icon icon="shopping-cart"/>
        </b-button>
        <b-button v-else-if="Number(product.in_stock) === 0" squared size="lg" class="btn btn-yellow" disabled>
          <font-awesome-icon icon="truck"/>
        </b-button>
        <b-button v-else squared size="sm" class="btn btn-yellow" @click="addToBasket(product.id, productAmount)">
          <font-awesome-icon fas icon="cart-plus" />
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons/faCartPlus'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons/faShoppingCart'
import { faTruck } from '@fortawesome/free-solid-svg-icons/faTruck'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(faCartPlus)
library.add(faShoppingCart)
library.add(faTruck)

export default {
  name: 'k-product-card',
  props: ['categoryData', 'productData'],
  data () {
    return {
      slide: false,
      categorySlug: this.categoryData,
      product: this.productData,
      countedDecimals: this.countDecimals(Number(this.productData.base_amount)),
      popoverActive: false,
      productAmount: Number(this.productData.base_amount).toFixed(this.countDecimals(Number(this.productData.base_amount)))
    }
  },
  computed: {
    ...mapGetters([
      'BASKET_PRODUCTS_IDS',
      'FAVORITE_PRODUCT'
    ]),
    favorite () {
      return this.FAVORITE_PRODUCT(this.product.id)
    }
  },
  mounted () {
    this.popoverActive = true
  },
  methods: {
    ...mapActions([
      'ADD_TO_BASKET',
      'ADD_TO_FAVORITES',
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
    // addToFavorites (id) {
    //   this.ADD_TO_FAVORITES(id)
    // },
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
    // removeFromFavorites (id) {
    //   this.REMOVE_FROM_FAVORITES(id)
    // },
    removeItem: function () {
      if (this.productAmount > this.product.base_amount) {
        this.productAmount = (Number(this.productAmount) - Number(this.product.base_amount)).toFixed(this.countedDecimals)
      }
    }
  }
}
</script>

<style lang="scss">
.icon-star.active {
  background-image: url(/img/star_yellow.c0210b84.svg);
}

.product-child-card{
  padding: 5px 10px 65px 10px !important;
  margin: 0 2px !important;
  box-shadow: none !important;
  border: 1px solid #f8f8f8 !important;
  display: flex;
  flex: 1 1;
  flex-direction: column;
}

.product-child-card:hover{
  box-shadow: 1px 1px 10px #000 !important;
  border: 1px solid #ddd !important;
}

.product-child-card .btn{
  padding: 2px 5px !important;
}
.product-child-card .product-badge{}

.product-child-card .product-btn-container{
  bottom: 5px;
}

.product-child-card .product-img-container{
  height: 115px !important;
}
.product-child-card .product-img-container .product-img-none {
  top: 30px !important;
}
.product-child-card .product-price {
  margin-top: 0 !important;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
}
.product-child-card .product-price p{
  font-size: 18px !important;
  text-align: left !important;
  margin-bottom: 5px !important;
}

.product-child-card .product-amount{
  //width: 100% !important;
  flex-direction: row;
  justify-content: center;
  justify-items: center;
  text-align: center !important;
  margin-right: 0 !important;
}

.product-child-card .product-stock{
  width: 100% !important;
  padding: 0 !important;
  //margin-left: auto;
  //margin-right: auto;
  margin-left: -10px;
  margin-top: -6px !important;
}
.product-child-card .product-stock .product-stock-content{
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%!important;
}
.product-child-card .product-stock .badge{
  padding: 7px 10px !important;
}
</style>
