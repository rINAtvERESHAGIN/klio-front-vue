<template>
  <div>
    <b-row class="content-section" v-if="PRODUCT">
      <b-col cols="10"
             offset-md="1"
      >
        <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
      </b-col>
      <!--      -->
      <b-col cols="12" class="product-info">
        <b-container fluid>
          <b-row>
            <b-col
                   xl="12"
                   v-if="loadingStatus === 'success'"
            >
              <b-row v-if="PRODUCT">
                <b-col cols="12"
                       md="5"
                       lg="4"
                       class="mb-5"
                       v-if="PRODUCT.images.length"
                >

                  <client-only>
                    <vue-gallery :images="getImages" :index="index" @close="index = null"/>
                  </client-only>

                  <hooper group="productGallery" :wheelControl="false" class="gallery-main">
                    <slide v-for="(img, imageIndex) in PRODUCT.images" :key="imageIndex" :index="index">
                      <img v-if="img.url" :src="img.url" @error="img.url = null" :alt="img.label" class="product-img"
                           @click="index = imageIndex">
                      <img v-else src="@/assets/icons/diamond_grey.svg" width="100px" alt="no image available"
                           class="product-detail-img-none">
                    </slide>
                  </hooper>

                  <hooper group="productGallery" :settings="hooperGallerySettings" class="gallery-thumbs">
                    <slide v-for="(img, index) in PRODUCT.images" :key="index" :index="index">
                      <img v-if="img.thumbnail" :src="img.thumbnail" @error="img.thumbnail = null" :alt="img.label"
                           class="product-img">
                      <img v-else src="@/assets/icons/diamond_grey.svg" width="100px" alt="no image available"
                           class="product-detail-img-none">
                    </slide>
                    <hooper-navigation slot="hooper-addons" class="d-none d-md-block"></hooper-navigation>
                  </hooper>

                </b-col>

                <b-col cols="12" md="5" lg="4" class="mb-4" v-else>
                  <img
                      src="@/assets/icons/diamond_grey.svg"
                      width="100px"
                      alt="no image available"
                      class="product-img-none"
                  >
                </b-col>

                <b-col cols="12" md="7" lg="8">
                  <b-row>
                    <b-col cols="12" lg="9">
                      <b-badge v-if="PRODUCT.is_new == true" class="product-badge badge-new">новинка</b-badge>
                      <b-badge v-if="PRODUCT.special" class="product-badge badge-special">
                        <b-link :to="{ name: 'special-detail', params: {special_name: PRODUCT.special.slug } }">акция
                        </b-link>
                      </b-badge>
                      <p v-if="PRODUCT.brand" class="product-brand">{{ PRODUCT.brand }}</p>
                      <h1 class="text-upper">{{ PRODUCT.name }}</h1>
                      <div class="product-tag-list">
                        <b-badge v-for="tag in PRODUCT.tags" :key="tag.id" class="tag-badge"
                                 :to="`/search?tags=${tag.name}`">
                          {{ tag.name }}
                        </b-badge>
                      </div>
                      <p class="product-art">артикул: {{ PRODUCT.art }}</p>
                      <b-row class="d-block d-lg-none">
                        <b-col cols="12">
                          <p class="product-stock">
                            <b-badge v-if="Number(PRODUCT.in_stock) !== 0">в наличии</b-badge>
                            <b-badge v-else class="float-left">нет в наличии</b-badge>
                          </p>
                          <p class="icon-star-desc" v-if="!favorite" @click="addToFavorites(PRODUCT.id)">
                            <span class="icon icon-star"></span>добавить в избранное
                          </p>
                          <p class="icon-star-desc" v-else @click="removeFromFavorites(PRODUCT.id)">
                            <span class="icon icon-star active"></span>удалить из избранных
                          </p>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col cols="12" align-v="end" class="product-price-row text-left">
                          <div class="row product-price" v-if="Number(PRODUCT.in_stock) !== 0">
                            <b-col cols="12" md="7" class="mb-5 mb-md-0">
                              <div
                                  v-if="PRODUCT.special && PRODUCT.special.new_price"
                                  class="product-special-price-wrapper"
                              >
                                <p class="product-old-price">
                                  <font-awesome-icon icon="ruble-sign"/>
                                  {{ PRODUCT.price }}
                                </p>
                                <p class="product-special-price">
                                  <font-awesome-icon icon="ruble-sign"/>
                                  {{ PRODUCT.special.new_price }}
                                  <span class="product-base-unit" v-if="PRODUCT.special.threshold">
                                  от {{ PRODUCT.special.threshold }} {{ PRODUCT.units }}
                                </span>
                                </p>
                              </div>
                              <p v-else>
                                <font-awesome-icon icon="ruble-sign"/>
                                {{ PRODUCT.price }}
                              </p>
                              <p v-if="PRODUCT.wholesale_price"
                                 class="product-wholesale-price">
                                <font-awesome-icon icon="ruble-sign"/>
                                {{ PRODUCT.wholesale_price }}
                                <span class="product-wholesale-price-cond">от <span class="red">{{
                                    PRODUCT.wholesale_threshold
                                  }}</span> {{ PRODUCT.units }}</span></p>
                            </b-col>
                            <b-col cols="5">
                              <div v-if="!isAdded() && Number(PRODUCT.in_stock) !== 0" class="product-amount">
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
                                <span
                                    class="product-add"
                                    @click="addItem"
                                >
                                +
                              </span>
                              </div>
                            </b-col>
                            <b-col cols="7" md="12" class="mt-md-5">
                              <p v-if="!isAdded() && Number(PRODUCT.in_stock) !== 0" class="product-sum">
                                <font-awesome-icon icon="ruble-sign"/>
                                {{ itemSum() }}
                              </p>
                            </b-col>
                          </div>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col>
                          <b-button v-if="isAdded()" squared size="lg" class="btn btn-yellow float-right"
                                    :to="{ name: 'basket' }">
                            просмотр корзины
                          </b-button>
                          <b-button v-else-if="Number(PRODUCT.in_stock) === 0" squared size="lg"
                                    class="btn btn-yellow float-right" disabled>
                            ожидается поставка
                          </b-button>
                          <b-button v-else squared size="lg" class="btn btn-yellow float-right"
                                    @click="addToBasket(PRODUCT.id, productAmount)">
                            в корзину
                          </b-button>
                        </b-col>
                      </b-row>
                    </b-col>
                    <b-col cols="3" class="d-none d-lg-block">
                      <p class="icon-star-desc" v-if="!favorite" @click="addToFavorites(PRODUCT.id)">
                        <span class="icon icon-star"></span>добавить в избранное
                      </p>
                      <p class="icon-star-desc" v-else @click="removeFromFavorites(PRODUCT.id)">
                        <span class="icon icon-star active"></span>удалить из избранных
                      </p>
                      <p class="product-stock">
                        <b-badge v-if="Number(PRODUCT.in_stock) !== 0" class="float-left">в наличии</b-badge>
                        <b-badge v-else class="float-left">нет в наличии</b-badge>
                      </p>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
            <b-container fluid>
              <b-row v-if="loadingStatus === 'pending'" class="bottom-spaced">
                <b-col cols="12" class="text-center">
                  <b-spinner type="grow" class="m-3"></b-spinner>
                  <b-spinner type="grow" class="m-3"></b-spinner>
                  <b-spinner type="grow" class="m-3"></b-spinner>
                </b-col>
              </b-row>
            </b-container>
          </b-row>
        </b-container>
      </b-col>
      <b-col cols="12">
        <b-row>
          <b-col cols="12" xl="10" offset-xl="1">
            <b-row>
              <b-col cols="12" md="10" lg="8" offset-md="1" offset-lg="4">
                <div v-if="PRODUCT.description" class="product-desc">
                  <p class="product-desc-header">Описание</p>
                  <div v-html="PRODUCT.description"></div>
                </div>
                <div v-if="PRODUCT.properties.length" class="product-properties">
                  <p class="product-properties-header">Характеристики</p>
                  <p v-for="property in PRODUCT.properties" :key="property.id">
                    <span class="product-property-label">{{ property.name }}:</span>{{ property.value }}
                    {{ property.units }}</p>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12">
        <b-row>
          <b-col v-if="PRODUCT.recommended.length" cols="12" md="10" offset-md="1" class="recommended-blk">
            <div class="product-list">
              <p class="recommended-header">Также рекомендуем:</p>
              <hooper :settings="hooperSettings">
                <slide v-for="(product, index) in PRODUCT.recommended" :key="index" :index="index">
                  <ProductCard :key="product.id" :productData="product"/>
                </slide>
                <hooper-navigation v-if="PRODUCT.recommended.length > 4" slot="hooper-addons"></hooper-navigation>
              </hooper>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <page-not-found v-if="!PRODUCT"></page-not-found>
  </div>
