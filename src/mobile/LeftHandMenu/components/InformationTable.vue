<template>
  <v-container style="padding: 5px; height: auto;">
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="6"
        v-for="(btn, index) in rightButton" :key="index"
        @click="() => goTo(btn.to)"
      >
        <v-btn text style="width: 100%; white-space: pre-wrap">
          <span class="btn-label">{{ btn.label }}</span>
        </v-btn>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'InformationTable',
  props: {
    handleCloseDrawer: Function
  },
  methods: {
    goTo (to) {
      this.$router.push(to)
      this.handleCloseDrawer()
    }
  },
  data: () => ({
    rightButton: [
      {
        label: 'Ремонт',
        to: '/info/remont'
      },
      {
        label: 'О нас',
        to: '/info/about'
      },
      {
        label: 'Контакты',
        to: '/contacts'
      },
      {
        label: 'Статьи',
        to: '/articles'
      },
      {
        label: 'Политика конфиденциальности',
        to: '/info/politika-konfidencialnosti'
      },
      {
        label: 'Новости',
        to: '/news'
      },
      {
        label: 'Реквизиты',
        to: '/info/rekvizity'
      },
      {
        label: 'Наши партнеры',
        to: '/info/nashi-partnery'
      },
      {
        label: 'Как заказать',
        to: '/info/kak-zakazat'
      },
      {
        label: 'Оплата',
        to: '/info/oplata'
      },
      {
        label: 'Доставка',
        to: '/info/dostavka'
      },
      {
        label: 'Возврат',
        to: '/info/vozvrat'
      },
      {
        label: 'Безопасность платажей',
        to: '/info/bezopasnost-platezhej'
      },
      {
        label: 'Публичная оферта',
        to: '/info/publichnaya-oferta'
      }
    ]
  }),
  computed: {
    ...mapGetters([
      'FOOTER_MENU'
    ])
  },
  mounted () {
  }
}
</script>

<style scoped>
.btn-label {
  width: 100%;
  display: inherit;
  align-items: inherit;
  justify-content: inherit;
  color: rgba(0, 0, 0, 0.87);
  font-size: 0.875rem;
  text-transform: uppercase;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 500;
  line-height: 1.75;
  letter-spacing: 0.02857em;
}
</style>
