<template>
  <div>
    <b-row class="contacts-row">
      <b-col cols="12">
        <div class="contact-item contact-item-0">
          <b-dropdown id="dropdown-contacts"
                      text="Наши адреса"
                      no-caret
          >
            <b-dropdown-item v-for="contact in CONTACTS"
                             :key="contact.id"
            >
              <b-link :to="{ name: 'contacts', params: { current: contact.slug } }"
                      v-scroll-to="{ el: `#${contact.slug}` }">
                {{ contact.name }}
                <br>
                <span class="dropdown-phone">{{ contact.phones[0].phone }}</span>
              </b-link>
            </b-dropdown-item>
          </b-dropdown>
        </div>
        <div
          v-for="contact in CONTACTS"
          :key="contact.id"
          :class="`contact-item contact-item-${contact.id}`"
        >
          <b-link
            :to="{ name: 'contacts', params: { current: contact.slug } }"
            v-scroll-to="{ el: `#${contact.slug}` }"
          >
            <h4>{{ contact.name }}</h4>
            <p>
              <img
                src="../../../assets/icons/phone.svg"
                class="icon-sm"
                :alt="`Телефон магазина ${contact.name}`"
              >
              {{ contact.phones[0].phone }}
            </p>
          </b-link>
        </div>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12" id="subheader" v-if="SUBHEADER_MENU">
        <div
          class="header-info-link"
          v-for="item in SUBHEADER_MENU.items"
          :key="item.id"
        >
          <b-link :href="`/${item.path}`" class="red">
            <p class="red">
              <img
                :src="item.icon"
                v-if="item.icon"
                class="icon-h-md"
                :alt="`Сайт Клио | ${item.name}`"
              >
              {{ item.name }}
            </p>
          </b-link>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ContactsBlock',
  computed: {
    ...mapGetters([
      'SUBHEADER_MENU',
      'CONTACTS'
    ])
  }
}
</script>

<style scoped>

</style>
