<template>
  <b-row class="content-section" id="registration">
    <b-col cols="12" md=8 lg="4" offset-md="2" offset-lg="4">
      <h1>Регистрация</h1>
        <b-form @submit.prevent="registerUser" method="POST">
          <b-input-group class="required">
            <label for="field-surname"><span>*</span></label>
            <b-form-input v-model="last_name" id="field-surname" placeholder="Фамилия" class="form-input"></b-form-input>
            <p class="form-error error-right" v-if="err && err.last_name">{{ err.last_name[0] }}</p>
        </b-input-group>
        <b-input-group class="required">
            <label for="field-name"><span>*</span></label>
            <b-form-input v-model="first_name" id="field-name" placeholder="Имя" class="form-input"></b-form-input>
            <p class="form-error error-right" v-if="err && err.first_name">{{ err.first_name[0] }}</p>
        </b-input-group>
        <b-input-group class="required bottom-spaced">
            <label for="field-email"><span>*</span></label>
            <b-form-input v-model="email" id="field-email" placeholder="e-mail" class="form-input"></b-form-input>
            <p class="form-error error-right" v-if="err && err.email">{{ err.email[0] }}</p>
        </b-input-group>
        <b-input-group class="required">
            <label for="field-pass"><span>*</span></label>
            <template v-slot:append>
              <b-input-group-text @click="switchPassVisibility">
                <b-icon-eye v-if="passwordFieldType === 'password'"></b-icon-eye>
                <b-icon-eye-slash v-if="passwordFieldType === 'text'"></b-icon-eye-slash>
              </b-input-group-text>
            </template>
            <b-form-input v-model="pass" id="field-pass" :type="passwordFieldType" placeholder="пароль" class="form-input"></b-form-input>
            <p class="form-error error-right" v-if="err && err.password">{{ err.password[0] }}</p>
        </b-input-group>
        <b-input-group class="required bottom-spaced">
            <label for="field-confirm"><span>*</span></label>
            <template v-slot:append>
              <b-input-group-text @click="switchPassConfirmVisibility">
                <b-icon-eye v-if="passConfirmFieldType === 'password'"></b-icon-eye>
                <b-icon-eye-slash v-if="passConfirmFieldType === 'text'"></b-icon-eye-slash>
              </b-input-group-text>
            </template>
            <b-form-input v-model="passConfirm" id="field-confirm" :type="passConfirmFieldType" placeholder="подтверждение пароля" class="form-input"></b-form-input>
            <p class="form-error error-right" v-if="err && err.password_confirm">{{ err.password_confirm[0] }}</p>
        </b-input-group>
        <b-form-checkbox size="lg" v-model="personalData">
          подтверждаю <b-link>согласие на обработку персональных данных</b-link>
          <p class="form-error error-top-right" v-if="err && err.personal_data">{{ err.personal_data[0] }}</p>
        </b-form-checkbox>
        <b-button type="submit" squared class="btn-yellow">зарегистрироваться</b-button>
      </b-form>
    </b-col>
    <b-modal v-model="modalRegisterSend" id="modal-register-send" hide-footer>
      <h2 class="text-upper bottom-spaced">Письмо отправлено</h2>
      <p>Спасибо за Вашу регистрацию.</p>
      <p class="modal-text-small">Мы отправили письмо на указанную Вами почту. Пожалуйста, перейдите по ссылке в письме для завершения регистрации.
        Если письмо не приходит, не забудьте проверить СПАМ.</p>
        <p>с уважением, команда Клио.</p>
    </b-modal>
  </b-row>
</template>

<script>

export default {
  name: 'k-registration',
  metaInfo: {
    title: 'Регистрация',
    meta: [
      { vmid: 'description', name: 'description', content: 'Регистрация на сайте Интернет-магазина Клио' },
      { vmid: 'keywords', name: 'keywords', content: 'регистрация, Клио, магазин, инструмент для ювелиров, зуботехническое оборудование, ювелирная упаковка' }
    ]
  },
  data () {
    return {
      first_name: '',
      email: '',
      last_name: '',
      modalRegisterSend: false,
      pass: '',
      passConfirm: '',
      passwordFieldType: 'password',
      passConfirmFieldType: 'password',
      personalData: '',
      err: '',
      registerStatus: 'Pending'
    }
  },
  methods: {
    registerUser () {
      var newUser = {
        last_name: this.last_name,
        first_name: this.first_name,
        email: this.email,
        password: this.pass,
        password_confirm: this.passConfirm,
        personal_data: this.personalData
      }
      this.$axios
        .post('auth/register', newUser)
        .then(res => {
          this.registerStatus = 'Success'
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
      if (this.registerStatus === 'Success') {
        this.registerStatus = 'Pending'
        this.$router.push({ name: 'home' })
      }
    })
  }
}
</script>

<style>

</style>
