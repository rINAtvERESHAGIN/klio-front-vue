<template>
  <b-row class="content-section">
    <b-col cols="12" md="10" offset-md="1" id="search-content">
      <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
      <p id="search-query">результаты поиска по
        <span v-if="this.$route.query.text">запросу <span class="red">{{ this.$route.query.text }}</span></span>
        <span v-if="this.$route.query.tags"><span v-if="this.$route.query.text">и</span> тегам <span class="red">{{ this.$route.query.tags }}</span></span>
        :
      </p>
      <p v-if="results">
        <b-link v-for="(type, index) in resultsTypes" :key="index"
          :href="`${$route.path}?` + getTextTagsParams() + `${type.obj !== '' ? `&type=${type.obj}` : ''}`"
          :active="$route.query.type === type.obj || (type.obj === '' && $route.query.type === undefined)"
          :disabled="!results.counts[type.obj] && type.obj !== ''" class="search-type-btn"
        >
          <b-button squared size="lg" class="btn-grey mb-2">{{ results.counts[type.obj] }} {{ results.counts[type.obj] | pluralize(type.names) }}</b-button>
        </b-link>
      </p>
      <b-row v-if="resultsCurrentType" class="bottom-spaced">
        <b-col cols="8">
          <b-button
            v-if="this.$route.query.type == 'categories'"
            squared size="lg" class="btn-grey btn-sort"
            :class="{ active: sortBy === 'name' }"
            @click="changeSort('name', true)"
          >
            по названию<b-icon :class="'icon icon-arrow ' + (direction === 'desc' ? 'down' : 'up')"></b-icon>
          </b-button>
          <b-button
            v-else-if="this.$route.query.type == 'articles' || this.$route.query.type == 'news'"
            squared size="lg" class="btn-grey btn-sort"
            :class="{ active: sortBy === 'title' }"
            @click="changeSort('title', true)"
          >
            по названию<b-icon :class="'icon icon-arrow ' + (direction === 'desc' ? 'down' : 'up')"></b-icon>
          </b-button>
        </b-col>
      </b-row>
      <b-row class="top-spaced">
        <b-col cols="12" v-if="results">
          <b-row v-for="(type, index) in resultsTypes" :key="index">
            <b-col cols="12" v-if="results[type.obj] && results[type.obj].length">
              <div class="bottom-spaced">
                <h2 class="search-type-header">{{ type.name }}</h2>
                <b-button squared :href="`${$route.path}?` + getTextTagsParams() + `&type=${type.obj}`"
                  class="see-all-btn"
                  v-if="!resultsCurrentType"
                >
                  смотреть все >
                </b-button>
              </div>
              <b-row>
                <b-col cols="12" md="6" lg="4" xl="3" v-for="(item, index) in results[type.obj]" :key="item.id">
                  <CategoryCard v-if="type.obj === 'categories'" :categoryData="item" :colorData="[(index + 1) % 2 === 0 ? 'red': 'yellow']" />
                  <ProductCard v-else-if="!resultsCurrentType && type.obj === 'products'" :productData="item" />
                  <ArticleCard v-else-if="type.obj === 'articles'" :articleData="item" />
                  <NewsCard v-else-if="type.obj === 'news'" :newsData="item" />
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <ProductListComponent :responseData="response" v-if="resultsCurrentType && this.$route.query.type == 'products'" />
    </b-col>
    <b-col cols="12" id="back-to-top">
          <a href="#" class="btn" role="button" onClick="window.scrollTo({top: 1000, behavior: 'smooth'})">
            <img src="@/assets/icons/ring-svgrepo-com.svg" width="80px" alt="" v-scroll-to="'body'">
<!--            <p>наверх</p>-->
      </a>
    </b-col>
  </b-row>
</template>

<script>
import ArticleCard from '../components/k-article-card.vue'
import CategoryCard from '../components/k-category-card.vue'
import NewsCard from '../components/k-news-card.vue'
import ProductCard from '../components/k-product-card.vue'
import ProductListComponent from '../components/k-product-list-component.vue'

