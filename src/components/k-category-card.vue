<template>
  <b-link
    :to="{
      name: category.has_children ? 'categories': 'category-products',
      params: { category_name: category.slug }
    }"
    class="category-link"
  >
    <div :class="`category-card category-${color}`">
      <h2>{{ category.name }}</h2>
      <img v-if="category.img" :src="category.img" :alt="category.name" @error="category.img = null">
    </div>
  </b-link>
</template>

<script>
export default {
  props: ['categoryData', 'colorData'],
  data () {
    return {
      category: this.categoryData,
      color: this.colorData
    }
  }
}
</script>

<style>

</style>
