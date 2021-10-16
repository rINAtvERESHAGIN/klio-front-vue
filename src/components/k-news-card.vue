<template>
  <div class="news-card-wrapper">
    <div class="news-card" :style="{'background-image': 'url(' + news.img + ')'}">
      <div class="news-card-inner">
        <div class="news-header-wrapper">
          <p class="news-header"><b-link :to="`news/${news.slug}`">{{ news.title }}</b-link></p>
        </div>
        <p class="news-absract bottom-spaced">{{ news.abstract }}</p>
        <b-row>
          <b-col cols="12">
            <p class="news-date">{{ news.date }}</p>
          </b-col>
          <b-col cols="12">
            <p><b-button class="btn-yellow" :to="`news/${news.slug}`">подробнее</b-button></p>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['newsData'],
  data () {
    return {
      news: this.newsData
    }
  }
}
</script>

<style>

</style>
