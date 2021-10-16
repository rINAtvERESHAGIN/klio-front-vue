<template>
  <b-modal id="modal-login" hide-footer>
      <h2 class="text-upper text-left bottom-spaced">Вход</h2>
      <b-form @submit.prevent="signIn()" method="POST">
        <b-form-input placeholder="e-mail" class="form-input" type="email" v-model="email"></b-form-input>
        <b-input-group class="mt-2">
          <template v-slot:append>
            <b-input-group-text @click="switchPassVisibility">
              <b-icon-eye v-if="passwordFieldType === 'password'"></b-icon-eye>
              <b-icon-eye-slash v-if="passwordFieldType === 'text'"></b-icon-eye-slash>
            </b-input-group-text>
          </template>
          <b-form-input placeholder="пароль" class="form-input" :type="passwordFieldType" v-model="pass"></b-form-input>
        </b-input-group>
        <p class="red" v-if="err && err.detail">{{ err.detail }}</p>
        <b-link to="/pass-change" @click="$bvModal.hide('modal-login')"><p class="modal-text-small">Забыли пароль?</p></b-link>
        <b-button squared size="lg" class="btn-yellow" type="submit">войти</b-button>
      </b-form>
      <p class="modal-text-highlight">Впервые здесь?</p>
      <b-button squared class="btn-yellow narrow" to="/register" @click="$bvModal.hide('modal-login')">зарегистрироваться</b-button>
    </b-modal>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'k-login',
  data () {
    return {
      email: '',
      pass: '',
      passwordFieldType: 'password',
      err: ''
    }
  },
  methods: {
    ...mapActions([
      'GET_ACTIVE_ORDER_FROM_API',
      'GET_BASKET_FROM_API',
      'GET_CURRENT_USER_FROM_API',
      'GET_FAVORITES_FROM_API'
    ]),
    signIn () {
      var credentials = {
        email: this.email,
        password: this.pass
      }
      this.$axios
        .post('auth/login', credentials, { withCredentials: true })
        .then(() => {
          this.GET_ACTIVE_ORDER_FROM_API()
          this.GET_BASKET_FROM_API()
          this.GET_CURRENT_USER_FROM_API()
          this.GET_FAVORITES_FROM_API()
          this.email = ''
          this.pass = ''
          this.$bvModal.hide('modal-login')
          this.$router.push({ name: 'profile' })
        })
        .catch(err => {
          this.err = err.response.data
        })
    },
    switchPassVisibility () {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    }
  }
}
</script>

<style>

</style>
