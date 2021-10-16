<template>
  <v-btn
    elevation="2"
    v-if="CURRENT_USER"
    @click="logout"
    style="background-color: #b7594c;color: #fdfafa; margin-left: 8px"
  >
    <div style="display: flex; justify-content: space-between; align-items: center">
      <v-icon
        right
        dark
        style="margin-right: 8px"
        large
      >
        mdi-account
      </v-icon>

      <span style="text-transform: none; font-weight: 600; font-size: 16px">Выйти</span>
    </div>
  </v-btn>

  <v-btn
    v-else
    elevation="2"
    v-b-modal.modal-login
    @click="closeDrawer"
    style="background-color: #b7594c;color: #fdfafa; margin-left: 8px"
  >
    <div style="display: flex; justify-content: space-between; align-items: center">
      <v-icon
        right
        dark
        style="margin-right: 8px"
        large
      >
        mdi-account
      </v-icon>

      <span style="text-transform: none; font-weight: 600; font-size: 16px">Войти</span>
    </div>
  </v-btn>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'EnterButton',
  props: {
    closeDrawer: Function
  },
  methods: {
    ...mapActions([
      'LOGOUT',
      'GET_ACTIVE_ORDER_FROM_API',
      'GET_BASKET_FROM_API'
    ]),
    logout () {
      this.LOGOUT()
        .then(() => {
          this.GET_ACTIVE_ORDER_FROM_API()
          this.GET_BASKET_FROM_API()
        })
    }
  },
  computed: {
    ...mapGetters([
      'CURRENT_USER'
    ])
  }
}
</script>

<style scoped>
.override-button {
  background-color: #b7594c;
  color: #fdfafa;
}
</style>
