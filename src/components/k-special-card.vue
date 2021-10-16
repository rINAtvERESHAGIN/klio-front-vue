<template>
  <b-col cols="12" lg="6" xl="6">
    <div class="special-card-wrapper">
      <div class="special-card" :style="{'background-image': `url(${special.img})`}">
        <div class="special-card-inner">
          <div class="special-header-wrapper">
            <p class="special-header"><b-link :to="`specials/${special.slug}`">{{ special.name }}</b-link></p>
            <p class="special-date">{{ special.date }}</p>
          </div>
          <b-row>
            <b-col cols="12">
              <p class="text-center"><b-button class="btn-yellow" :to="`specials/${special.slug}`">подробнее</b-button></p>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </b-col>
</template>

<script>
export default {
  props: ['specialData'],
  data () {
    return {
      special: this.specialData
    }
  }
}
</script>

<style>

</style>
