<template>
  <div>
    <b-row class="content-section" v-if="CATEGORY">
      <b-col cols="12" xl="10" offset-xl="1" v-if="loadingStatus === 'success'">
        <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
        <h1>{{ CATEGORY.name }}</h1>
        <b-container fluid>
          <ProductListComponent :categoryData="CATEGORY" :responseData="CATEGORY_PRODUCTS" :filtersData="CATEGORY_FILTERS" :categoryList="showFilters" />
          <div class="bottom-spaced"></div>
          <b-row class="category-products-desc">
            <b-col cols="12" v-html="CATEGORY.description"></b-col>
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
    <b-container fluid>
      <b-row v-if="loadingStatus === 'error'" class="bottom-spaced">
        <b-col cols="12" class="text-center">
          <br>
          <page-not-found></page-not-found>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProductListComponent from '../../components/k-product-list-component.vue'
// import { preloader } from '../../preloader'
import PageNotFound from '../../views/k-page-not-found.vue'

export default {
  name: 'k-product-list',
  metaInfo () {
    return {
      title: this.CATEGORY ? this.CATEGORY.meta_title : '',
      meta: [
        { vmid: 'description', name: 'description', content: this.CATEGORY ? this.CATEGORY.meta_description : '' },
        { vmid: 'keywords', name: 'keywords', content: this.CATEGORY ? this.CATEGORY.meta_keywords : '' }
      ]
    }
  },
  components: {
    ProductListComponent,
    PageNotFound
  },
  props: ['category_name'],
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
        var data = { category: this.category_name, params: this.getParams() }
        this.GET_CATEGORY_PRODUCTS_FROM_API(data)
      } else {
        this.loadingStatus = 'pending'
        this.GET_CATEGORY_FROM_API(this.category_name)
          .then((res) => {
            if (res.data) {
              this.GET_CATEGORY_FILTERS_FROM_API(this.category_name)
              var data = { category: this.category_name, params: this.getParams() }
              this.GET_CATEGORY_PRODUCTS_FROM_API(data)
                .then((res) => {
                  if (res.data) {
                    this.loadingStatus = 'success'
                  }
                })
                .catch(() => {
                  this.loadingStatus = 'error'
                })
            }
            this.breadcrumbs = this.getBreadcrumbs()
          })
          .catch(() => {
            this.loadingStatus = 'error'
          })
      }
    }
  },
  computed: {
    ...mapGetters([
      'CATEGORY',
      'CATEGORY_FILTERS',
      'CATEGORY_PRODUCTS'
    ])
  },
  methods: {
    ...mapActions([
      'GET_CATEGORY_FROM_API',
      'GET_CATEGORY_FILTERS_FROM_API',
      'GET_CATEGORY_PRODUCTS_FROM_API'
    ]),
    getParams () {
      var params = ''
      for (var param in this.$route.query) {
        params = params + `&${param}=${this.$route.query[param]}`
      }
      if (params) {
        params = '?' + params.substring(1)
      }
      return params
    },
    getBreadcrumbs () {
      var breadcrumbs = [{ text: 'Главная', to: { name: 'home' } }, { text: 'Каталог', to: { name: 'catalog' } }]
      var currentCategory = this.CATEGORY
      var pathTo = [{
        text: currentCategory.name,
        to: { name: 'categories', params: { category_name: currentCategory.slug } }
      }]
      while (currentCategory.parent !== null) {
        pathTo.push({
          text: currentCategory.parent.name,
          to: { name: 'categories', params: { category_name: currentCategory.parent.slug } }
        })
        currentCategory = currentCategory.parent
      }
      return breadcrumbs.concat(pathTo.reverse())
    },
    loadData () {
      return this.GET_CATEGORY_FROM_API(this.category_name)
        .then((res) => {
          if (res.data) {
            this.GET_CATEGORY_FILTERS_FROM_API(this.category_name)
            var data = { category: this.category_name, params: this.getParams() }
            return this.GET_CATEGORY_PRODUCTS_FROM_API(data)
              .then((res) => {
                if (res.data) this.loadingStatus = 'success'
                this.breadcrumbs = this.getBreadcrumbs()
                return true
              })
              .catch(() => {
                this.loadingStatus = 'error'
                this.breadcrumbs = this.getBreadcrumbs()
                return true
              })
          }
        })
        .catch(() => {
          this.loadingStatus = 'error'
          return false
        })
    }
  },
  async serverPrefetch () {
    await this.loadData()
    // preloader.add(this.loadingStatus, 'prodLoadingStatus')
    // preloader.add(this.breadcrumbs, 'prodBreadcrumbs')
    return true
  },
  created () {
    this.loadingStatus = this.$preloaded.prodLoadingStatus
    this.breadcrumbs = this.$preloaded.prodBreadcrumbs
  },
  mounted () {
    if (this.loadingStatus !== 'success') {
      this.loadData()
    }
  }
}
</script>
