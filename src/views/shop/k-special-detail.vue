<template>
  <b-row class="content-section">
    <b-col cols="12" class="text-center" v-if="loadingStatus === 'pending'">
      <b-spinner type="grow" class="m-3"></b-spinner>
      <b-spinner type="grow" class="m-3"></b-spinner>
      <b-spinner type="grow" class="m-3"></b-spinner>
    </b-col>
    <b-col cols="12" md="10" offset-md="1" v-else-if="loadingStatus === 'success'">
      <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
      <h1>{{ SPECIAL.name }}</h1>
      <div class="info-content-tag-list" v-if="SPECIAL.tags">
        <b-badge v-for="tag in SPECIAL.tags" :key="tag.id" class="tag-badge" :to="`/search?tags=${tag.name}`">{{ tag.name }}</b-badge>
      </div>
      <p>{{ SPECIAL.date }}</p>
      <p v-if="SPECIAL.deadline">Дата завершения акции: {{ SPECIAL.deadline }}</p>
      <b-row v-if="SPECIAL.img">
        <b-col cols="12">
          <img :src="SPECIAL.img" :alt="SPECIAL.name" class="bottom-spaced">
        </b-col>
      </b-row>
      <b-row v-if="SPECIAL.content" class="bottom-spaced">
        <b-col cols="12" v-html="SPECIAL.content"></b-col>
      </b-row>
      <b-container fluid v-if="SPECIAL_PRODUCTS && SPECIAL_PRODUCTS.results && SPECIAL_PRODUCTS.results.length">
        <ProductListComponent :responseData="SPECIAL_PRODUCTS" />
      </b-container>
    </b-col>
    <b-col cols="12" id="back-to-top">
      <a href="#" class="btn float-right" role="button" onClick="window.scrollTo({top: 1000, behavior: 'smooth'})">
        <img src="@/assets/icons/ring-svgrepo-com.svg" width="80px" alt="" v-scroll-to="'body'">
        <p>наверх</p>
      </a>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProductListComponent from '../../components/k-product-list-component.vue'
import { preloader } from '../../preloader'

export default {
  name: 'k-special-detail',
  metaInfo () {
    return {
      title: this.SPECIAL ? this.SPECIAL.meta_title : '',
      meta: [
        { vmid: 'description', name: 'description', content: this.SPECIAL ? this.SPECIAL.meta_description : '' },
        { vmid: 'keywords', name: 'keywords', content: this.SPECIAL ? this.SPECIAL.meta_keywords : '' }
      ]
    }
  },
  components: {
    ProductListComponent
  },
  props: ['special_name'],
  data () {
    return {
      breadcrumbs: [{ text: 'Главная', to: { name: 'home' } }, { text: 'Акции', to: { name: 'specials' } }, { text: this.special_name, active: true }],
      loadingStatus: 'pending',
      response: null
    }
  },
  computed: {
    ...mapGetters([
      'SPECIAL',
      'SPECIAL_PRODUCTS'
    ])
  },
  // watch: {
  //   $route (to, from) {
  //     if (to.path === from.path) {
  //       this.updateResults(this.sortBy, this.sortAsc)
  //     } else {
  //       this.do_axios()
  //     }
  //   }
  // },
  async serverPrefetch () {
    await this.loadData()
    preloader.add(this.loadingStatus, 'specLoadingStatus')
    return true
  },
  created () {
    this.loadingStatus = this.$preloaded.specLoadingStatus
  },
  mounted () {
    if (this.loadingStatus !== 'success') this.loadData()
  },
  methods: {
    ...mapActions([
      'GET_SPECIAL_FROM_API',
      'GET_SPECIAL_PRODUCTS_FROM_API'
    ]),
    updateResults (sortBy, sortAsc) {
      this.$axios
        .get(`sale/specials/${this.special_name}/products/list?sortby=${sortBy}&direction=${sortAsc ? 'asc' : 'desc'}`)
        .then(productsResp => {
          this.products = productsResp.data
        })
    },
    async loadData () {
      await this.GET_SPECIAL_FROM_API(this.special_name)
        .then((res) => {
          if (res.data) {
            this.loadingStatus = 'success'
          }
          return true
        })
        .catch(() => {
          this.loadingStatus = 'error'
          return true
        })
      await this.GET_SPECIAL_PRODUCTS_FROM_API(this.special_name)
      return true
    }
  }
}
</script>
