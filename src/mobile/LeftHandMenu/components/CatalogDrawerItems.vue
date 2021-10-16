<template>
  <v-navigation-drawer
    v-model="openDrawer"
    absolute
    temporary
    style="width: 100%;"
  >
    <!--    заголовок с кнопкой назад & кнопкой закрыть -->
    <v-toolbar style="margin-bottom: 8px; background-color: #efd665"
               flat
    >
      <!--      кнопка назад-->
      <v-btn
        icon
        class="hidden-xs-only"
        @click="handleGoBack"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <!--заголовок-->
      <v-toolbar-title>
        <span class="toolbar-title">{{ title }}</span>
      </v-toolbar-title>
      <v-spacer/>

      <!--кнопка закрыть-->
      <v-btn
        icon
        class="hidden-xs-only"
        @click="handleCloseDrawer"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <!--    элементы списка-->
    <v-list v-if="items.length > 0">
      <v-list-item-group>
        <v-list-item v-for="(item, index) in items"
                     :key="index"
                     @click="() => handleOnClickItem(item.path)"
        >
          <!--      подпись-->
          <v-list-item-content>
            <v-list-item-title>
              <span class="list-item-title">{{ item.name }}</span>
            </v-list-item-title>
          </v-list-item-content>
          <!--кнопка с иконкой > -->
          <v-list-item-icon v-if="item.children.length > 0"
                            @click="(event) => handleOnClickIconButton(event, item.children, item.name)">
            <v-btn icon>
              <v-icon v-text="'mdi-chevron-right'"/>
            </v-btn>
          </v-list-item-icon>

        </v-list-item>
      </v-list-item-group>
    </v-list>

    <div v-if="childrenItem.length > 0">
      <CatalogDrawerItems :title="toolbarTitle"
                          :items="childrenItem"
                          :handle-close-drawer-rec="handleCloseDrawer"
                          :handle-go-back="handleGoToPrev"
      />
    </div>
  </v-navigation-drawer>

</template>

<script>

export default {
  name: 'CatalogDrawerItems',
  props: {
    items: Array, // элементы которые нужно передать, что бы вызывать появление
    title: String, // названия раздела по которому кликнули
    handleCloseDrawerRec: Function, // кнопка закрыть все
    handleGoBack: Function
  },
  data: () => ({
    open: false,
    childrenItem: [], // значения которые будут передаваться рекурсивно, для того, что бы открыть другой drawer
    toolbarTitle: '' // значения которые будут устанавливаться для элемента ко которому кликнули

  }),
  methods: {
    // SETTERS
    // устанавливаем значения для передачи в другие компоненты
    setChildrenItem (item) {
      this.childrenItem = [...item]
    },
    // устанавливает значения для toolbar
    setToolbarTitle (value) {
      this.toolbarTitle = value
    },
    // CUSTOM METHODS
    // метод будет принимать & устанавливать значения CHILDREN и NAME
    handleOnClickItem (to) {
      this.$router.push('/')
      this.$router.push(to)
      this.handleCloseDrawerRec()
      this.childrenItem = []
    },
    // метод будет погружать в глубь каталога
    handleOnClickIconButton (event, children, name) {
      event.stopPropagation() // останавливаем обработку нажатия на элемент у которого вызывается данный метод
      this.setChildrenItem(children)
      this.setToolbarTitle(name)
    },
    // функция закрывает drawer нажатие на кнопку КРЕСТ
    handleCloseDrawer () {
      this.handleCloseDrawerRec()
      this.childrenItem = []
    },
    handleGoToPrev () {
      this.childrenItem = []
    }
  },
  computed: {
    // открывает выдвижной ящик
    openDrawer: function () {
      return this.items.length > 0
    }
  },
  watch: {
    childrenItem: function () {
    }
  }
}
</script>

<style scoped>
.list-item-title {
  font-size: 1.25rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 600;
  line-height: 1.6;
  letter-spacing: 0.0075em;
  white-space: pre-wrap;
}

.toolbar-title {
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  white-space: pre-wrap;
  font-weight: 600;

}
</style>
