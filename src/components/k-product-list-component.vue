<template>
  <b-row>
    <b-col :cols="categoryList ? 8 : 3" :offset-lg="categoryList ? 2 : 0" class="d-none d-md-block bottom-spaced" v-if="filters">
      <div class="products-filter-blk">
        <b-container fluid>
          <b-row>
            <b-col cols="12">
              <b-form @submit.prevent="nonAutoUseFilters" @change="autoUseFilters" method="GET">
                <b-row>
                  <b-col cols="12" class="bottom-spaced" v-if="!categoryList">
                    <label for="filter-in-stock"><strong>наличие</strong></label>
                    <b-form-group>
                      <b-form-checkbox v-model="onlyInStock" id="filter-in-stock" size="lg">только в наличии</b-form-checkbox>
                    </b-form-group>
                  </b-col>
                  <b-col :cols="categoryList ? '' : 12" v-for="(filter, index) in filters" :key="index" class="bottom-spaced">
                    <label :for="filter.slug" v-if="filter.value || filter.options && filter.options.length !== 0">
                      <strong>{{ filter.name }}</strong><br />
                      <span v-if="filter.type === 'digit' && filter.value"> от {{ filter.value[0] }} до {{ filter.value[1] }}</span>
                      <span v-if="filter.units"> {{ filter.units }}</span>
                    </label>
                    <client-only>
                      <vue-slider
                        v-if="filter.type === 'digit' && filter.value"
                        :id="filter.slug"
                        v-model="filter.value"
                        :min="filter.min"
                        :max="filter.max"
                        :interval="Number(filter.interval)"
                        :process-style="{ backgroundColor: '#f3d64b' }"
                        :tooltip-style="{ backgroundColor: '#f3d64b', borderColor: '#f3d64b', color: '#333' }"
                      ></vue-slider>
                      <b-form-group
                        v-else-if="filter.type === 'text'"
                      >
                        <b-form-checkbox-group
                          :id="filter.slug"
                          v-model="filter.value"
                          :options="filter.options"
                          plain
                          stacked
                        ></b-form-checkbox-group>
                      </b-form-group>
                      <b-form-group
                        v-else-if="filter.type === 'boolean'"
                      >
                        <b-form-checkbox :id="filter.slug" size="lg" v-model="filter.value">{{ filter.name }}</b-form-checkbox>
                      </b-form-group>
                    </client-only>
                  </b-col>
                </b-row>
                <b-button v-if="!auto_filtering" :block="categoryList" squared type="submit">Применить</b-button>
              </b-form>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </b-col>
    <b-col cols="12" :md="categoryList ? 12 : filters ? 9 : 12">
      <img
        v-if="categoryData && categoryData.img && categoryData.with_general_img"
        :src="categoryData.img"
        :alt="categoryData.name"
        style="max-height: 350px; margin: 0 auto 50px auto; display: block;"
      >
      <b-row class="bottom-spaced">
        <b-col cols="12" xl="8" class="mb-2" order="2" order-xl="1">
          <b-button squared size="lg" class="btn-grey btn-sort" :class="{ active: sortBy === 'name' }" @click="changeSort('name', true)">
            по названию<b-icon :class="'icon icon-arrow ' + (direction === 'desc' ? 'down' : 'up')"></b-icon>
          </b-button>
          <b-button squared size="lg" class="btn-grey btn-sort" :class="{ active: sortBy === 'price' }" @click="changeSort('price', true)">
            по цене<b-icon :class="'icon icon-arrow ' + (direction === 'desc' ? 'down' : 'up')"></b-icon>
          </b-button>
          <p class="text-inline">Найдено: <strong>{{ response ? response.count : 0 }}</strong></p>
        </b-col>
        <b-col cols="12" xl="4" order="1" order-xl="2">
          <div class="items-per-page">
            <p>Результатов на странице:</p>
            <b-form-select v-model="perPage" class="mb-3" >
              <b-form-select-option value="25">25</b-form-select-option>
              <b-form-select-option value="50">50</b-form-select-option>
              <b-form-select-option value="100">100</b-form-select-option>
            </b-form-select>
          </div>
        </b-col>
      </b-row>

      <client-only>
        <b-pagination-nav  v-if="response.count !== 0" :number-of-pages="pages" :link-gen="linkGen" use-router align="center" id="top-pag"></b-pagination-nav>
      </client-only>

      <b-row v-if="response && response.results && !loading" cols="3">
        <template v-for="product in response.results">
          <b-col class="product-list-component-card-wrapper" v-if="product.child_list.length === 0" :key="product.id" cols="12" md="6" :xl="categoryList? 3 : filters ? 4 : 3">
            <ProductCard :productData="product" :categoryData="categorySlug" v-if="product.child_list.length === 0" />
          </b-col>
          <b-col v-else :key="product.id" cols="12" md="12" :xl="categoryList? 12 : filters ? 12 : 12">
            <ParentProductCard :parentProductData="product" :categoryData="categorySlug"></ParentProductCard>
          </b-col>
        </template>

        <b-col v-if="response.results.length === 0" cols="12" class="text-center">
          <span v-if="isFiltered && !loading">
            К сожалению, под ваши параметры ничего не подходит.
          </span>
        </b-col>
      </b-row>
      <b-row v-if="loading" class="bottom-spaced">
        <b-col cols="12" class="text-center">
          <b-spinner type="grow" class="m-3"></b-spinner>
          <b-spinner type="grow" class="m-3"></b-spinner>
          <b-spinner type="grow" class="m-3"></b-spinner>
        </b-col>
      </b-row>

      <client-only>
        <b-pagination-nav v-if="response.count !== 0" :number-of-pages="pages" :link-gen="linkGen" use-router align="center"></b-pagination-nav>
      </client-only>
    </b-col>
  </b-row>
