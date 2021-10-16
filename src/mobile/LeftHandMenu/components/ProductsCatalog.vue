<!--КАТОЛОГ С ПРОДУКТАМИ-->
<template>
  <div style="background-color: #efd665">
    <div class="container-title">
      <span class="title">Каталог</span>
    </div>

    <v-list dense>
      <v-list-item-group>
        <v-list-item v-for="(item, index) in HEADER_MENU.items"
                     :key="index"
                     @click="() => handleOnClickItem(item.path)"
        >
          <v-list-item-content>
            <v-list-item-title>
              <span class="list-item-title">{{ item.name }}</span>
            </v-list-item-title>
          </v-list-item-content>

          <v-list-item-action @click="(event) => handleOnClickListItemBthIcon(event, item.children, item.name)"
                              v-if="item.children.length > 0"
          >
            <v-btn icon>
              <!--          иконка > для перехода на следующий уровень вложенности-->
              <v-icon v-text="'mdi-chevron-right'"/>
            </v-btn>
          </v-list-item-action>

        </v-list-item>
      </v-list-item-group>
    </v-list>
    <div v-if="children.length > 0">
      <CatalogDrawerItems :title="toolbarTitle"
                          :items="children"
                          :handle-close-drawer-rec="handleOnCloseDrawer"
                          :handle-go-back="handleOnClickGoBack"
      />
    </div>
  </div>
</template>

<script>
import CatalogDrawerItems from './CatalogDrawerItems'
import { mapGetters } from 'vuex'

export default {
  name: 'ProductsCatalog',
  props: {
    handleOnClose: Function
  },
  components: {
    CatalogDrawerItems
  },
  data: () => ({
    children: [],
    toolbarTitle: ''
  }),
  computed: {
    ...mapGetters([
      'HEADER_MENU'
    ])
  },
  methods: {
    // закрывает drawer используется как props
    handleOnCloseDrawer () {
      this.handleOnClose()
      this.children = []
    },
    // тестовая функция которая работает для нажатия на значок
    handleOnClickListItemBthIcon (event, children, name) {
      event.stopPropagation()
      this.children = [...children]
      this.toolbarTitle = name
    },
    // используется для клика по item для получения данных
    handleOnClickItem (to) {
      this.$router.push('/')
      this.$router.push(to)
      this.handleOnCloseDrawer()
    },
    handleOnClickGoBack () {
      this.children = []
    }
  }
}
</script>

<style scoped>
.container-title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #efd665;
}

.title {
  font-weight: 600;
  font-size: 1.5rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  line-height: 1.6;
  letter-spacing: 0.0075em;
  padding-left: 8px;
}

.list-item-title {
  font-size: 1.25rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 600;
  line-height: 1.6;
  letter-spacing: 0.0075em;
  white-space: pre-wrap;
}
</style>
