<template>
  <v-list-item v-if="CURRENT_USER" @click="() => handleOnClickItem(personalArea.to)">
    <v-list-item-icon style="color: #efd665; margin-right: 16px">
      <!--иконка показывающая количества товара-->
        <v-icon v-text="personalArea.icon"/>
    </v-list-item-icon>
    <!--подпись-->
    <v-list-item-content>
      <v-list-item-title>
        <span class="text">{{ personalArea.label }}</span>
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>

  <v-list-item v-else @click="() => handleOnClickItem(favorite.to)">
    <!--    иконка корзины которую оборачивает -->
    <v-list-item-icon style="color: #efd665; margin-right: 16px">
        <v-icon v-text="favorite.icon"/>
    </v-list-item-icon>
    <!--подпись-->
    <v-list-item-content>
      <v-list-item-title>
        <span class="text">{{ favorite.label }}</span>
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Favorited',
  computed: {
    ...mapGetters([
      'CURRENT_USER'
    ])
  },
  props: {
    handleOnCloseDrawer: Function
  },
  data: () => ({
    favorite: {
      label: 'Избранное',
      icon: 'mdi-star-outline',
      to: { name: 'favorites' }
    },
    personalArea: {
      label: 'Личный кабинет',
      icon: 'mdi-account',
      to: { name: 'profile' }
    }
  }),
  methods: {
    handleOnClickItem (to) {
      this.$router.push(to)
      this.handleOnCloseDrawer()
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 1rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.00938em;
}
</style>
