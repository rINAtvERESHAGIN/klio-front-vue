<template>
  <b-row class="content-section">
    <b-col cols="12" md="10" lg="8" offset-md="1" offset-lg="2">
      <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
      <h3 class="contacts-address-card">По всем вопросам обращаться на почту <a href="mailto:info@kliogem.ru">info@kliogem.ru</a></h3>
      <ContactAddressCard v-for="contact in CONTACTS" :key="contact.id" :contactData="contact" :visibility="current === contact.slug ? true : false" />
    </b-col>
  </b-row>
</template>

<script>
// import ContactAddressCard from '../components/k-contact-address-card.vue'
const ContactAddressCard = () => import('../components/k-contact-address-card.vue');
import { mapGetters } from 'vuex'

export default {
  name: 'k-contact-address-card',
  metaInfo () {
    return {
      title: 'Контакты',
      meta: [
        { vmid: 'description', name: 'description', content: 'Контакты интернет-магазина Клио' },
        { vmid: 'keywords', name: 'keywords', content: 'контакты, ювелирное, оборудование, инструмент, для ювелиров,зуботехническое оборудование, ювелирная упаковка, геммологическое оборудование, оборудование для ломбарда' }
      ]
    }
  },
  components: {
    ContactAddressCard
  },
  props: ['current'],
  data () {
    return {
      breadcrumbs: [
        {
          text: 'Главная',
          to: { name: 'home' }
        },
        {
          text: 'Контакты',
          active: true
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'CONTACTS'
    ])
  }
}
</script>
