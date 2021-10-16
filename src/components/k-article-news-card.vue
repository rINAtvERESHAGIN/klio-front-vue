<template>
  <b-col cols="12" md="6">
    <div class="art-news-card-wrapper">
      <div class="art-news-card" :style="{'background-image': `url(${item.img})`}">
        <div class="art-news-card-inner">
          <div class="art-news-header-wrapper">
            <p class="art-news-header"><b-link :to="`${contentType}/${item.slug}`">{{ item.title }}</b-link></p>
          </div>
          <p class="art-news-absract bottom-spaced">{{ item.abstract }}</p>
          <b-row>
            <b-col cols="12" xl="6">
              <p class="art-news-date">{{ item.date }}</p>
            </b-col>
            <b-col cols="12" xl="6">
              <p class="text-lg-right"><b-button class="btn-yellow" :to="`${contentType}/${item.slug}`">подробнее</b-button></p>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </b-col>
</template>

<script>
export default {
  props: ['infoData', 'infoType'],
  data () {
    return {
      item: this.infoData,
      contentType: this.infoType
    }
  }
}
</script>

<style>

</style>
