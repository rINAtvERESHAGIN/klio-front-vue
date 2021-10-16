<template>
  <div class="brand-card">
    <div class="brand-img-container">
      <b-link :to="{ name: 'brand-products', params: {brand_name: brand.slug } }">
        <img :src="brand.logo" :alt="brand.name" class="brand-img">
      </b-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['brandData'],
  data () {
    return {
      brand: this.brandData
    }
  }
}
</script>

<style>

</style>
