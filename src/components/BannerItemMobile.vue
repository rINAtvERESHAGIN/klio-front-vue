<template>
  <b-carousel-slide :img-src="banner.img" v-if="banner.mobile">
    <h1 v-if="banner.show_content"
        v-html="banner.name">
    </h1>
    <div v-html="banner.content"
         class="banner-content"
    />
    <b-link :href="banner.link">
      <b-button squared size="lg"
                :class="`btn-${banner.btn_color}`"
      >
        {{ banner.btn_text }}
      </b-button>
    </b-link>
  </b-carousel-slide>
</template>

<script>
export default {
  name: 'BannerItemMobile',
  props: ['bannerData'],
  data () {
    return {
      banner: this.bannerData
    }
  }
}
</script>

<style scoped>

</style>
