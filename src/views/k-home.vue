<template>
  <div id="k-home-container">
    <b-row>
      <!--      desktop-->
      <b-col xl="12"
             lg="12"
             md="0"
             sm="0"
             xs="0"
             class="d-none d-lg-block d-xl-block"
             v-if="LOADING_BANNERS === 'success'"
      >
        <b-carousel id="carousel-main"
                    :interval="4000"
                    controls
                    indicators
                    background="#ababab"
                    img-width="1256"
                    img-height="480"
                    style="text-shadow: 1px 1px 2px #333;"
        >
          <BannerItem v-for="banner in BANNERS"
                      :key="banner.id"
                      :bannerData="banner"
          />
        </b-carousel>
      </b-col>
      <!--      mobile-->
      <b-col xl="0"
             lg="0"
             md="0"
             sm="12"
             xs="12"
             class="d-block d-sm-block d-md-block d-lg-none d-xl-none"
             v-if="LOADING_BANNERS === 'success'"
      >
        <b-carousel id="carousel-main-mobile"
                    :interval="4000"
                    controls
                    indicators
                    background="#ababab"
                    img-width="332"
                    img-height="550"
                    style="text-shadow: 1px 1px 2px #333;"
                    v-if="LOADING_BANNERS === 'success'"
        >
          <BannerItemMobile v-for="banner in BANNERS"
                            :key="banner.id"
                            :bannerData="banner"
          />
        </b-carousel>
      </b-col>

      <b-col cols="12" class="text-center" v-else-if="LOADING_BANNERS === 'pending'">
        <b-spinner type="grow" class="m-3"></b-spinner>
        <b-spinner type="grow" class="m-3"></b-spinner>
        <b-spinner type="grow" class="m-3"></b-spinner>
      </b-col>
    </b-row>

    <b-row>
      <!--             Visible only on xl-->
      <b-col id="leftbar"
             v-if="LEFT_MENU !== false"
             xl="3"
             class="d-none d-xl-block"
      >
        <ul v-if="LEFT_MENU">
          <CategoryMenuItem v-for="category in LEFT_MENU.items" :key="category.id" :categoryData="category"/>
        </ul>
      </b-col>

      <b-col id="content-area"
             :xl="LEFT_MENU === false ? 12 : 9"
             lg="9"
             md="9"
             sm="12"
             xs="12"
      >
        <b-col cols="12" v-if="LOADING_CATEGORIES_MAIN === 'success'">
          <b-row align-h="between" class="popular-categories">
            <b-col cols="12" md="6" v-for="(category, index) in CATEGORIES_MAIN" :key="category.id">
              <CategoryCard :categoryData="category" :colorData="[(index + 1) % 2 === 0 ? 'red': 'yellow']"/>
            </b-col>
          </b-row>
        </b-col>

        <b-col cols="12" class="text-center" v-else-if="LOADING_CATEGORIES_MAIN === 'pending'">
          <b-spinner type="grow" class="m-3"></b-spinner>
          <b-spinner type="grow" class="m-3"></b-spinner>
          <b-spinner type="grow" class="m-3"></b-spinner>
        </b-col>

        <div class="blk-width-85 product-list" id="specials">
          <h1 class="text-upper">
            <b-link class="main-page-link" :to="{ name: 'specials'}">Акции</b-link>
          </h1>

          <client-only>
            <div slot="placeholder">
              <hidden>
                <div v-for="(product, index) in PRODUCTS_SPECIAL_MAIN" :key="index" :index="index">
                  <ProductCard :key="product.id" :productData="product"/>
                </div>
              </hidden>
            </div>

            <hooper :settings="hooperSettings" v-if="LOADING_PRODUCTS_SPECIAL_MAIN === 'success'">
              <slide v-for="(product, index) in PRODUCTS_SPECIAL_MAIN" :key="index" :index="index">
                <ProductCard :key="product.id" :productData="product"/>
              </slide>
              <hooper-navigation slot="hooper-addons"></hooper-navigation>
            </hooper>
            <b-col cols="12" class="text-center" v-else-if="LOADING_PRODUCTS_SPECIAL_MAIN === 'pending'">
              <b-spinner type="grow" class="m-3"></b-spinner>
              <b-spinner type="grow" class="m-3"></b-spinner>
              <b-spinner type="grow" class="m-3"></b-spinner>
            </b-col>
            <p v-else-if="LOADING_PRODUCTS_SPECIAL_MAIN === 'empty'" style="margin: 30px 0 60px 0">К сожалению, в
              настоящий момент данный раздел пуст.</p>
          </client-only>
        </div>

        <div class="blk-width-85 subscribe-blk">
          <b-row>
            <b-col cols="12" md="4" class="pl-3">
              <span>Подпишитесь на рассылку новостей и выгодных предложений от Клио!</span>
            </b-col>
            <b-col cols="12" md="8">
              <b-form @submit.prevent="subscribe" method="POST">
                <b-input-group size="lg">
                  <b-form-input v-model="subscriptionEmail" placeholder="e-mail" class="form-input"></b-form-input>
                  <b-input-group-append>
                    <b-button size="md" text="Найти" type="submit" class="btn btn-red d-none d-md-block">
                      Подписаться
                    </b-button>
                  </b-input-group-append>
                </b-input-group>
                <b-button squared
                          size="md"
                          text="Найти"
                          type="submit"
                          class="btn btn-red btn-block d-md-none mt-2"
                          style="margin-left: 0"
                >
                  Подписаться
                </b-button>
              </b-form>
              <p class="form-error home-subscribe-error" v-if="err && err.email">{{ err.email[0] }}</p>
            </b-col>
          </b-row>
        </div>

        <div class="blk-width-85 product-list" id="new-products">
          <h1 class="text-upper">
            <b-link class="main-page-link" :to="{ name: 'new-products'}">Новинки</b-link>
          </h1>

          <client-only>
            <div slot="placeholder">
              <hidden>
                <div v-for="(product, index) in PRODUCTS_SPECIAL_MAIN" :key="index" :index="index">
                  <ProductCard :key="product.id" :productData="product"/>
                </div>
              </hidden>
            </div>

            <hooper :settings="hooperSettings" v-if="LOADING_PRODUCTS_NEW_MAIN === 'success'">
              <slide v-for="(product, index) in PRODUCTS_NEW_MAIN" :key="index" :index="index">
                <ProductCard :key="product.id" :productData="product"/>
              </slide>
              <hooper-navigation slot="hooper-addons"></hooper-navigation>
            </hooper>
            <b-col cols="12" class="text-center" v-else-if="LOADING_PRODUCTS_NEW_MAIN === 'pending'">
              <b-spinner type="grow" class="m-3"></b-spinner>
              <b-spinner type="grow" class="m-3"></b-spinner>
              <b-spinner type="grow" class="m-3"></b-spinner>
            </b-col>
            <p v-else-if="LOADING_PRODUCTS_NEW_MAIN === 'empty'" style="margin: 30px 0 60px 0">К сожалению, в настоящий
              момент данный раздел пуст.</p>
          </client-only>
        </div>

        <div class="blk-width-85 brand-list" id="brands">
          <h1 class="text-upper">Бренды</h1>

          <client-only>
            <div slot="placeholder">
              <hidden>
                <div v-for="(product, index) in PRODUCTS_SPECIAL_MAIN" :key="index" :index="index">
                  <ProductCard :key="product.id" :productData="product"/>
                </div>
              </hidden>
            </div>

            <hooper :infiniteScroll="true" :wheelControl="false" :settings="hooperSettings"
                    v-if="LOADING_BRANDS === 'success'">
              <slide v-for="(brand, index) in BRANDS" :key="index" :index="index">
                <BrandCard :key="brand.id" :brandData="brand"/>
              </slide>
              <hooper-navigation slot="hooper-addons"></hooper-navigation>
            </hooper>
            <b-col cols="12" class="text-center" v-else-if="LOADING_BRANDS === 'pending'">
              <b-spinner type="grow" class="m-3"></b-spinner>
              <b-spinner type="grow" class="m-3"></b-spinner>
              <b-spinner type="grow" class="m-3"></b-spinner>
            </b-col>
            <p v-else-if="LOADING_BRANDS === 'empty'" style="margin: 30px 0 60px 0">К сожалению, в настоящий момент
              данный раздел пуст.</p>
          </client-only>
        </div>

        <b-col cols="12" id="back-to-top">
          <a href="#" class="btn" role="button" onClick="window.scrollTo({top: 1000, behavior: 'smooth'})">
            <img src="@/assets/icons/ring-svgrepo-com.svg" width="80px" alt="" v-scroll-to="'body'">
            <!--            <p>наверх</p>-->
          </a>
        </b-col>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper'