</template>

<script>
import 'hooper/dist/hooper.css'
import {Hooper, Slide, Navigation as HooperNavigation} from 'hooper'
import {mapActions, mapGetters} from 'vuex'
// import ProductCard from '../../components/k-product-card.vue'
const ProductCard = () => import('../../components/k-product-card.vue');
// import PageNotFound from '../../views/k-page-not-found.vue'
const PageNotFound = () => import('../../views/k-page-not-found.vue');
// import { preloader } from '../../preloader'

export default {
  name: 'k-product-detail',
  metaInfo() {
    return {
      title: this.PRODUCT ? this.PRODUCT.meta_title : '',
      meta: [
        {vmid: 'description', name: 'description', content: this.PRODUCT ? this.PRODUCT.meta_description : ''},
        {vmid: 'keywords', name: 'keywords', content: this.PRODUCT ? this.PRODUCT.meta_keywords : ''}
      ]
    }
  },
  components: {
    Hooper,
    Slide,
    HooperNavigation,
    ProductCard,
    PageNotFound
  },
  props: ['category_slug', 'product_name'],
  data() {
    return {
      amount: null,
      breadcrumbs: null,
      hooperSettings: {
        wheelControl: false,
        infiniteScroll: false,
        itemsToShow: 1,
        breakpoints: {
          600: {
            itemsToShow: 2
          },
          1000: {
            itemsToShow: 3
          },
          1200: {
            itemsToShow: 4
          },
          2000: {
            itemsToShow: 5
          },
          2400: {
            itemsToShow: 6
          }
        }
      },
      hooperGallerySettings: {
        itemsToShow: 3,
        centerMode: true,
        wheelControl: false
      },
      index: null,
      loadingStatus: 'pending',
      zoomerOptions: {
        zoomFactor: 1,
        hoverDelay: 300,
        scroll_items: 3,
        choosed_thumb_border_color: '#dd2c00',
        scroller_position: 'bottom',
        zoomer_pane_position: 'right'
      }
    }
  },
  computed: {
    ...mapGetters([
      'BASKET_PRODUCTS_IDS',
      'CATEGORY',
      'FAVORITE_PRODUCT',
      'PRODUCT'
    ]),
    countedDecimals() {
      return this.countDecimals(Number(this.PRODUCT.base_amount))
    },
    favorite() {
      return this.FAVORITE_PRODUCT(this.PRODUCT.id)
    },
    getImages() {
      return this.PRODUCT.images.map(img => img.url)
    },
    productAmount: {
      get() {
        return this.amount ? this.amount : Number(this.PRODUCT.base_amount).toFixed(this.countDecimals(Number(this.PRODUCT.base_amount)))
      },
      set(value) {
        this.amount = value
      }
    },
    productBase() {
      return Number(this.PRODUCT.base_amount).toFixed(this.countDecimals(Number(this.PRODUCT.base_amount)))
    }
  },
  methods: {
    ...mapActions([
      'ADD_TO_BASKET',
      'ADD_TO_FAVORITES',
      'GET_PRODUCT_FROM_API',
      'REMOVE_FROM_FAVORITES'
    ]),
    addItem: function () {
      this.productAmount = (Number(this.productAmount) + Number(this.PRODUCT.base_amount)).toFixed(this.countedDecimals)
    },
    addToBasket(id, amount) {
      if (Number(amount) > Number(this.PRODUCT.in_stock)) {
        this.$bvModal.show('modal-amount-error')
      } else {
        var price = this.getPrice()
        var data = {id: id, amount: Number(amount), price: price}
        this.ADD_TO_BASKET(data)
      }
    },
    addToFavorites(id) {
      this.ADD_TO_FAVORITES(id)
    },
    countDecimals: function (value) {
      if (Math.floor(value) === value) return 0
      var afterDot = value.toString().split('.')[1].replace(/\.0+$/, '')
      if (afterDot !== '') return 2
      return value.toString().split('.')[1].length || 0
    },
    getBreadcrumbs() {
      if (this.PRODUCT) {
        var breadcrumbs = [{text: 'Главная', to: {name: 'home'}}, {text: 'Каталог', to: {name: 'catalog'}}]
        var pathTo = [{text: this.PRODUCT.name, active: true}]
        if (this.PRODUCT.categories) {
          var currentCategory = this.PRODUCT.categories
          pathTo.push({
            text: currentCategory.name,
            to: {name: 'category-products', params: {category_name: currentCategory.slug}}
          })
          while (currentCategory.parent !== null) {
            pathTo.push({
              text: currentCategory.parent.name,
              to: {name: 'categories', params: {category_name: currentCategory.parent.slug}}
            })
            currentCategory = currentCategory.parent
          }
        }
        return breadcrumbs.concat(pathTo.reverse())
      }
    },
    getPrice() {
      var product = this.PRODUCT
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
          } else {
            price = product.wholesale_price
          }
        }
      }
      return price
    },
    isAdded() {
      const isAdded = this.BASKET_PRODUCTS_IDS.includes(this.PRODUCT.id)
      return isAdded
    },
    itemSum() {
      var price = this.getPrice()
      var result = Number(price) * ((Number(this.productAmount) / (this.PRODUCT.base_amount ? this.PRODUCT.base_amount : 1)))
      return result.toFixed(2)
    },
    removeFromFavorites(id) {
      this.REMOVE_FROM_FAVORITES(id)
    },
    removeItem: function () {
      if (this.productAmount > this.PRODUCT.base_amount) {
        this.productAmount = (Number(this.productAmount) - Number(this.PRODUCT.base_amount)).toFixed(this.countedDecimals)
      }
    },
    loadData() {
      if (this.category_slug) {
        var data = {categorySlug: this.category_slug, name: this.product_name}
      } else {
        data = {categorySlug: this.CATEGORY ? this.CATEGORY.slug : undefined, name: this.product_name}
      }
      return this.GET_PRODUCT_FROM_API(data)
          .then((res) => {
            if (res.data) {
              this.loadingStatus = 'success'
              this.breadcrumbs = this.getBreadcrumbs()
              return true
            }
          })
          .catch(() => {
            this.loadingStatus = 'error'
            return false
          })
    }
  },
  async serverPrefetch() {
    await this.loadData()
    // preloader.add(this.loadingStatus, 'detailLoadingStatus')
    // preloader.add(this.breadcrumbs, 'detailBreadcrumbs')
    return true
  },
  created() {
    this.loadingStatus = this.$preloaded.detailLoadingStatus
    this.breadcrumbs = this.$preloaded.detailBreadcrumbs
  },
  mounted() {
    if (this.loadingStatus !== 'success') {
      this.loadData()
    }
  },
  watch: {
    $route() {
      this.loadingStatus = 'pending'
      if (this.category_slug) {
        var data = {categorySlug: this.category_slug, name: this.product_name}
      } else {
        data = {categorySlug: this.CATEGORY ? this.CATEGORY.slug : undefined, name: this.product_name}
      }
      this.GET_PRODUCT_FROM_API(data)
          .then((res) => {
            if (res.data) {
              this.breadcrumbs = this.getBreadcrumbs()
              this.loadingStatus = 'success'
            }
          })
          .catch(() => {
            this.loadingStatus = 'error'
          })
    }
  }
}
</script>

<style lang="scss">
.product-info .product-price-row .product-price {
  margin-bottom: 30px;
}

.product-price-row .product-price .product-amount .form-input {
  display: inline-block;
  font-size: 16px;
  color: #000;
  font-family: 'Open Sans', sans-serif;
  width: 35px;
  height: 30px;
  margin: 0 5px;
  padding: 0 2px;
  text-align: center;
  border: none;
  border-bottom: 1px solid #333;
  border-radius: 0;
  background-color: #f1f1f1;
}

.image {
  float: left;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: 1px solid #ebebeb;
  margin: 5px;
}
</style>
