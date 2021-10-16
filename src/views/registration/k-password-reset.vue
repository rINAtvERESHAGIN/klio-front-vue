<template>
  <b-row class="content-section">
    <b-col cols="12" md=8 lg="4" offset-md="2" offset-lg="4">
      <h1>изменение пароля</h1>
      <p>Установите новый пароль.</p>
      <p class="red" v-if="err && err.detail" >
        {{ err.detail }}
      </p>
      <b-form @submit.prevent="resetPassword" method="PUT">
        <b-input-group class="required mt-2">
          <label for="field-pass"><span>*</span></label>
          <template v-slot:append>
            <b-input-group-text @click="switchPassVisibility">
              <b-icon-eye v-if="passwordFieldType === 'password'"></b-icon-eye>
              <b-icon-eye-slash v-if="passwordFieldType === 'text'"></b-icon-eye-slash>
            </b-input-group-text>
          </template>
          <b-form-input v-model="pass" id="field-pass" :type="passwordFieldType" placeholder="новый пароль" class="form-input" />
          <p class="form-error error-right" v-if="err && err.password" >
            {{ err.password[0] }}
          </p>
        </b-input-group>
        <b-input-group class="required mt-2">
          <label for="field-confirm"><span>*</span></label>
          <template v-slot:append>
            <b-input-group-text @click="switchPassConfirmVisibility">
              <b-icon-eye v-if="passConfirmFieldType === 'password'"></b-icon-eye>
              <b-icon-eye-slash v-if="passConfirmFieldType === 'text'"></b-icon-eye-slash>
            </b-input-group-text>
          </template>
          <b-form-input v-model="passConfirm" id="field-confirm" :type="passConfirmFieldType" placeholder="повторите новый пароль" class="form-input" />
          <p class="form-error error-right" v-if="err && err.password_confirm" >
            {{ err.password_confirm[0] }}
          </p>
        </b-input-group>
        <b-button squared type="submit" class="btn-yellow narrow" >
          Сменить пароль
        </b-button>
      </b-form>
    </b-col>

    <b-modal v-model="modalRegisterSend" id="modal-register-send" hide-footer >
      <h2 class="text-upper bottom-spaced">Пароль изменен</h2>
      <p>Ваш пароль успешно изменен.</p>
      <p class="modal-text-small">Теперь вы можете войти, указав новый пароль.</p>
        <p>с уважением, команда Клио.</p>
    </b-modal>

  </b-row>
</template>

<script>
export default {
  name: 'k-password-reset',
  metaInfo: {
    title: 'Изменение пароля',
    meta: [
      { vmid: 'description', name: 'description', content: 'Изменение пароля на сайте Интернет-магазина Клио' },
      { vmid: 'keywords', name: 'keywords', content: 'пароль, изменить, Клио, магазин, инструмент для ювелиров, зуботехническое оборудование, ювелирная упаковка' }
    ]
  },
  props: ['user_id', 'reset_code'],
  data () {
    return {
      err: '',
      modalRegisterSend: false,
      pass: '',
      passConfirm: '',
      passwordFieldType: 'password',
      passConfirmFieldType: 'password',
      resetStatus: 'Pending'
    }
  },
  methods: {
    resetPassword () {
      var newRequest = {
        password: this.pass,
        password_confirm: this.passConfirm
      }
      this.$axios
        .put(`auth/password/${this.user_id}/set/${this.reset_code}`, newRequest)
        .then(res => {
          this.resetStatus = 'Success'
          this.modalRegisterSend = true
        })
        .catch(err => {
          this.err = err.response.data
        })
    },
    switchPassVisibility () {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    },
    switchPassConfirmVisibility () {
      this.passConfirmFieldType = this.passConfirmFieldType === 'password' ? 'text' : 'password'
    }
  },
  mounted () {
    this.$root.$on('bv::modal::hide', (bvEvent, modalId) => {
      if (this.resetStatus === 'Success') {
        this.resetStatus = 'Pending'
        this.$router.push({ name: 'home' })
      }
    })
  }
}
</script>

<style>

</style>