import { email, required } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'
import 'hooper/dist/hooper.css'

import BannerItem from '../components/k-banner-item.vue'
import BrandCard from '../components/k-brand-card.vue'
import CategoryCard from '../components/k-category-card.vue'
import CategoryMenuItem from '../components/k-category-menu-item.vue'
import ProductCard from '../components/k-product-card.vue'
import Hidden from '../components/k-hidden.vue'
import BannerItemMobile from '@/components/BannerItemMobile'

export default {
  name: 'k-home',
  components: {
    Hooper,
    Slide,
    HooperNavigation,
    BannerItem,
    BrandCard,
    CategoryCard,
    CategoryMenuItem,
    ProductCard,
    Hidden,
    BannerItemMobile
  },
  data () {
    return {
      err: null,
      hooperSettings: {
        wheelControl: false,
        infiniteScroll: true,
        itemsToShow: 1,
        breakpoints: {
          600: {
            itemsToShow: 2
          },
          1000: {
            itemsToShow: 3
          },
          1300: {
            itemsToShow: 3
          }
          // 1290: {
          //   itemsToShow: 4
          // },
          // 2000: {
          //   itemsToShow: 5
          // },
          // 2400: {
          //   itemsToShow: 6
          // }
        }
      },
      subscriptionEmail: null
    }
  },
  computed: {
    ...mapGetters([
      'BANNERS',
      'LOADING_BANNERS',
      'BRANDS',
      'LOADING_BRANDS',
      'CATEGORIES_MAIN',
      'LOADING_CATEGORIES_MAIN',
      'LEFT_MENU',
      'PRODUCTS_NEW_MAIN',
      'LOADING_PRODUCTS_NEW_MAIN',
      'PRODUCTS_SPECIAL_MAIN',
      'LOADING_PRODUCTS_SPECIAL_MAIN',
    ])
  },
  methods: {
    ...mapActions([
      'CREATE_SUBSCRIPTION',
      'GET_BANNERS_FROM_API',
      'GET_BRANDS_FROM_API',
      'GET_CATEGORIES_FOR_MAIN_FROM_API',
      'GET_NEW_PRODUCTS_FOR_MAIN_FROM_API',
      'GET_SPECIAL_PRODUCTS_FOR_MAIN_FROM_API'
    ]),
    subscribe () {
      var subscriptionData = {
        email: this.subscriptionEmail
      }
      this.CREATE_SUBSCRIPTION(subscriptionData)
        .then((res) => {
          if (res.status === 200) {
            this.err = null
            this.$bvModal.show('modal-subscribe')
          } else {
            this.err = res.response.data
          }
        })
    }
  },
  serverPrefetch () {
    return Promise.all([
      this.GET_BANNERS_FROM_API(),
      this.GET_BRANDS_FROM_API(),
      this.GET_CATEGORIES_FOR_MAIN_FROM_API(),
      this.GET_NEW_PRODUCTS_FOR_MAIN_FROM_API(),
      this.GET_SPECIAL_PRODUCTS_FOR_MAIN_FROM_API(),
    ])
  },
  mounted () {
    if (this.LOADING_BANNERS !== 'success') this.GET_BANNERS_FROM_API()
    if (this.LOADING_BRANDS !== 'success') this.GET_BRANDS_FROM_API()
    if (this.LOADING_CATEGORIES_MAIN !== 'success') this.GET_CATEGORIES_FOR_MAIN_FROM_API()
    if (this.LOADING_PRODUCTS_NEW_MAIN !== 'success') this.GET_NEW_PRODUCTS_FOR_MAIN_FROM_API()
    if (this.LOADING_PRODUCTS_SPECIAL_MAIN !== 'success') this.GET_SPECIAL_PRODUCTS_FOR_MAIN_FROM_API()
  },
  validations: {
    subscription: {
      email,
      required
    }
  }
}
</script>

<style lang="scss" scoped>

.home-subscribe-error {
  margin: 10px 0 0 0;
  right: 25%;
}
</style>
