<template>
  <div class="contacts-address-card" :id="contact.slug">
    <h1>{{ contact.name }} <b-icon class="icon icon-arrow red" v-b-toggle="`collapse-card-${contact.slug}`"></b-icon></h1>
    <b-collapse :visible="visibility" :id="`collapse-card-${contact.slug}`" class="mt-2">
      <b-col cols="12" lg="10" offset-lg="1 " class="contacts-card-content">
        <p><b-icon class="icon icon-pin float-left"></b-icon>{{ contact.address }}</p>
        <p><b-icon class="icon icon-mail float-left"></b-icon><a :href="'mailto:' + contact.email">{{ contact.email }}</a></p>
<!--        <p><b-icon class="icon icon-phone float-left"></b-icon>{{ phones() }}</p>-->
        <p><b-icon class="icon icon-phone float-left"></b-icon><span v-for="phone in phones()" v-bind:key="phone.href"><a :href="'tel:' + phone.href">{{ phone.formatted }}</a>, </span></p>
        <div class="contacts-card-hours">
          <b-icon class="icon icon-door float-left"></b-icon>
          <ul>
            <li v-for="hours in contact.hours" :key="hours.id">
              <span class="contacts-card-label">{{ hours.label }}:</span>{{ hours.time }}</li>
          </ul>
        </div>
        <div class="contacts-card-content" v-html="contact.content"></div>
        <div class="contacts-card-map">
          <iframe :src="contact.map" width="100%" height="400" frameborder="1" allowfullscreen="true"></iframe>
        </div>
      </b-col>
    </b-collapse>
  </div>
</template>

<script>
export default {
  props: ['contactData', 'visibility'],
  data () {
    return {
      contact: this.contactData
    }
  },
  methods: {
    phones: function () {
      const phones = []
      for (let i = 0; i < this.contactData.phones.length; i++) {
        // let phone.formatted = this.contactData.phones[i].phone
        // let phone.href = this.contactData.phones[i].phone.replace(/[^0-9+]/g, '')
        const phone = {
          formatted: this.contactData.phones[i].phone,
          href: this.contactData.phones[i].phone.replace(/[^0-9+]/g, '')
        }
        // input.value = input.value.replace(/[^0-9+]/g, '');
        phones.push(phone)
      }
      // return phones.join(', ')
      return phones
    }
  }
}
</script>

<style>

</style>
