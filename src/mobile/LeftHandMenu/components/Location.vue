<template>
  <div style="display: flex; justify-content: center; width: 30%; height: 100%; align-items: center">
    <v-icon x-large left color="#efd665" style="width: 32px; height: 32px">
      mdi-map-marker-outline
    </v-icon>

    <span style="color: #212429; font-weight: 700; font-size: 19px; margin-right: 8px">
        {{ CURRENT_CITY }}
      </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Location',
  computed: {
    ...mapGetters([
      'CURRENT_CITY'
    ])
  }
}
</script>

<style scoped>

.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

</style>
