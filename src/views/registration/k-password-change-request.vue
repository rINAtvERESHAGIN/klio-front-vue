<template>
  <b-row class="content-section">
    <b-col cols="12" md=6 lg="4" offset-md="3" offset-lg="4">
      <h1>изменение пароля</h1>
      <p>Укажите адрес элетронной почты, который Вы использовали при регистрации. Мы вышлем Вам письмо со ссылкой для смены пароля.</p>
      <b-form @submit.prevent="requestPassChange" method="PUT">
        <b-input-group class="required">
          <label for="field-email"><span>*</span></label>
          <b-form-input v-model="email" id="field-email" placeholder="e-mail" class="form-input"></b-form-input>
          <p class="form-error error-right" v-if="err && err.email">{{ err.email }}</p>
        </b-input-group>
        <b-button squared type="submit" class="btn-yellow narrow">Отправить запрос</b-button>
      </b-form>
    </b-col>
    <b-modal v-model="modalRequestPass" id="modal-pass-request" hide-footer>
      <h2 class="text-upper bottom-spaced">Запрос принят</h2>
      <p>Ваш запрос на изменение пароля получен.</p>
      <p class="modal-text-small">Мы отправили письмо на указанную Вами почту. Пожалуйста, перейдите по ссылке в письме для изменения пароля.
        Если письмо не приходит, не забудьте проверить СПАМ.</p>
        <p>с уважением, команда Клио.</p>
    </b-modal>
  </b-row>
</template>

<script>
export default {
  name: 'k-password-change-request',
  metaInfo: {
    title: 'Запрос на изменение пароля',
    meta: [
      { vmid: 'description', name: 'description', content: 'Запрос на изменение пароля на сайте Интернет-магазина Клио' },
      { vmid: 'keywords', name: 'keywords', content: 'запрос, пароль, изменить, Клио, магазин, инструмент для ювелиров, зуботехническое оборудование, ювелирная упаковка' }
    ]
  },
  data () {
    return {
      email: '',
      err: '',
      modalRequestPass: false
    }
  },
  methods: {
    requestPassChange () {
      var newRequest = {
        email: this.email
      }
      this.$axios
        .put('auth/password/reset', newRequest)
        .then(() => {
          this.modalRequestPass = true
        })
        .catch(err => {
          this.err = err.response.data
        })
    }
  }
}
</script>

<style>

</style>
