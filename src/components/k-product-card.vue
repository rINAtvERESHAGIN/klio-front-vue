<template>
  <div class="product-card-container">
    <div class="product-card">
      <b-badge
        v-if="product.special"
        class="product-badge badge-special"
      >
        <b-link :to="{ name: 'special-detail', params: {special_name: product.special.slug } }">
          акция
        </b-link>
      </b-badge>
      <b-badge
        v-else-if="product.is_new == true"
        class="product-badge badge-new"
      >
        новинка
      </b-badge>
      <b-link :to="{ name: 'product-detail', params: { product_name: product.slug, category_slug: categorySlug } }">
        <div class="product-img-container">
          <img
            v-if="product.image.thumbnail"
            :src="product.image.thumbnail" @error="product.image.thumbnail = null"
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
      <p class="product-stock">
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
        <span
          v-if="!favorite"
          class="icon icon-star product-favorite-btn float-right"
          @click="addToFavorites(product.id)"
        ></span>
        <span
          v-else
          class="icon icon-star active product-favorite-btn float-right"
          @click="removeFromFavorites(product.id)"
        ></span>
      </p>
      <b-link
        :to="`/catalog/products/${product.slug}`"
        class="product-name-link"
      >
        <p class="product-name">{{ product.name }}</p>
      </b-link>
      <p class="product-art">артикул: {{ product.art }}</p>
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
        <p v-else-if="Number(product.in_stock) !== 0" class="product-regular-price">
          <font-awesome-icon icon="ruble-sign"/>
          {{ product.price }}
        </p>
        <p v-if="product.wholesale_price && Number(product.in_stock) !== 0" class="product-wholesale-price">
          <font-awesome-icon icon="ruble-sign"/>
          {{ product.wholesale_price }}
          <span class="product-wholesale-price-cond">от <span class="red">{{ product.wholesale_threshold }}</span> {{ product.units }}</span>
        </p>
        <p v-else>
<!--          <font-awesome-icon icon="ruble-sign"/>-->
<!--          {{ product.price }}-->
        </p>
<!--        <div v-if="!isAdded() && Number(product.in_stock) !== 0" class="product-amount">-->
<!--          <span class="product-remove" @click="removeItem">-</span>-->
<!--          <b-form-input-->
<!--            v-model="productAmount"-->
<!--            number-->
<!--            class="form-input"-->
<!--          ></b-form-input>-->
<!--          <span class="product-add" @click="addItem">+</span>-->
<!--        </div>-->
      </div>
      <div class="product-btn-container">
        <div v-if="!isAdded() && Number(product.in_stock) !== 0" class="product-amount">
          <span class="product-remove" @click="removeItem">-</span>
          <b-form-input v-model="productAmount" number class="form-input"></b-form-input>
          <span class="product-add" @click="addItem">+</span>
        </div>
        <div v-else-if="isAdded() && Number(product.in_stock) !== 0" class="product-amount product-amount-stub">
          <b-form-input v-model="productAmount" number class="form-input" disabled></b-form-input>
        </div>
        <div v-else class="product-amount product-amount-stub">
<!--          <b-form-input v-model="productAmount" number class="form-input" disabled></b-form-input>-->
        </div>
        <b-button v-if="isAdded()" size="lg" class="btn btn-yellow btn-view-cart" :to="{ name: 'basket' }">
          просмотр корзины
        </b-button>
        <b-button v-else-if="Number(product.in_stock) === 0" size="lg" class="btn btn-yellow btn-awaiting-delivery" disabled>
          ожидается поставка
        </b-button>
        <b-button v-else size="lg" class="btn btn-yellow" @click="addToBasket(product.id, productAmount)">
          в корзину
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'k-product-card',
  props: ['categoryData', 'productData'],
  data () {
    return {
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
    addToFavorites (id) {
      this.ADD_TO_FAVORITES(id)
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

.icon-star.active {
  background-image: url(/img/star_yellow.c0210b84.svg);
}

.product-card {
  background: white;
  border-radius: 15px;
  margin-top: 10px;
  margin-bottom: 20px;
  padding-left: 15px;
  padding-right: 15px;

  &:hover {
    -webkit-box-shadow: 0 0 11px 0 #00000033;
    box-shadow: 0 0 11px 0 #00000033;
    transition: 0.2s;
  }

  .product-badge {
    margin-top: 0;
    padding-top: 7px;
    right: 15px;
    border-radius: 0 15px 0 15px;
  }

  .product-img-container {
    text-align: center;
    height: 210px;
    display: flex;
    align-items: center;
    justify-content: center;

    .product-img {
      max-width: 100%;
      margin: 25px auto;
      max-height: 180px;
      vertical-align: middle;
    }
  }

  .product-stock {
    display: none;
  }

  .name-art-container {
    min-height: 70px;
  }

  .product-name-link {
    text-decoration: none;
    color: initial;

    .product-name {
      font-weight: 600;
      margin-bottom: 10px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  .product-art {
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }

  .product-price {
    text-align: right;

    .product-old-price {
      margin-bottom: 0;
      color: #777;
      font-weight: 600;
    }

    .product-special-price {
      color: #c45448;
      font-weight: 600;
      font-size: 24px;

      .product-special-price-threshold {
        //display: none;
      }
    }

    .product-regular-price {
      font-size: 18px;
      font-weight: 500;
    }
  }

  .product-btn-container {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    padding-bottom: 20px;

    .product-amount.product-amount-stub {
      display: none;
    }

    .product-amount {
      flex-grow: 1;
      flex-shrink: 0;
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-evenly;
      align-items: center;

      .form-input {
        //background: red;
        border-radius: 5px;
        box-shadow: inset 0 0 5px #a5a5a5;
        width: 40px;
        padding: 0;
        text-align: center;
      }

      .product-add, .product-remove {
        width: 30px;
        text-align: center;
        font-size: 25px;
        cursor: pointer;
        user-select: none;
      }
    }

    .btn-yellow {
      padding: 5px;
      white-space: nowrap;
      flex-grow: 1;
      flex-shrink: 2;
      font-size: 15px;
      min-height: 40px;

      &.btn-view-cart {
        padding-top: 8px;
      }
    }
  }
}
</style>
