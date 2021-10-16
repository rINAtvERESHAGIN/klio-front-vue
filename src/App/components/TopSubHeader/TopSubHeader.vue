<template>
  <b-col cols
         xl="12"
         ls="12"
         md="12"
         sm="0"
         xs="0"
         id="desktop-address-bar"
         class="d-flex"
         style="height: 50px; padding-bottom: 0; padding-top: 0;"
  >
    <div class="header-info-link"
         v-for="item in SUBHEADER_MENU.items"
         :key="item.id"
    >
      <b-link :href="`/${item.path}`"
              class="not-red"
      >
        <img :src="item.icon"
             v-if="item.icon"
             class="icon-md"
             :alt="`Сайт Клио | ${item.name}`"
        >
        {{ item.name }}
      </b-link>
    </div>

    <span class="red">
      <a href="mailto:info@kliogem.ru">info@kliogem.ru</a>
    </span>

    <b-button squared
              class="btn-klio address-btn location-set"
              v-b-modal.modal-city
    >
      <img src="../../../assets/icons/pin_yello.svg"
           class="icon-md"
           alt="Местоположение пользователя"
      >
      <span v-if="CURRENT_CITY !== null">
        {{ CURRENT_CITY }}
      </span>

      <b-icon v-else
              icon="three-dots"
              animation="cylon"></b-icon>
    </b-button>
    <span id="login-btn"
          class="btn-red address-btn"
          v-b-modal.modal-login
          v-if="!CURRENT_USER"
    >
      <img src="../../../assets/icons/user-white.svg"
           class="icon-md"
           alt="Войти"
      >
        <span>Личный кабинет</span>
    </span>

    <b-dropdown id="dropdown-profile"
                v-if="CURRENT_USER"
                :text="CURRENT_USER.first_name + ' ' + CURRENT_USER.last_name"
                no-caret
    >
      <b-dropdown-item v-if="CURRENT_USER">
        <b-link :to="{ name: 'profile' }">Личный кабинет</b-link>
      </b-dropdown-item>
      <b-dropdown-item v-if="CURRENT_USER">
        <span @click="logout()">
          <img src="../../../assets/icons/door.svg"
               class="icon-h-lg"
               alt="Выйти">Выйти</span>
      </b-dropdown-item>
      <b-dropdown-item v-else>
        <span class="" v-b-modal.modal-login>
          <img src="../../../assets/icons/user.svg"
               class="icon-h-md"
               alt="Войти">Личный кабинет</span>
      </b-dropdown-item>
    </b-dropdown>
  </b-col>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TopSubHeader',
  computed: {
    ...mapGetters([
      'CURRENT_USER',
      'SUBHEADER_MENU',
      'CURRENT_CITY'
    ])
  },
  methods: {
    logout () {
      this.LOGOUT()
        .then(() => {
          this.GET_ACTIVE_ORDER_FROM_API()
          this.GET_BASKET_FROM_API()
        })
    }
  }
}
</script>

<style scoped>

</style>
