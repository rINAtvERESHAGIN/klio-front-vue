<template>
  <div>
    <div class="info-container" v-for="(inf, index) in info" :key="index">
      <span class="city">{{ inf.city }}</span>
      <a :href="`tel:${inf.telephone}`">
        <span class="telephone">{{inf.telephone}}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TelephonesByAddresses',
  data: () => ({
    info: [
      { city: 'Москва', telephone: '+7 (495) 252-03-45' },
      { city: 'Санкт-Петербург', telephone: '+7 (812) 414-97-72' },
      { city: 'Кострома', telephone: '+7 (4942) 344-233' }
    ]
  })
}
</script>

<style scoped>
.info-container {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin-left: 8px;
  margin-bottom: 32px;
}

.telephone {
  color: #b7594c;
  font-weight: 600;
  font-size: 1.25rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  line-height: 1.6;
  letter-spacing: 0.0075em;
}

.city {
  font-weight: 600;
  font-size: 1.25rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  line-height: 1.6;
  letter-spacing: 0.0075em;
  display: flex;
  justify-content: flex-start;
  padding-left: 8px;
}
</style>
