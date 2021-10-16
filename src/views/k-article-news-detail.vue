<template>
  <b-row class="content-section">
    <b-col cols="10" offset-md="1" v-if="infoContent">
      <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
      <h1>{{ infoContent.title }}</h1>
      <div class="info-content-tag-list">
        <b-badge v-for="tag in infoContent.tags" :key="tag.id" class="tag-badge" :to="`/search?tags=${tag.name}`">{{ tag.name }}</b-badge>
      </div>
    </b-col>
    <b-container fluid v-if="infoContent">
      <b-row class="art-news-detail">
        <b-col cols="12">
          <b-row>
            <b-col cols="5">
              <img :src="infoContent.img" :alt="infoContent.title">
            </b-col>
            <b-col cols="6" >
              <p class="bottom-spaced"><i>{{ getInfoAuthorDate() }}</i></p>
              <div v-html="infoContent.content"></div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </b-row>
</template>

<script>
// import { preloader } from '../preloader'

export default {
  name: 'k-article-news-detail',
  metaInfo () {
    return {
      title: this.infoContent ? this.infoContent.meta_title : '',
      meta: [
        { vmid: 'description', name: 'description', content: this.infoContent ? this.infoContent.meta_description : '' },
        { vmid: 'keywords', name: 'keywords', content: this.infoContent ? this.infoContent.meta_keywords : '' }
      ]
    }
  },
  data () {
    return {
      breadcrumbs: null,
      contentType: this.$route.path.split('/')[1],
      contentSlug: this.$route.path.split('/')[2],
      infoContent: null
    }
  },
  async serverPrefetch () {
    await this.loadData()
    // preloader.add(this.infoContent, 'articleData')
    // preloader.add(this.breadcrumbs, 'articleBreadcrumbs')
    return true
  },
  created () {
    this.infoContent = this.$preloaded.articleData
    this.breadcrumbs = this.$preloaded.articleBreadcrumbs
  },
  mounted () {
    if (!this.infoContent) {
      this.loadData()
    }
  },
  methods: {
    getBreadcrumbs () {
      var currentSection = '...'
      if (this.contentType === 'articles') {
        currentSection = 'Статьи'
      } else if (this.contentType === 'news') { currentSection = 'Новости' }
      return [
        { text: 'Главная', to: { name: 'home' } },
        { text: currentSection, to: { name: this.contentType } },
        { text: this.infoContent.title, active: true }
      ]
    },
    getInfoAuthorDate () {
      return [this.infoContent.date, this.infoContent.author].join(' | ')
    },
    loadData () {
      return this.$axios
        .get(`general/${this.contentType}/${this.contentSlug}/detail`)
        .then(response => {
          this.infoContent = response.data
          this.breadcrumbs = this.getBreadcrumbs()
        })
    }
  }
}
</script>

<style>

</style>
