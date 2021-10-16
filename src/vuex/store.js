import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
const $axios = axios.create({
  // baseURL: 'http://127.0.0.1:8000/api/v1/' // FOR DEV!
  // baseURL: 'http://192.168.0.20:8000/api/v1/' // FOR DEV!
  baseURL: 'https://kliogem.ru:8079/api/v1/' // FOR PROD!
})

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    banners: [],
    basket: null,
    basketProductsIds: [],
    brands: [],
    catalog: [],
    category: null,
    categoryFilters: [],
    categoryProducts: [],
    brand: null,
    brandFilters: [],
    brandProducts: [],
    newFilters: [],
    newProducts: [],
    categoriesMain: [],
    cities: [],
    contacts: [],
    favorites: [],
    footerMenu: null,
    headerMenu: [
      {
        id: 1,
        name: '',
        letter: '',
        slug: '',
        icon: null,
        path: '',
        related_type: '',
        link: '',
        children: [
          {
            id: 1,
            name: '',
            letter: null,
            slug: '',
            icon: null,
            path: '',
            related_type: '',
            link: '',
            children: []
          }
        ]
      }
    ],
    leftMenu: null,
    orderActive: null,
    orders: [],
    product: null,
    productsNewMain: [],
    productsSpecialMain: [],
    siteSettings: null,
    socials: [],
    specials: [],
    special: null,
    specialProducts: [],
    subHeaderMenu: [
      {
        id: 1,
        name: '',
        letter: '',
        slug: '',
        icon: null,
        path: '',
        related_type: '',
        link: '',
        children: [
          {
            id: 1,
            name: '',
            letter: null,
            slug: '',
            icon: null,
            path: '',
            related_type: '',
            link: '',
            children: []
          }
        ]
      }
    ],
    user: null,
    city: null,
    loadingBasket: 'pending',
    loadingBanners: 'pending',
    loadingBrands: 'pending',
    loadingCategories: 'pending',
    loadingNewProds: 'pending',
    loadingSpecProds: 'pending',

  },

  mutations: {
    SET_BANNERS_STATE: (state, status) => {
      state.loadingBanners = status
    },
    SET_BRANDS_STATE: (state, status) => {
      state.loadingBrands = status
    },
    SET_CATEGORIES_MAIN_STATE: (state, status) => {
      state.loadingCategories = status
    },
    SET_PRODUCTS_SPECIAL_MAIN_STATE: (state, status) => {
      state.loadingSpecProds = status
    },
    SET_PRODUCTS_NEW_MAIN_STATE: (state, status) => {
      state.loadingNewProds = status
    },
    ERASE_BASKET_ACTIVE: (state) => {
      state.basket = null
    },
    ERASE_CURRENT_USER: (state) => {
      state.user = null
    },
    ERASE_ORDER_ACTIVE: (state) => {
      state.orderActive = null
    },
    SET_BANNERS: (state, banners) => {
      state.banners = banners
    },
    SET_BASKET: (state, basket) => {
      state.basket = basket
    },
    SET_BASKET_PRODUCTS_IDS: (state, basket) => {
      state.basketProductsIds = basket.products.reduce((basketProductsIds, product) => {
        basketProductsIds.push(product.id)
        return basketProductsIds
      }, [])
    },
    SET_BRANDS: (state, brands) => {
      state.brands = brands
    },
    SET_CATALOG: (state, catalog) => {
      state.catalog = catalog
    },
    SET_CATEGORY: (state, category) => {
      state.category = category
    },
    SET_CATEGORY_FILTERS: (state, filters) => {
      state.categoryFilters = filters
    },
    SET_CATEGORY_PRODUCTS: (state, products) => {
      state.categoryProducts = products
    },
    SET_BRAND: (state, brand) => {
      state.brand = brand
    },
    SET_BRAND_FILTERS: (state, filters) => {
      state.brandFilters = filters
    },
    SET_BRAND_PRODUCTS: (state, products) => {
      state.brandProducts = products
    },
    SET_NEW_FILTERS: (state, filters) => {
      state.newFilters = filters
    },
    SET_NEW_PRODUCTS: (state, products) => {
      state.newProducts = products
    },
    SET_CATEGORIES_MAIN: (state, categories) => {
      state.categoriesMain = categories
    },
    SET_CITIES: (state, cities) => {
      state.cities = cities
    },
    SET_CONTACTS: (state, contacts) => {
      state.contacts = contacts
    },
    SET_FAVORITES: (state, favorites) => {
      state.favorites = favorites
    },
    SET_FOOTER_MENU: (state, menu) => {
      state.footerMenu = menu
    },
    SET_HEADER_MENU: (state, menu) => {
      state.headerMenu = menu
    },
    SET_LEFT_MENU: (state, menu) => {
      state.leftMenu = menu
    },
    SET_ORDER_ACTIVE: (state, order) => {
      state.orderActive = order
    },
    SET_ORDERS: (state, orders) => {
      state.orders = orders
    },
    SET_PRODUCT: (state, product) => {
      state.product = product
    },
    SET_PRODUCTS_NEW_MAIN: (state, products) => {
      state.productsNewMain = products
    },
    SET_PRODUCTS_SPECIAL_MAIN: (state, products) => {
      state.productsSpecialMain = products
    },
    SET_SITE_SETTINGS: (state, settings) => {
      state.siteSettings = settings
    },
    SET_SOCIALS: (state, socials) => {
      state.socials = socials
    },
    SET_SPECIAL_LIST: (state, specials) => {
      state.specials = specials
    },
    SET_SPECIAL: (state, special) => {
      state.special = special
    },
    SET_SPECIAL_PRODUCTS: (state, products) => {
      state.specialProducts = products
    },
    SET_SUBHEADER_MENU: (state, menu) => {
      state.subHeaderMenu = menu
    },
    SET_CURRENT_USER: (state, user) => {
      state.user = user
    },
    SET_CURRENT_CITY: (state, city) => {
      if (state.user !== null && state.user.city === null) {
        state.user.city = city
      }
      state.city = city
    },
    SET_LOADING_BASKET: (state, status) => {
      state.loadingBasket = status
    }
  },

  actions: {
    LOCATE_CURRENT_CITY: ({ commit }) => {
      if (!('geolocation' in navigator)) {
        commit('SET_CURRENT_CITY', 'Москва')
      } else {
        if (window.$cookies.isKey('SAVED_NAVIGATOR_GEO_CITY') && window.$cookies.get('SAVED_NAVIGATOR_GEO_CITY') !== null) {
          commit('SET_CURRENT_CITY', window.$cookies.get('SAVED_NAVIGATOR_GEO_CITY'))
        } else {
          navigator.geolocation.getCurrentPosition(
            pos => {
              fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&localityLanguage=ru`
              )
                .then(resp => {
                  return resp.json()
                })
                .then(res => {
                  let city = res.city
                  if (city.split(' ').length) {
                    city = res.locality
                  }
                  commit('SET_CURRENT_CITY', city)
                  window.$cookies.set('SAVED_NAVIGATOR_GEO_CITY', city)
                })
            },
            () => {
              commit('SET_CURRENT_CITY', 'Москва')
            }
          )
        }
      }
    },
    ADD_TO_BASKET ({ commit }, data) {
      this.$axios({
        method: 'POST',
        url: `basket/products/${data.id}/add`,
        data: data,
        withCredentials: true
      })
        .then((basket) => {
          commit('SET_BASKET', basket.data)
          commit('SET_BASKET_PRODUCTS_IDS', basket.data)
          return basket
        })
    },
    ADD_TO_FAVORITES ({ commit }, id) {
      this.$axios({
        method: 'POST',
        url: `products/favorites/${id}/add`,
        data: null,
        withCredentials: true
      })
        .then((favorites) => {
          commit('SET_FAVORITES', favorites.data)
          return favorites
        })
    },
    CHANGE_ACTIVE_BASKET_TO_INACTIVE ({ commit }) {
      this.$axios({
        method: 'PUT',
        url: 'basket/current/inactivate',
        withCredentials: true
      })
        .then(() => {
          commit('ERASE_BASKET_ACTIVE')
        })
    },
    CHANGE_ACTIVE_ORDER_TO_PENDING ({
      commit,
      dispatch
    }) {
      return this.$axios({
        method: 'PUT',
        url: 'basket/order/active/to-pending',
        withCredentials: true
      })
        .then((res) => {
          commit('ERASE_ORDER_ACTIVE')
          dispatch('CHANGE_ACTIVE_BASKET_TO_INACTIVE')
          return res
        })
    },
    CREATE_ORDER ({ commit }) {
      return this.$axios
        .post('basket/order/create', null, { withCredentials: true })
        .then((order) => {
          commit('SET_ORDER_ACTIVE', order.data)
          return order
        })
    },
    CREATE_ORDER_DELIVERY_DATA ({ commit }, data) {
      return this.$axios({
        method: 'POST',
        url: 'basket/order/delivery/create',
        data: data,
        withCredentials: true
      })
        .then((res) => {
          commit('SET_ORDER_ACTIVE', res.data)
          return res
        })
        .catch((err) => {
          return err
        })
    },
    CREATE_ORDER_PAYMENT_DATA ({ commit }, data) {
      return this.$axios({
        method: 'POST',
        url: 'basket/order/payment/create',
        data: data,
        withCredentials: true
      })
        .then((res) => {
          commit('SET_ORDER_ACTIVE', res.data)
          return res
        })
        .catch((err) => {
          return err
        })
    },
    CREATE_ORDER_PRIVATE_DATA ({ commit }, data) {
      return this.$axios({
        method: 'POST',
        url: 'basket/order/private/create',
        data: data,
        withCredentials: true
      })
        .then((res) => {
          commit('SET_ORDER_ACTIVE', res.data)
          return res
        })
        .catch((err) => {
          return err
        })
    },
    // eslint-disable-next-line no-unused-vars
    GET_REDIRECT_B2P_FROM_API ({ commit }, id) {
      return this.$axios
        .get(`basket/order/payment/${id}/processing/redirect`)
        .then((res) => {
          return res.data
        })
        .catch((err) => {
          return err
        })
    },
    // eslint-disable-next-line no-unused-vars
    SET_ORDER_B2P_STATUS ({ commit }, {
      id,
      operation,
      resultCode,
      status
    }) {
      return this.$axios({
        method: 'PUT',
        url: `basket/order/payment/${id}/processing/status`,
        data: {
          status: status,
          operation: operation,
          result_code: resultCode
        },
        withCredentials: true
      })
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err
        })
    },
    // eslint-disable-next-line no-unused-vars
    CREATE_SUBSCRIPTION ({ commit }, data) {
      return this.$axios({
        method: 'POST',
        url: 'general/subscribe',
        data: data,
        withCredentials: true
      })
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err
        })
    },
    DELETE_FROM_BASKET ({ commit }, id) {
      this.$axios
        .delete(`basket/products/${id}/delete`, { withCredentials: true })
        .then((basket) => {
          commit('SET_BASKET', basket.data)
          commit('SET_BASKET_PRODUCTS_IDS', basket.data)
          return basket
        })
    },
    GET_ACTIVE_ORDER_FROM_API ({ commit }) {
      return this.$axios
        .get('basket/order/active', { withCredentials: true })
        .then((res) => {
          commit('SET_ORDER_ACTIVE', res.data)
          return res
        })
    },
    GET_BANNERS_FROM_API ({ commit }) {
      return this.$axios
        .get('general/banners/list')
        .then((res) => {
          commit('SET_BANNERS', res.data)
          commit('SET_BANNERS_STATE', res.data.length ? 'success' : 'empty')
          return res
        })
        .catch((err) => {
          return err
        })
    },
    GET_BASKET_FROM_API ({ commit }) {
      return this.$axios
        .get('basket/current', { withCredentials: true })
        .then((res) => {
          commit('SET_BASKET', res.data)
          commit('SET_BASKET_PRODUCTS_IDS', res.data)
          commit('SET_LOADING_BASKET', 'success')
          return res
        })
        .catch((err) => {
          commit('SET_LOADING_BASKET', 'error')
          return err
        })
    },
    GET_BRANDS_FROM_API ({ commit }) {
      return this.$axios
        .get('products/brands/list')
        .then((res) => {
          commit('SET_BRANDS', res.data)
          commit('SET_BRANDS_STATE', res.data.length ? 'success' : 'empty')
          return res
        })
        .catch((err) => {
          return err
        })
    },
    GET_CATEGORY_FROM_API ({ commit }, name) {
      return this.$axios
        .get(`products/categories/${name}/detail`)
        .then((res) => {
          commit('SET_CATEGORY', res.data)
          return res
        })
        .catch((err) => {
          return err
        })
    },
    GET_CATALOG_FROM_API ({ commit }) {
      return this.$axios
        .get('products/categories/list')
        .then((res) => {
          commit('SET_CATALOG', res.data)
          return res
        })
        .catch((err) => {
          return err
        })
    },
    GET_CATEGORY_FILTERS_FROM_API ({ commit }, name) {
      return this.$axios
        .get(`products/categories/${name}/filters/list`)
        .then((res) => {
          commit('SET_CATEGORY_FILTERS', res.data)
          return res
        })
        .catch((err) => {
          return err
        })
    },
    GET_CATEGORY_PRODUCTS_FROM_API ({ commit }, data) {
      return this.$axios
        .get(`products/categories/${data.category}/products/list${data.params}`)
        .then((res) => {
          commit('SET_CATEGORY_PRODUCTS', res.data)
          return res
        })
        .catch((err) => {
          return err
        })
    },
    GET_BRAND_FROM_API ({ commit }, name) {
      return this.$axios
        .get(`products/brands/${name}/detail`)
        .then((res) => {
          commit('SET_BRAND', res.data)
          return res
        })
        .catch((err) => {
          return err
        })
    },
    GET_BRAND_FILTERS_FROM_API ({ commit }, name) {
      return this.$axios
        .get(`products/brands/${name}/filters/list`)
        .then((res) => {
          commit('SET_BRAND_FILTERS', res.data)
          return res
        })
        .catch((err) => {
          return err
        })
    },
    GET_BRAND_PRODUCTS_FROM_API ({ commit }, data) {
      return this.$axios
        .get(`products/brands/${data.brand}/products/list${data.params}`)
        .then((res) => {
          commit('SET_BRAND_PRODUCTS', res.data)
          return res
        })
        .catch((err) => {
          return err
        })
    },
    GET_NEW_FILTERS_FROM_API ({ commit }) {
      return this.$axios
        .get('products/new/filters/list')
        .then((res) => {
          commit('SET_NEW_FILTERS', res.data)
          return res
        })
        .catch((err) => {
          return err
        })
    },
    GET_NEW_PRODUCTS_FROM_API ({ commit }, data) {
      return this.$axios
        .get(`products/new/products/list${data.params}`)
        .then((res) => {
          commit('SET_NEW_PRODUCTS', res.data)
          return res
        })
        .catch((err) => {
          return err
        })
    },
    GET_CATEGORIES_FOR_MAIN_FROM_API ({ commit }) {
      return this.$axios
        .get('products/categories/list/mainpage')
        .then((res) => {
          commit('SET_CATEGORIES_MAIN', res.data)
          commit('SET_CATEGORIES_MAIN_STATE', res.data.length ? 'success' : 'empty')
          return res
        })
        .catch((err) => {
          return err
        })
    },
    GET_CITIES_FROM_API ({ commit }, finalizer = () => {
    }) {
      return this.$axios
        .get('general/cities/list')
        .then((res) => {
          commit('SET_CITIES', res.data)
          finalizer(undefined)
          return res
        })
        .catch((err) => {
          finalizer(err)
          return err
        })
    },
    GET_CONTACTS_FROM_API ({ commit }) {
      this.$axios
        .get('contacts/list')
        .then((contacts) => {
          commit('SET_CONTACTS', contacts.data)
          return contacts
        })
    },
    GET_CURRENT_USER_FROM_API ({
      commit,
      dispatch
    }) {
      this.$axios
        .get('users/current', { withCredentials: true })
        .then((res) => {
          commit('SET_CURRENT_USER', res.data)
          dispatch('LOCATE_CURRENT_CITY')
          return res
        })
        .catch((err) => {
          dispatch('LOCATE_CURRENT_CITY')
          return err
        })
    },
    GET_FAVORITES_FROM_API ({ commit }) {
      return this.$axios
        .get('products/favorites', { withCredentials: true })
        .then((res) => {
          commit('SET_FAVORITES', res.data)
          return res
        })
        .catch((err) => {
          return err
        })
    },
    GET_MENUS_FROM_API ({ commit }) {
      this.$axios
        .get('general/menu/list')
        .then((menus) => {
          var isLeftMenu = false
          for (var i = 0; i < menus.data.length; i++) {
            if (menus.data[i].position === 'header') {
              commit('SET_HEADER_MENU', menus.data[i])
            } else if (menus.data[i].position === 'subheader') {
              commit('SET_SUBHEADER_MENU', menus.data[i])
            } else if (menus.data[i].position === 'leftbar') {
              commit('SET_LEFT_MENU', menus.data[i])
              isLeftMenu = true
            } else if (menus.data[i].position === 'footer') commit('SET_FOOTER_MENU', menus.data[i])
          }
          if (!isLeftMenu) commit('SET_LEFT_MENU', false)
          return menus
        })
    },
    GET_NEW_PRODUCTS_FOR_MAIN_FROM_API ({ commit }) {
      return this.$axios
        .get('products/list/mainpage/new')
        .then((res) => {
          commit('SET_PRODUCTS_NEW_MAIN', res.data)
          commit('SET_PRODUCTS_NEW_MAIN_STATE', res.data.length ? 'success' : 'empty')
          return res
        })
        .catch((err) => {
          return err
        })
    },
    GET_ORDERS_FROM_API ({ commit }) {
      return this.$axios
        .get('basket/order/list', { withCredentials: true })
        .then((res) => {
          commit('SET_ORDERS', res.data)
          return res
        })
    },
    GET_PRODUCT_FROM_API ({ commit }, data) {
      return this.$axios
        .get(`products/categories/${data.category_slug}/products/${data.name}/detail`)
        .then((res) => {
          commit('SET_PRODUCT', res.data)
          return res
        })
        .catch((err) => {
          return err
        })
    },
    GET_SITE_SETTINGS_FROM_API ({ commit }) {
      return this.$axios
        .get('general/settings/detail')
        .then((res) => {
          commit('SET_SITE_SETTINGS', res.data)
          return res
        })
    },
    GET_SOCIALS_FROM_API ({ commit }) {
      this.$axios
        .get('contacts/socials/list')
        .then((socials) => {
          commit('SET_SOCIALS', socials.data)
          return socials
        })
    },
    GET_SPECIALS_FROM_API ({ commit }) {
      return this.$axios
        .get('sale/specials/list')
        .then((res) => {
          commit('SET_SPECIAL_LIST', res.data)
          return res
        })
        .catch((err) => {
          return err
        })
    },
    GET_SPECIAL_FROM_API ({ commit }, specialName) {
      return this.$axios
        .get(`sale/specials/${specialName}/detail`, { withCredentials: true })
        .then((res) => {
          commit('SET_SPECIAL', res.data)
          return res
        })
        .catch((err) => {
          return err
        })
    },
    GET_SPECIAL_PRODUCTS_FROM_API ({ commit }, specialName) {
      return this.$axios
        .get(`sale/specials/${specialName}/products/list`, { withCredentials: true })
        .then((res) => {
          commit('SET_SPECIAL_PRODUCTS', res.data)
          return res
        })
        .catch((err) => {
          return err
        })
    },
    GET_SPECIAL_PRODUCTS_FOR_MAIN_FROM_API ({ commit }) {
      return this.$axios
        .get('products/list/mainpage/special')
        .then((res) => {
          commit('SET_PRODUCTS_SPECIAL_MAIN', res.data)
          commit('SET_PRODUCTS_SPECIAL_MAIN_STATE', res.data.length ? 'success' : 'empty')
          return res
        })
        .catch((err) => {
          return err
        })
    },
    LOGOUT ({ commit }) {
      return this.$axios
        .get('auth/logout', { withCredentials: true })
        .then((res) => {
          commit('ERASE_CURRENT_USER')
          return res
        })
    },
    REMOVE_FROM_FAVORITES ({ commit }, id) {
      this.$axios
        .delete(`products/favorites/${id}/delete`, { withCredentials: true })
        .then((favorites) => {
          commit('SET_FAVORITES', favorites.data)
          return favorites
        })
    },
    UPDATE_ACTIVE_ORDER_STEP ({ commit }, data) {
      return this.$axios({
        method: 'PUT',
        url: 'basket/order/active/update',
        data: {
          step: data.step,
          promocode: data.promocode
        },
        withCredentials: true
      })
        .then((res) => {
          commit('SET_ORDER_ACTIVE', res.data)
          return res
        })
        .catch((err) => {
          return err
        })
    },
    UPDATE_BASKET ({ commit }, data) {
      this.$axios({
        method: 'PUT',
        url: `basket/products/${data.id}/update`,
        data: data,
        withCredentials: true
      })
        .then((basket) => {
          commit('SET_BASKET', basket.data)
          commit('SET_BASKET_PRODUCTS_IDS', basket.data)
          return basket
        })
    },
    UPDATE_ORDER_DELIVERY_DATA ({ commit }, data) {
      return this.$axios({
        method: 'PUT',
        url: 'basket/order/delivery/update',
        data: data,
        withCredentials: true
      })
        .then((res) => {
          commit('SET_ORDER_ACTIVE', res.data)
          return res
        })
        .catch((err) => {
          return err
        })
    },
    UPDATE_ORDER_PAYMENT_DATA ({ commit }, { data }) {
      return this.$axios({
        method: 'PUT',
        url: 'basket/order/payment/update',
        data: data,
        withCredentials: true
      })
        .then((res) => {
          commit('SET_ORDER_ACTIVE', res.data)
          return res
        })
        .catch((err) => {
          return err
        })
    },
    UPDATE_ORDER_PRIVATE_DATA ({ commit }, data) {
      return this.$axios({
        method: 'PUT',
        url: 'basket/order/private/update',
        data: data,
        withCredentials: true
      })
        .then((res) => {
          commit('SET_ORDER_ACTIVE', res.data)
          return res
        })
        .catch((err) => {
          return err
        })
    },
    UPDATE_USER ({ commit }, data) {
      return this.$axios({
        method: 'PUT',
        url: 'users/current/update',
        data: data,
        withCredentials: true
      })
        .then((res) => {
          commit('SET_CURRENT_USER', res.data)
          return res
        })
        .catch((err) => {
          return err
        })
    },
    CONVERT_CITY_NAME_TO_ID ({ state }, data) {
      if (state.cities.length > 0) {
        var cityItem = state.cities.find(city => city.text === data)
        return cityItem ? cityItem.value : null
      }
    }
  },

  getters: {
    LOADING_BANNERS (state) {
      return state.loadingBanners
    },
    LOADING_BRANDS (state) {
      return state.loadingBrands
    },
    LOADING_CATEGORIES_MAIN (state) {
      return state.loadingCategories
    },
    LOADING_PRODUCTS_NEW_MAIN (state) {
      return state.loadingNewProds
    },
    LOADING_PRODUCTS_SPECIAL_MAIN (state) {
      return state.loadingSpecProds
    },
    BANNERS (state) {
      return state.banners
    },
    BASKET (state) {
      return state.basket
    },
    BASKET_PRODUCT: (state) => (id) => {
      return state.basket.products.find(product => product.id === id)
    },
    BASKET_PRODUCTS_IDS (state) {
      return state.basketProductsIds
    },
    BRANDS (state) {
      return state.brands
    },
    CATALOG (state) {
      return state.catalog
    },
    CATEGORY (state) {
      return state.category
    },
    CATEGORY_FILTERS (state) {
      return state.categoryFilters
    },
    CATEGORY_PRODUCTS (state) {
      return state.categoryProducts
    },
    BRAND (state) {
      return state.brand
    },
    BRAND_FILTERS (state) {
      return state.brandFilters
    },
    BRAND_PRODUCTS (state) {
      return state.brandProducts
    },
    NEW_FILTERS (state) {
      return state.newFilters
    },
    NEW_PRODUCTS (state) {
      return state.newProducts
    },
    CATEGORIES_MAIN (state) {
      return state.categoriesMain
    },
    CITIES (state) {
      return state.cities
    },
    CONTACTS (state) {
      return state.contacts
    },
    FAVORITES (state) {
      return state.favorites
    },
    FAVORITE_PRODUCT: (state) => (id) => {
      return state.favorites.some(product => product.id === id)
    },
    FOOTER_MENU (state) {
      return state.footerMenu
    },
    HEADER_MENU (state) {
      return state.headerMenu
    },
    LEFT_MENU (state) {
      return state.leftMenu
    },
    ORDER_ACTIVE (state) {
      return state.orderActive
    },
    ORDERS (state) {
      return state.orders
    },
    PRODUCT (state) {
      return state.product
    },
    PRODUCTS_NEW_MAIN (state) {
      return state.productsNewMain
    },
    PRODUCTS_SPECIAL_MAIN (state) {
      return state.productsSpecialMain
    },
    SITE_SETTINGS (state) {
      return state.siteSettings
    },
    SOCIALS (state) {
      return state.socials
    },
    SPECIALS (state) {
      return state.specials
    },
    SPECIAL (state) {
      return state.special
    },
    SPECIAL_PRODUCTS (state) {
      return state.specialProducts
    },
    SUBHEADER_MENU (state) {
      return state.subHeaderMenu
    },
    CURRENT_USER (state) {
      return state.user
    },
    CURRENT_CITY (state) {
      if (state.user == null) {
        return state.city
      } else {
        return state.user.city
      }
    },
    LOADING_BASKET (state) {
      return state.loadingBasket
    }
  }
})

store.$axios = $axios

export default store
