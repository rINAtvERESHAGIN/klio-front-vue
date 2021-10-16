<template>
  <div>
    <b-row v-if="CATEGORY.children.length" class="content-section">
      <b-col v-if="loadingStatus === 'success'" cols="12" lg="10" offset-lg="1">
        <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
        <!--        заголовок для desktop-->
        <h1 class="d-none d-lg-block d-xl-block">{{ CATEGORY.name }}</h1>
        <!--заголовок для mobile-->
        <h2 class="d-block d-sm-block d-md-block d-lg-none d-xl-none">{{ CATEGORY.name }}</h2>

        <b-container fluid>
          <ProductListComponent v-if="showFilters" :categoryData="CATEGORY" :responseData="CATEGORY_PRODUCTS"
                                :filtersData="CATEGORY_FILTERS"
                                :categoryList="showFilters" class="bottom-spaced"/>
          <b-row class="bottom-spaced">
            <b-col cols="12" md="6" lg="4" v-for="(subcategory, index) in CATEGORY.children" :key="subcategory.id">
              <CategoryCard :categoryData="subcategory" :colorData="[(index + 1) % 2 === 0 ? 'red': 'yellow']"/>
            </b-col>
          </b-row>
          <b-row>
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
      <b-container fluid>
        <b-row v-if="loadingStatus === 'error'" class="bottom-spaced">
          <b-col cols="12" class="text-center">
            <br>
            <page-not-found></page-not-found>
          </b-col>
        </b-row>
      </b-container>
      <b-col cols="12" id="back-to-top" v-if="loadingStatus !== 'error'">
        <a href="#" class="btn float-right" role="button" onClick="window.scrollTo({top: 1000, behavior: 'smooth'})">
          <img src="@/assets/icons/ring-svgrepo-com.svg" width="80px" alt="" v-scroll-to="'body'">
          <p>наверх</p>
        </a>
      </b-col>
    </b-row>
    <b-container fluid v-if="!CATEGORY.children.length && loadingStatus === 'success'">
      <b-row class="bottom-spaced">
        <b-col cols="12" class="text-center">
          <!--          <h1>loadingStatus : {{ loadingStatus }}</h1>-->
          <br>
          <page-not-found></page-not-found>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CategoryCard from '../../components/k-category-card.vue'
import ProductListComponent from '../../components/k-product-list-component.vue'
// import { preloader } from '../../preloader'
import PageNotFound from '../../views/k-page-not-found.vue'

export default {
  name: 'k-category-list',
  metaInfo () {
    return {
      title: this.CATEGORY ? this.CATEGORY.meta_title : '',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: this.CATEGORY ? this.CATEGORY.meta_description : ''
        },
        {
          vmid: 'keywords',
          name: 'keywords',
          content: this.CATEGORY ? this.CATEGORY.meta_keywords : ''
        }
      ]
    }
  },
  components: {
    CategoryCard,
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
  computed: {
    ...mapGetters([
      'CATEGORY',
      'CATEGORY_FILTERS',
      'CATEGORY_PRODUCTS'
    ])
  },
  methods: {
    ...mapActions([
      'GET_CATEGORY_FILTERS_FROM_API',
      'GET_CATEGORY_FROM_API',
      'GET_CATEGORY_PRODUCTS_FROM_API',
      'SET_CATEGORY_PRODUCTS',
      'DETERMINE_PAGE_NOT_FOUND'
    ]),
    getBreadcrumbs () {
      var breadcrumbs = [{
        text: 'Главная',
        to: { name: 'home' }
      }, {
        text: 'Каталог',
        to: { name: 'catalog' }
      }]
      var currentCategory = this.CATEGORY
      var pathTo = [{
        text: currentCategory.name,
        to: {
          name: 'categories',
          params: { category_name: currentCategory.slug }
        }
      }]
      while (currentCategory.parent !== null) {
        pathTo.push({
          text: currentCategory.parent.name,
          to: {
            name: 'categories',
            params: { category_name: currentCategory.parent.slug }
          }
        })
        currentCategory = currentCategory.parent
      }
      return breadcrumbs.concat(pathTo.reverse())
    },
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
    loadData () {
      return this.GET_CATEGORY_FROM_API(this.category_name)
        .then((res) => {
          this.loadingStatus = 'pending'
          if (res.data) {
            this.loadingStatus = 'success'
            if (res.data.with_filters === true) {
              this.GET_CATEGORY_FILTERS_FROM_API(this.category_name)
                .then((res) => {
                  this.showFilters = true
                  for (var i in res.data) {
                    var filter = res.data[i]
                    var filterValue = this.$route.query[`${filter.slug}_${filter.type[0]}`]
                    if (filterValue instanceof Array) {
                      filter.value = filterValue
                    } else {
                      filter.value = filterValue ? [filterValue] : null
                    }
                  }
                })
              var data = null
              if (this.getParams()) {
                data = {
                  category: this.category_name,
                  params: this.getParams()
                }
              } else {
                data = {
                  category: null,
                  params: this.getParams()
                }
              }
              this.GET_CATEGORY_PRODUCTS_FROM_API(data)
            } else {
              this.showFilters = false
            }
            this.breadcrumbs = this.getBreadcrumbs()
          }
          if (!this.CATEGORY.children.length) {
            this.DETERMINE_PAGE_NOT_FOUND()
          }
          return true
        })
        .catch(() => {
          this.loadingStatus = 'error'
          this.$store.commit('SET_PAGE_NOT_FOUND')
          return false
        })
    }
  },
  async serverPrefetch () {
    await this.loadData()
    // preloader.add(this.loadingStatus, 'catLoadingStatus')
    // preloader.add(this.breadcrumbs, 'catBreadcrumbs')
    // preloader.add(this.showFilters, 'showFilters')
    return true
  },
  created () {
    this.loadingStatus = this.$preloaded.catLoadingStatus
    this.breadcrumbs = this.$preloaded.catBreadcrumbs
    this.showFilters = this.$preloaded.showFilters
  },
  mounted () {
    if (this.loadingStatus !== 'success') {
      this.loadData()
    }
  },
  watch: {
    $route (to, from) {
      this.loadingStatus = 'pending'
      if (to.path === from.path) {
        var data = {
          category: this.category_name,
          params: this.getParams()
        }
        this.GET_CATEGORY_PRODUCTS_FROM_API(data)
      } else {
        this.loadingStatus = 'pending'
        this.GET_CATEGORY_FROM_API(this.category_name)
          .then((res) => {
            if (res.data) {
              this.loadingStatus = 'success'
              if (res.data.with_filters === true) {
                this.GET_CATEGORY_FILTERS_FROM_API(this.category_name)
                  .then(() => {
                    this.showFilters = true
                  })
              } else {
                this.showFilters = false
              }
            }
            this.breadcrumbs = this.getBreadcrumbs()
          })
          .catch(() => {
            this.loadingStatus = 'error'
            this.DETERMINE_PAGE_NOT_FOUND()
          })
      }
    }
  }
}
</script>

<style>

</style>
