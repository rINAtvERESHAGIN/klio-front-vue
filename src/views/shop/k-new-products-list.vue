<template>
  <b-row class="content-section">
    <b-col cols="12" xl="10" offset-xl="1" v-if="loadingStatus === 'success'">
      <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
      <h1>Новинки</h1>
      <b-container fluid>
        <ProductListComponent :categoryData="null" :responseData="NEW_PRODUCTS" :categoryList="showFilters"/>
        <div class="bottom-spaced"></div>
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
// import { preloader } from '../../preloader'

export default {
  name: 'k-new-product-list',
  metaInfo () {
    return {
      title: 'Новинки',
      meta: [
        { vmid: 'description', name: 'description', content: 'Все новинки представленные в нашем интернет магазине на данный момент' },
        { vmid: 'keywords', name: 'keywords', content: 'новинки, новинки клио, новые поступления, актуальные поступления, актуальные новинки' }
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
        this.GET_NEW_PRODUCTS_FROM_API({ params: this.getParams() })
      } else {
        this.loadFullData()
      }
    }
  },
  computed: {
    ...mapGetters([
      'NEW_FILTERS',
      'NEW_PRODUCTS'
    ])
  },
  methods: {
    ...mapActions([
      'GET_NEW_FILTERS_FROM_API',
      'GET_NEW_PRODUCTS_FROM_API'
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
        { text: 'Новинки', to: { name: 'new-products' } }
      ]
    },
    loadFullData () {
      this.loadingStatus = 'pending'
      this.GET_NEW_FILTERS_FROM_API()
      return this.GET_NEW_PRODUCTS_FROM_API({ params: this.getParams() })
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
    }
  },
  async serverPrefetch () {
    await this.loadFullData()
    // preloader.add(this.loadingStatus, 'newLoadingStatus')
    // preloader.add(this.breadcrumbs, 'newBreadcrumbs')
    return true
  },
  created () {
    this.loadingStatus = this.$preloaded.newLoadingStatus
    this.breadcrumbs = this.$preloaded.newBreadcrumbs
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
