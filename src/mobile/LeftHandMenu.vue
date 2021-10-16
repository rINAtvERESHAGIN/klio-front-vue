<template>
  <!--    DRAWER -->
  <v-navigation-drawer
    v-model="open"
    absolute
    temporary
    :style="{'width': open ? '100%':'50%', 'z-index':'20000', 'height': '100%'}"
  >
    <v-toolbar style="margin-bottom: 8px"
               flat
    >
      <v-spacer></v-spacer>
      <v-btn icon @click="handleCloseMenu">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <!--    кнопки для входа и указание локации-->
    <div style="display: flex; justify-content: space-between; margin-bottom: 24px; align-items: center">
      <EnterButton :close-drawer="handleCloseDrawer"/>
      <Location/>
    </div>

    <!--    Меню: Избранное | Корзина | Доставка-->
    <v-list dense nav>
      <v-list-item-group
        color="primary"
        active-class="deep-purple--text text--accent-4"
      >
        <!--        переход в корзину-->
        <Basket :close-drawer="handleCloseMenu"/>
        <!--        переход к избранным-->
        <Favorited :handle-on-close-drawer="handleCloseMenu"/>
        <!--        переход к доставке-->
        <Delivery :close-drawer="handleCloseMenu"/>
      </v-list-item-group>
    </v-list>

    <!--    каталог-->
    <ProductsCatalog :handle-on-close="handleCloseMenu"/>
    <!--    контейнер для выравнивания-->
    <div style="display: flex; flex-direction: column; justify-content: flex-start; padding-left: 8px">
      <!--    новинки-->
      <NewItems :handle-on-close-drawer="handleCloseMenu"/>
      <!--    распродажа-->
      <Sale :close-drawer="handleCloseMenu"/>
    </div>
    <!--    поля с переходами по разделам информирования-->
    <InformationTable :handle-close-drawer="handleCloseMenu"/>
    <!--    телефоны которые относятся к конкретному городу-->
    <TelephonesByAddresses/>

  </v-navigation-drawer>
</template>

<script>
// import EnterButton from './LeftHandMenu/components/EnterButton'
const EnterButton = () => import('./LeftHandMenu/components/EnterButton');
// import Location from './LeftHandMenu/components/Location'
const Location = () => import('./LeftHandMenu/components/Location');
// import ProductsCatalog from './LeftHandMenu/components/ProductsCatalog'
const ProductsCatalog = () => import('./LeftHandMenu/components/ProductsCatalog');
// import NewItems from './LeftHandMenu/components/NewItems'
const NewItems = () => import('./LeftHandMenu/components/NewItems');
// import Sale from './LeftHandMenu/components/Sale'
const Sale = () => import('./LeftHandMenu/components/Sale');
// import InformationTable from './LeftHandMenu/components/InformationTable'
const InformationTable = () => import('./LeftHandMenu/components/InformationTable');
// import TelephonesByAddresses from './LeftHandMenu/components/TelephonesByAddresses'
const TelephonesByAddresses = () => import('./LeftHandMenu/components/TelephonesByAddresses');
// import Basket from './LeftHandMenu/components/list-items-basket-delivery-favorited/Basket'
const Basket = () => import('./LeftHandMenu/components/list-items-basket-delivery-favorited/Basket');
// import Favorited from './LeftHandMenu/components/list-items-basket-delivery-favorited/Favorited'
const Favorited = () => import('./LeftHandMenu/components/list-items-basket-delivery-favorited/Favorited');
// import Delivery from './LeftHandMenu/components/list-items-basket-delivery-favorited/Delivery'
const Delivery = () => import('./LeftHandMenu/components/list-items-basket-delivery-favorited/Delivery');

export default {
  name: 'LeftHandMenu',
  components: {
    Location,
    EnterButton,
    ProductsCatalog,
    NewItems,
    Sale,
    InformationTable,
    TelephonesByAddresses,
    Basket,
    Favorited,
    Delivery
  },
  props: {
    open: Boolean,
    handleCloseDrawer: Function
  },
  data: () => ({
    drawer: false,
    group: null,
    listItems: [
      {
        text: 'Избранное',
        icon: 'mdi-star-outline',
        to: { name: 'favorites' }
      },
      {
        text: 'Корзина',
        icon: 'mdi-basket-outline',
        to: { name: '' }
      },
      {
        text: 'Доставка',
        icon: 'mdi-truck-delivery-outline',
        to: { name: '/basket' }
      }
    ]
  }),
  methods: {
    handleCloseMenu () {
      this.handleCloseDrawer()
    }
  },
  watch: {
    group () {
      this.drawer = false
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
