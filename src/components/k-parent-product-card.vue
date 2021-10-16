<template>
    <div class="product-card-container">
        <b-row class="product-card">
          <b-col cols="12" md="3">
            <b-badge
              v-if="parent_product.special"
              class="product-badge badge-special"
            >
              <b-link :to="{ name: 'special-detail', params: {special_name: parent_product.special.slug } }">
                акция
              </b-link>
            </b-badge>
            <b-badge
              v-else-if="parent_product.is_new == true"
              class="product-badge badge-new"
            >
              новинка
            </b-badge>
              <div class="product-img-container">
                <img
                  v-if="parent_product.image.thumbnail"
                  :src="parent_product.image.thumbnail" @error="parent_product.image.thumbnail = null"
                  :alt="parent_product.image.label"
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
            <p class="product-stock">
              <b-badge
                v-if="Number(parent_product.in_stock) !== 0"
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
            </p>
            <span class="product-name-link">
              <p class="product-name">{{ parent_product.name }}</p>
            </span>
          </b-col>
          <b-col cols='12' md="9">
            <client-only>
              <carousel :perPage="carouselPerPage" :paginationEnabled="true" navigationEnabled style="margin-right: 10px">
                <slide v-for="(child, index) in parentProductData.child_list" :key="`product_${parentProductData.id}_${index}`">
                  <ProductCard :productData="child" :categoryData="categoryData" />
                </slide>
              </carousel>
            </client-only>
          </b-col>
        </b-row>
      </div>
</template>

<script>
// import ProductCard from '../components/k-child-product-card.vue'
const ProductCard = () => import('../components/k-child-product-card.vue');
export default {
  name: 'k-parent-product-card',
  props: ['categoryData', 'parentProductData'],
  components: {
    ProductCard
  },
  data () {
    return {
      slide: 0,
      parent_product: this.parentProductData
    }
  },
  computed: {
    carouselPerPage () {
      if (this.$isServer) return
      if (window.screen.width < 768) {
        return 2
      } else if (window.screen.width < 992) {
        return 3
      } else if (window.screen.width < 1200) {
        return 4
      } else {
        return 6
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss">
</style>