export default {
  name: 'k-search-results',
  metaInfo: {
    title: 'Страница поиска',
    meta: [
      { vmid: 'description', name: 'description', content: 'Страница поиска на сайте Интернет-магазина Клио' },
      { vmid: 'keywords', name: 'keywords', content: 'поиск, Клио, магазин, инструмент для ювелиров, зуботехническое оборудование, ювелирная упаковка' }
    ]
  },
  components: {
    ArticleCard,
    CategoryCard,
    NewsCard,
    ProductCard,
    ProductListComponent
  },
  data: function () {
    return {
      breadcrumbs: [{ text: 'Главная', to: { name: 'home' } }, { text: 'Результаты поиска', active: true }],
      currentPage: 0,
      direction: this.$route.query.direction,
      fromRes: 0,
      page: this.$route.query.page,
      perPage: this.$route.query.size ? this.$route.query.size : 25,
      response: null,
      results: null,
      resultsCurrentType: this.$route.query.type ? this.$route.query.type : null,
      resultsTypes: [
        { obj: '', names: ['Все', 'Все', 'Все'] },
        { obj: 'categories', names: ['категория', 'категории', 'категорий'] },
        { obj: 'products', names: ['товар', 'товара', 'товаров'] },
        { obj: 'articles', names: ['статья', 'статьи', 'статей'] },
        { obj: 'news', names: ['новость', 'новости', 'новостей'] }
      ],
      size: this.$route.query.size,
      sortBy: this.$route.query.sortby
    }
  },
  mounted () {
    this.doAxios()
    if (this.$route.query.type === 'products') {
      this.getSearchProductsList()
    }
  },
  methods: {
    changeSort (doSortBy, changeDirection) {
      this.sortBy = doSortBy
      if (changeDirection) {
        this.direction = (this.direction === 'desc') ? 'asc' : 'desc'
      }
      var allQueries = this.getQueryParams()
      if (this.direction) allQueries.push('direction=' + this.direction)
      if (this.sortBy) allQueries.push('sortby=' + this.sortBy)
      var params = allQueries.length ? ('?' + allQueries.join('&')) : ''

      this.$router
        .push(params)
        .catch(error => { if (error.name !== 'NavigationDuplicated') { throw error } })
    },
    doAxios () {
      this.$axios
        .get(this.$route.fullPath.slice(1))
        .then((searchResp) => {
          this.results = searchResp.data
        })
        .catch(function (error) {
          if (error.name !== 'NavigationDuplicated') { throw error }
        })
    },
    getTextTagsParams () {
      var text = this.$route.query.text
      var tags = this.$route.query.tags
      return text && tags ? `text=${text}&tags=${tags}` : text ? `text=${text}` : `tags=${tags}`
    },
    getQueryParams () {
      var allQueries = []
      if (this.$route.query.tags) allQueries.push('tags=' + this.$route.query.tags)
      if (this.$route.query.text) allQueries.push('text=' + this.$route.query.text)
      if (this.$route.query.type) allQueries.push('type=' + this.$route.query.type)
      if (this.$route.query.page) allQueries.push('page=' + this.$route.query.page)
      if (this.$route.query.size) allQueries.push('size=' + this.$route.query.size)
      return allQueries
    },
    getSearchProductsList () {
      var allQueries = this.getQueryParams()
      if (this.$route.query.direction) allQueries.push('direction=' + this.$route.query.direction)
      if (this.$route.query.sortby) allQueries.push('sortby=' + this.$route.query.sortby)
      var params = allQueries.length ? ('?' + allQueries.join('&')) : ''

      this.$axios
        .get(`products/search/list${params}`)
        .then((productsResp) => {
          this.response = productsResp.data
        })
        .catch(function (error) {
          if (error.name !== 'NavigationDuplicated') { throw error }
        })
    }
  },
  watch: {
    $route (to, from) {
      if (to.path === from.path) {
        if (to.query.type === 'products') {
          this.getSearchProductsList()
        } else {
          if (to.query.type === undefined) this.resultsCurrentType = null
          this.doAxios()
        }
      }
    }
  }
}
</script>
