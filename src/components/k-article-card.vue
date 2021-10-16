<template>
  <div class="article-card-wrapper">
    <div class="article-card" :style="{'background-image': 'url(' + article.img + ')'}">
      <div class="article-card-inner">
        <div class="article-header-wrapper">
          <p class="article-header"><b-link :to="`articles/${article.slug}`">{{ article.title }}</b-link></p>
        </div>
        <p class="article-absract bottom-spaced">{{ article.abstract }}</p>
        <b-row>
          <b-col cols="12">
            <p class="article-date">{{ article.date }}</p>
          </b-col>
          <b-col cols="12">
            <p><b-button class="btn-yellow" :to="`articles/${article.slug}`">подробнее</b-button></p>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['articleData'],
  data () {
    return {
      article: this.articleData
    }
  }
}
</script>

<style>

</style>
