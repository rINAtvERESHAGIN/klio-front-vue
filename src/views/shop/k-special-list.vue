<template>
  <b-row class="content-section">
    <b-col cols="12" md="10" offset-md="1">
      <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
      <h1>Акции</h1>
      <b-row v-if="SPECIALS && SPECIALS.length">
        <SpecialCard v-for="special in SPECIALS" :key="special.id" :specialData="special" />
      </b-row>
      <p v-else>К сожалению, в настоящий момент нет действующих акций.</p>
    </b-col>
  </b-row>
</template>

<script>
import SpecialCard from '../../components/k-special-card.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  metaInfo: {
    title: 'Акции и специальные предложения',
    meta: [
      { vmid: 'description', name: 'description', content: 'Список акций и специальных предложений на сайте Интернет-магазина Клио' },
      { vmid: 'keywords', name: 'keywords', content: 'акция, спецпредложение, Клио, магазин, инструмент для ювелиров, зуботехническое оборудование, ювелирная упаковка' }
    ]
  },
  components: {
    SpecialCard
  },
  data () {
    return {
      breadcrumbs: [
        { text: 'Главная', to: { name: 'home' } },
        { text: 'Акции', active: true }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'SPECIALS'
    ])
  },
  methods: {
    ...mapActions([
      'GET_SPECIALS_FROM_API'
    ])
  },
  serverPrefetch () {
    return this.GET_SPECIALS_FROM_API()
  },
  mounted () {
    if (!this.SPECIALS.length) this.GET_SPECIALS_FROM_API()
  }
}
</script>

<style>

</style>
