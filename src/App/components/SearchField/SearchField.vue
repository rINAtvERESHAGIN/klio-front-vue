<template>
  <b-col cols="12" lg="12" offset-lg="0" xl="12" offset-xl="0">
    <b-form @:submit.prevent="search" method="GET">
      <b-input-group size="lg">
        <b-form-input v-if="!searchByTags && !searchByArticle"
                      v-model.trim="$v.query.$model"
                      placeholder="введите наименование товара или артикул"
                      class="form-input"
        />
        <b-form-input v-if="searchByArticle"
                      v-model.trim="$v.queryArticle.$model"
                      placeholder="введите артикул"
                      class="form-input"/>
        <b-input-group-append is-text
                              id="tags-search-wrapper"
        >
          <input squared type="checkbox"
                 id="article-search"
                 v-model="searchByArticle"
                 size="lg"
                 aria-label="search by tags"
          >
          <label for="article-search">по артикулу</label>
        </b-input-group-append>

        <b-input-group-append>
          <b-button size="lg"
                    class="btn-white d-none d-md-block"
                    type="submit"
          >
            <img src="../../../assets/icons/glass.svg">
          </b-button>
        </b-input-group-append>
      </b-input-group>

      <b-button squared size="lg"
                class="btn-yellow d-md-none mt-2 btn-block"
                type="submit">Найти</b-button>
    </b-form>
    <p v-if="submitStatus === 'ERROR'" class="form-error">Введите хотя бы один символ для поиска.</p>
  </b-col>
</template>

<script>
import { email, required, numeric } from 'vuelidate/lib/validators'

export default {
  name: 'SearchField',
  props: {
    submitStatus: String,
    searchByArticle: Boolean,
    searchByTags: Boolean,
    search: Function
  },
  validations: {
    query: {
      required
    },
    queryTags: {
      required
    },
    queryArticle: {
      required,
      numeric
    },
    subscription: {
      email,
      required
    }
  },
}
</script>

<style scoped>

</style>