</template>

<script>
// import ProductCard from '../components/k-product-card.vue'
const ProductCard = () => import('../components/k-product-card.vue')
// import ParentProductCard from '../components/k-parent-product-card.vue'
const ParentProductCard = () => import('../components/k-parent-product-card.vue')

export default {
  name: 'k-product-list-component',
  components: {
    ProductCard,
    ParentProductCard
  },
  props: ['categoryData', 'responseData', 'filtersData', 'categoryList'],
  data () {
    return {
      categorySlug: this.categoryData ? this.categoryData.slug : null,
      direction: this.$route.query.direction,
      filters: this.filtersData,
      onlyInStock: false,
      pageNum: this.$route.query.page,
      response: this.responseData,
      sortBy: this.$route.query.sortby,
      perPage: 25,
      loading: false,
      scrolling: true,
      auto_filtering: this.categoryList
    }
  },
  computed: {
    pages: function () {
      return this.perPage && this.responseData ? Math.ceil(this.responseData.count / this.perPage) === 0 ? 1 : Math.ceil(this.responseData.count / this.perPage) : 1
    },
    isFiltered: function () {
      const enabled = Object.keys(this.$route.query)
      return this.filters.filter(
        el => enabled.findIndex(
          fel => `${el.slug}_${el.type[0]}` === fel
        ) !== -1
      ).length !== 0
    }
  },
  methods: {
    autoUseFilters () {
      if (this.auto_filtering) {
        this.scrolling = false
        this.filterProducts()
      }
    },
    nonAutoUseFilters () {
      if (!this.auto_filtering) {
        this.scrolling = true
        this.filterProducts()
      }
    },
    reloadPage (queryParams) {
      this.loading = true
      this.$router
        .push({ query: queryParams })
        .catch(error => { if (error.name !== 'NavigationDuplicated') { throw error } })
    },
    changeSort (doSortBy, changeDirection) {
      this.sortBy = doSortBy
      if (changeDirection) { this.direction = (this.direction === 'desc') ? 'asc' : 'desc' }
      this.reloadPage(this.getParams())
    },
    // changePerPage () {
    //   this.reloadPage(this.getParams())
    // },
    getParams () {
      var queryParams = Object.assign({}, this.$route.query)
      if (this.direction) queryParams.direction = this.direction
      if (this.page) queryParams.page = this.page
      if (this.perPage) queryParams.size = this.perPage
      if (this.sortBy) queryParams.sortby = this.sortBy
      return queryParams
    },
    filterProducts () {
      var queryParams = this.getParams()
      if (this.onlyInStock) {
        queryParams.in_stock = 'true'
      } else { delete queryParams.in_stock }
      for (var i in this.filters) {
        var filter = this.filters[i]
        if (filter.type === 'boolean' && filter.value === true) {
          queryParams[`${filter.slug}_${filter.type[0]}`] = filter.value
        } else if (filter.type === 'text' && filter.value && filter.value.length) {
          queryParams[`${filter.slug}_${filter.type[0]}`] = encodeURIComponent(filter.value.join('|;|'))
        } else if (filter.type === 'digit' && filter.value && (filter.value[0] !== filter.min || filter.value[1] !== filter.max)) {
          queryParams[`${filter.slug}_${filter.type[0]}`] = filter.value
        } else { delete queryParams[`${filter.slug}_${filter.type[0]}`] }
      }
      var qp = JSON.stringify(queryParams)
      var rq = JSON.stringify(this.$route.query)
      if (qp !== rq) delete queryParams.page
      this.reloadPage(queryParams)
    },
    linkGen (pageNum) {
      const search = window.location.search
      const params = new URLSearchParams(search)
      const paramObj = {}
      for (var value of params.keys()) {
        paramObj[value] = params.get(value)
      }
      if (pageNum === 1) {
        if (paramObj.page) delete paramObj.page
      } else {
        paramObj.page = pageNum
      }
      const queryStr = Object.entries(paramObj).map(entry => entry.join('=')).join('&')
      return `?${queryStr}`
    },
    scrollToTop () {
      if (this.$isServer) return
      var topPagination = document.getElementById('top-pag')
      topPagination.scrollIntoView({ block: 'start', behavior: 'smooth' })
    }
  },
  watch: {
    perPage () {
      this.loading = true
      this.reloadPage(this.getParams())
    },
    responseData (newValue) {
      this.response = newValue
      this.loading = false
    },
    filtersData (newValue) {
      this.filters = newValue
    },
    $route (to, from) {
      if (to.path === from.path && this.scrolling) {
        this.loading = true
        this.scrollToTop()
      }
    }
  },
  created () {
    if (this.$route.query.size) {
      const size = parseInt(this.$route.query.size)
      if (
        !isNaN(size) &&
        [25, 50, 100].indexOf(size) !== -1
      ) {
        this.perPage = size
      } else {
        this.reloadPage(this.getParams())
      }
    }
  }
}
</script>
