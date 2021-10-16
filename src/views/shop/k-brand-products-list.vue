<template>
  <b-row class="content-section" v-if="BRAND">
    <b-col cols="12" xl="10" offset-xl="1" v-if="loadingStatus === 'success'">
      <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
      <h1>{{ BRAND.name }}</h1>
      <b-container fluid>
        <ProductListComponent :categoryData="BRAND" :responseData="BRAND_PRODUCTS" :filtersData="BRAND_FILTERS" :categoryList="showFilters"/>
        <div class="bottom-spaced"></div>
        <b-row class="category-products-desc">
          <b-col cols="12" v-html="BRAND.description"></b-col>
        </b-row>
      </b-container>
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
    <b-col cols="12" id="back-to-top">
          <a href="#" class="btn" role="button" onClick="window.scrollTo({top: 1000, behavior: 'smooth'})">
            <img src="@/assets/icons/ring-svgrepo-com.svg" width="80px" alt="" v-scroll-to="'body'">
<!--            <p>наверх</p>-->
          </a>
        </b-col>
  </b-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProductListComponent from '../../components/k-product-list-component.vue'
import { preloader } from '../../preloader'

export default {
  name: 'k-product-list',
  metaInfo () {
    return {
      title: this.BRAND ? this.BRAND.name : '',
      meta: [
        { vmid: 'description', name: 'description', content: this.BRAND ? this.BRAND.meta_description : '' },
        { vmid: 'keywords', name: 'keywords', content: this.BRAND ? this.BRAND.meta_keywords : '' }
      ]
    }
  },
  components: {
    ProductListComponent
  },
  props: ['brand_name'],
  data () {
    return {
      breadcrumbs: null,
      loadingStatus: 'pending',
      showFilters: false
    }
  },
  watch: {
    $route (to, from) {
      if (to.path === from.path) {
        var data = { brand: this.brand_name, params: this.getParams() }
        this.GET_BRAND_PRODUCTS_FROM_API(data)
      } else {
        this.loadFullData()
      }
    }
  },
  computed: {
    ...mapGetters([
      'BRAND',
      'BRAND_FILTERS',
      'BRAND_PRODUCTS'
    ])
  },
  methods: {
    ...mapActions([
      'GET_BRAND_FROM_API',
      'GET_BRAND_FILTERS_FROM_API',
      'GET_BRAND_PRODUCTS_FROM_API'
    ]),
    getParams () {
      var params = ''
      for (var param in this.$route.query) { params = params + `&${param}=${this.$route.query[param]}` }
      if (params) { params = '?' + params.substring(1) }
      return params
    },
    getBreadcrumbs () {
      return [
        { text: 'Главная', to: { name: 'home' } },
        { text: this.BRAND.name, to: { name: 'brand-products', params: { brand_name: this.BRAND.slug } } }
      ]
    },
    loadFullData () {
      return this.GET_BRAND_FROM_API(this.brand_name)
        .then((res) => {
          if (res.data) {
            this.GET_BRAND_FILTERS_FROM_API(this.brand_name)
            var data = { brand: this.brand_name, params: this.getParams() }
            return this.GET_BRAND_PRODUCTS_FROM_API(data)
              .then((res) => {
                if (res.data) {
                  this.loadingStatus = 'success'
                }
                this.breadcrumbs = this.getBreadcrumbs()
                return true
              })
              .catch(() => {
                this.loadingStatus = 'error'
                return false
              })
          } else {
            this.loadingStatus = 'error'
            return false
          }
        })
        .catch(() => {
          this.loadingStatus = 'error'
          return false
        })
    }
  },
  async serverPrefetch () {
    await this.loadFullData()
    preloader.add(this.loadingStatus, 'brandLoadingStatus')
    preloader.add(this.breadcrumbs, 'brandBreadcrumbs')
    return true
  },
  created () {
    this.loadingStatus = this.$preloaded.brandLoadingStatus
    this.breadcrumbs = this.$preloaded.brandBreadcrumbs
  },
  mounted () {
    if (this.loadingStatus !== 'success') {
      this.loadFullData()
    }
  }
}
</script>

<style>

</style>
