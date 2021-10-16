<template>
  <b-row>
    <b-col cols="12" class="text-center error-page">
      <br>
      <p class="error-header">404</p>
      <img src="@/assets/icons/brokenlogo.svg" alt="Клио | страница не найдена">
      <p>запрашиваемая страница не найдена</p>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'k-page-not-found',
  metaInfo: {
    title: 'Страница не найдена',
    meta: [
      { vmid: 'description', name: 'description', content: 'Страница не найдена на сайте Интернет-магазина Клио' },
      { vmid: 'keywords', name: 'keywords', content: 'страница не найдена, Клио, магазин, инструмент для ювелиров, зуботехническое оборудование, ювелирная упаковка' },
      { vmid: 'robots', name: 'robots', content: 'noindex, nofollow' }
    ]
  }
}
</script>

<style>

</style>
