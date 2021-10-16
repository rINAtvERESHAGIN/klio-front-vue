<template>
  <li>
    <span v-if="category.letter" class="leftbar-capital-letter">{{ category.letter }}</span>
    <span v-if="category.children.length" class="leftbar-sign" v-b-toggle="`collapse-category-${category.id}`"></span>
    <b-link :to="category.path">{{ category.name }}</b-link>
    <b-collapse v-if="category.children.length" :id="`collapse-category-${category.id}`">
    <ul>
      <CategoryMenuItem v-for="category in category.children" :key="category.id" :categoryData="category"></CategoryMenuItem>
    </ul>
    </b-collapse>
  </li>
</template>

<script>
export default {
  props: ['categoryData'],
  name: 'CategoryMenuItem',
  data () {
    return {
      category: this.categoryData
    }
  }
}
</script>

<style>

</style>
