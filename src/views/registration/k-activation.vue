<template>
  <b-row
    class="content-section"
    id="activation"
  >
    <b-col cols="12" md=8 lg="4" offset-md="2" offset-lg="4">
      <h1>Активация аккаунта</h1>
      <p v-if="this.status === 'Success'">
        {{ result }}
      </p>
      <b-button
          v-b-modal.modal-login
          squared
          class="btn-yellow"
          v-if="this.status === 'Success'"
        >
          Войти
      </b-button>
      <p
        v-else-if="this.status === 'Error'"
        class="red"
      >
        {{ result }}
      </p>
      <p v-else>{{ result }}</p>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'k-activation',
  metaInfo: {
    title: 'Активация аккаунта',
    meta: [
      { vmid: 'description', name: 'description', content: 'Активация аккаунта на сайте Интернет-магазина Клио' },
      { vmid: 'keywords', name: 'keywords', content: 'активация, аккаунт, Клио, магазин, инструмент для ювелиров, зуботехническое оборудование, ювелирная упаковка' }
    ]
  },
  props: ['activation_code'],
  data () {
    return {
      result: 'Статус запроса неизвестен. Пожалуйста, подождите...',
      status: 'Pending'
    }
  },
  mounted () {
    var path = 'auth/activate/' + this.activation_code
    this.$axios
      .get(path)
      .then(res => {
        this.result = res.data.detail
        this.status = 'Success'
      })
      .catch(err => {
        this.result = err.response.data.detail
        this.status = 'Error'
      })
  }
}
</script>

<style>

</style>
