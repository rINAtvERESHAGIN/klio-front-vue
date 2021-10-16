<template>
  <b-col cols="12"
         id="top-menu-container"
  >
    <b-nav justified>
      <b-nav-item v-for="(category, cIndex) in HEADER_MENU.items"
                  :key="category.id"
                  :to="`/${category.path}`"
      >
        <div class="dropdown b-dropdown btn-group"
             :class="{ active: cIndex === showDropdown }"
             @mouseover="() => setShowDropDown(cIndex)"
             @mouseleave="onMouseLeaveCloseMenu"
        >
                  <span class="dropdown-toggle dropdown-toggle-no-caret"
                        aria-haspopup="true"
                        aria-expanded="false">
                    {{ category.name }}
                  </span>

          <client-only>
            <div role="menu"
                 tabindex="-1"
                 class="dropdown-menu"
                 ref="dropdownItem"
            >
              <div class="dropdown-category-container"
                   v-for="subcat in category.children"
                   :key="subcat.id"
              >
                <b-link :to="`/${subcat.path}`">
                  <p class="dropdown-category-header">{{ subcat.name }}</p>
                </b-link>
                <ul class="dropdown-category-list">
                  <li v-for="subsubcat in subcat.children"
                      :key="subsubcat.id"
                  >
                    <b-link :to="`/${subsubcat.path}`">
                      {{ subsubcat.name }}
                    </b-link>
                    <ul>
                      <li v-for="sub3cat in subsubcat.children"
                          :key="sub3cat.id"
                      >
                        <b-link :to="`/${sub3cat.path}`">
                          {{ sub3cat.name }}
                        </b-link>
                      </li>
                    </ul>
                    <div class="debug-stuff">{{ subsubcat }}</div>
                  </li>
                </ul>
              </div>
            </div>
          </client-only>
        </div>
      </b-nav-item>
    </b-nav>
  </b-col>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TopMenuWithDropDown',
  props: {
    showDropdown: [Number, null],
    setShowDropDown: Function
  },
  computed: {
    ...mapGetters([
      'HEADER_MENU'
    ])
  },
  methods: {
    onMouseLeaveCloseMenu () {
      setTimeout(() => {
        this.setShowDropDown(null)
      }, 2000)
    },
  }
}
</script>

<style scoped>

</style>
