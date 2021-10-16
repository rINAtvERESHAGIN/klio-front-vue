<template>
  <div id="app">
    <!-- /mobile stuff-->
    <LeftHandMenu :handle-close-drawer="openBurgerMenu"
                  :open="burgerMenuActive"
    />
    <header>
      <b-container fluid>
        <b-row class="d-sm-none d-lg-flex">
          <TopSubHeader/>
        </b-row>

        <b-row>
            <BurgerMenuButton :burger-menu-active="burgerMenuActive"
                              :open-burger-menu="openBurgerMenu"
            />

          <b-col id="contacts-block"
                 order-xl="1"
                 class="d-none d-md-block"
                 xl="3"
                 lg="3"
                 md="3"
                 sm="3"
                 xs="12"
          >
            <ContactsBlock/>
          </b-col>

          <b-col id="logo-container"
                 class="text-center mb-md-3"
                 xl="6"
                 lg="6"
                 md="6"
                 sm="6"
                 xs="12"
                 order="1"
                 order-xl="2"
          >
            <LogoMain/>
          </b-col>

          <b-col id="user-btns"
                 class="text-right d-none d-md-flex"
                 xl="3"
                 md=3
                 sm="3"
                 order-md="3"
          >
            <UserBtns/>
          </b-col>

        </b-row>

        <!--нужно переделать архитектуру значений - проблема переноса в том, что v-model - хочет поменять значения
        props, но сделать этого не может -->
        <b-row id="search-field">
          <b-col cols="12" lg="12" offset-lg="0" xl="12" offset-xl="0">
            <b-form @submit.prevent="search" method="GET">
              <b-input-group size="lg">
                <b-form-input v-if="!searchByTags && !searchByArticle" v-model.trim="$v.query.$model"
                              placeholder="введите наименование товара или артикул" class="form-input"/>
                <b-form-input v-if="searchByArticle" v-model.trim="$v.queryArticle.$model" placeholder="введите артикул"
                              class="form-input"></b-form-input>
                <b-input-group-append is-text id="tags-search-wrapper">
                  <input squared type="checkbox" id="article-search" v-model="searchByArticle" size="lg"
                         aria-label="search by tags"> <label for="article-search">по артикулу</label>
                </b-input-group-append>
                <b-input-group-append>
                  <b-button size="lg" class="btn-white d-none d-md-block" type="submit">
                    <img src="./assets/icons/glass.svg">
                  </b-button>
                </b-input-group-append>
              </b-input-group>
              <b-button squared size="lg" class="btn-yellow d-md-none mt-2 btn-block" type="submit">Найти</b-button>
            </b-form>
            <p v-if="submitStatus == 'ERROR'" class="form-error">Введите хотя бы один символ для поиска.</p>
          </b-col>
        </b-row>

        <b-row id="top-menu"
               v-if="HEADER_MENU"
               class="d-none d-xl-block"
        >
          <TopMenuWithDropDown :set-show-drop-down="setShowDropDown"
                               :show-dropdown="showDropdown"
          />
        </b-row>
      </b-container>
    </header>

    <div id="main-content">
      <b-container fluid>
        <router-view/>
      </b-container>
    </div>

    <footer>
      <b-container fluid>
        <b-row>
          <b-col order-xl="1"
                 order-lg="2"
                 xl="4"
                 lg="4"
                 md="4"
                 order="3"
          >
            <b-row v-if="SITE_SETTINGS">
              <b-col cols="12" lg="10" class="footer-info" v-html="SITE_SETTINGS.description"></b-col>
            </b-row>
            <b-row id="copyright-blk">
              <b-col cols="12" class="text-center text-md-left">
                <p><a href="mailto:info@kliogem.ru">info@kliogem.ru</a></p>
              </b-col>
            </b-row>
          </b-col>

          <b-col xl="5"
                 lg="5"
                 md="5"
                 order="1"
                 class="mb-md-5"
          >
            <b-row v-if="FOOTER_MENU" id="footer-menu-row">
              <div class="mb-4 mb-md-0 text-center text-md-left footer-cols"
                   v-for="(category) in FOOTER_MENU.items"
                   :key="category.id">
                <span class="footer-subtitle">{{ category.name }}</span>
                <ul class="footer-menu d-md-block">
                  <li v-for="subcat in category.children" :key="subcat.id">
                    <b-link :to="`/${subcat.path}`">{{ subcat.name }}</b-link>
                  </li>
                  <li v-if="index === 0">
                    <img src="@/assets/img/mastercard.svg" alt="Mastercard" class="card-systems">
                    <img src="@/assets/img/visa.svg" alt="Visa" class="card-systems">
                    <img src="@/assets/img/mir-logo.svg" alt="MIR" class="card-systems">
                    <img src="@/assets/img/paypass.svg" alt="Paypass" class="card-systems">
                  </li>
                </ul>
              </div>
            </b-row>
          </b-col>

          <b-col xl="3"
                 lg="3"
                 md="3"
                 order="2"
                 order-lg="3"
                 class="footer-subscribe-blk mb-md-3"
          >
            <img src="@/assets/icons/pay_logos.svg" alt="Mastercard" class="card-systems">
            <p class="" id="subscribe-caption">
              <img src="@/assets/icons/mail-icon.svg" alt="subscribe on klio">Подписаться на <strong>Клио</strong>
              <!--              <img src="@/assets/img/kliologoyellowreddiamond.svg" alt="Klio" id="footer-logo">-->
            </p>
            <b-form @submit.prevent="subscribe" method="POST">
              <b-input-group size="lg" class="footer-subscribe-input">
                <b-form-input v-model="subscriptionEmail" placeholder="e-mail"
                              :class="['form-input', { 'bg-error' : (err && err.email) }]"></b-form-input>
                <b-input-group-append>
                  <b-button squared size="lg" class="btn footer-btn-yellow" type="submit">
                    <img src="@/assets/icons/arrow_grey.svg" alt="subscribe">
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form>
            <p class=""><strong>Клио</strong> в соцсетях:</p>
            <p>
              <a v-for="social in SOCIALS" :key="social.id" :href="social.url">
                <img :src="social.img" :alt="social.name"
                     class="social-icon"></a>
            </p>
          </b-col>
        </b-row>
      </b-container>
    </footer>

    <b-modal id="modal-city" hide-footer>
      <p>Ваш город - <span class="red">
        <span v-if="CURRENT_CITY !== null">{{ CURRENT_CITY }}</span>
        <span v-else>...</span>
      </span>?</p>
      <b-button squared size="lg" class="btn-yellow bottom-spaced" @click="$bvModal.hide('modal-city')">
        да
      </b-button>
      <b-link v-if="!city.changing" @click="openChangeCity"><p>изменить</p></b-link>
      <div v-else>
        <b-input-group v-if="CITIES.length !== 0">
          <label for="field-city"></label>
          <client-only>
            <vue-bootstrap-typeahead
                v-model="city.value"
                ref="typeahead"
                :data="citiesFiltered"
                :serializer="s => s.text"
                :minMatchingChars=1
                inputClass="form-input"
                id="field-city"
                class="w-100"
                placeholder="Выберите город"
                @hit="changeCity($event)"
            />
          </client-only>
        </b-input-group>
        <b-icon v-if="city.loading" icon="three-dots" animation="cylon"></b-icon>
      </div>
    </b-modal>

    <login/>

    <b-modal id="modal-subscribe" hide-footer>
      <p>Спасибо!</p>
      <p>Вы успешно подписались на рассылку.</p>
    </b-modal>

    <b-modal id="modal-amount-error" hide-footer>
      <p>В таком количестве товара нет на складе.
        Попробуйте заказать меньше или<br/>
        <b-link class="link-yellow" @click="goToContacts()">свяжитесь с нами</b-link>
      </p>
    </b-modal>
  </div>
</template>

<script>
import { email, required, numeric } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'


const Login = () => import(/* webpackChunkName: "app-main-components" */'../src/components/k-login.vue');
const LeftHandMenu = () => import(/* webpackChunkName: "app-main-components" */'@/mobile/LeftHandMenu');
const TopSubHeader = () => import(/* webpackChunkName: "app-main-components" */'@/App/components/TopSubHeader/TopSubHeader');
const BurgerMenuButton = () => import(/* webpackChunkName: "app-main-components" */'@/App/components/BurgerMenuButton');
const ContactsBlock = () => import(/* webpackChunkName: "app-main-components" */'@/App/components/ContactsBlock/ContactsBlock');
const LogoMain = () => import(/* webpackChunkName: "app-main-components" */'@/App/components/LogoMain');
const UserBtns = () => import(/* webpackChunkName: "app-main-components" */'@/App/components/UserBtn/UserBtns');
const TopMenuWithDropDown = () => import(/* webpackChunkName: "app-main-components" */'@/App/components/TopMenuWithDropDown');

export default {
  name: 'App',
  metaInfo () {
    return {
      title: 'Продажа ювелирного инструмента, упаковки и оборудования',
      titleTemplate: '%s | Интернет-магазин КЛИО',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: 'Интернет-магазин Клио - продажа ювелирного инструмента и оборудования, ювелирной упаковки оптом и в розницу, на заказ, зуботехническое оборудование. Доставка по России.'
        },
        {
          vmid: 'keywords',
          name: 'keywords',
          content: 'ювелирное, оборудование, инструмент, для ювелиров,зуботехническое оборудование, ювелирная упаковка, геммологическое оборудование, оборудование для ломбарда'
        }
      ]
    }
  },
  components: {
    Login,
    LeftHandMenu,
    TopSubHeader,
    BurgerMenuButton,
    ContactsBlock,
    LogoMain,
    UserBtns,
    TopMenuWithDropDown
  },
  data () {
    return {
      burgerMenuActive: false,
      err: null,
      searchByTags: false,
      searchByArticle: this.$route.query.article !== undefined,
      showDropdown: null,
      submitStatus: 'PENDING',
      subscriptionEmail: null,
      query: this.$route.query.text,
      queryTags: this.$route.query.tags,
      queryArticle: this.$route.query.article,
      city: {
        value: 'Москва',
        loading: true,
        changing: false
      }
    }
  },
  computed: {
    ...mapGetters([
      'BASKET',
      'CONTACTS',
      'CURRENT_USER',
      'HEADER_MENU',
      'SUBHEADER_MENU',
      'FOOTER_MENU',
      'SITE_SETTINGS',
      'SOCIALS',
      'CURRENT_CITY',
      'CITIES'
    ]),
    citiesFiltered () {
      return this.CITIES.filter(el => el.text !== null)
    }
  },
  methods: {
    // SETTERS
    setShowDropDown (value) {
      this.showDropdown = value
    },
    ...mapActions([
      'CREATE_SUBSCRIPTION',
      'GET_ACTIVE_ORDER_FROM_API',
      'GET_BASKET_FROM_API',
      'GET_CONTACTS_FROM_API',
      'GET_CURRENT_USER_FROM_API',
      'GET_FAVORITES_FROM_API',
      'GET_MENUS_FROM_API',
      'GET_SITE_SETTINGS_FROM_API',
      'GET_SOCIALS_FROM_API',
      'GET_CITIES_FROM_API',
      'UPDATE_USER',
      'LOGOUT'
    ]),
    changeCity (city) {
      this.$store.commit('SET_CURRENT_CITY', city.text)
      if (this.CURRENT_USER !== null) {
        this.UPDATE_USER(
            {
              username: this.CURRENT_USER.username,
              city: city.value
            }
        )
      }
      this.city.changing = false
      this.$bvModal.hide('modal-city')
    },
    openChangeCity () {
      this.city.loading = true
      this.city.changing = true
      this.GET_CITIES_FROM_API(() => {
        this.city.loading = false
      })
    },
    getSections (category) {
      var results = []
      var temparray = []
      var j = category.children.length
      var k = 0
      var chunk = 8
      for (let i = 0; i < j; i += chunk) {
        temparray = category.children.slice(i, i + chunk)
        results[k] = temparray
        k = k + 1
      }
      return results
    },
    goToContacts () {
      this.$bvModal.hide('modal-amount-error')
      this.$router.push({ name: 'contacts' })
    },
    logout () {
      this.LOGOUT()
          .then(() => {
            this.GET_ACTIVE_ORDER_FROM_API()
            this.GET_BASKET_FROM_API()
          })
    },
    search () {
      if (this.searchByTags) {
        this.$v.$touch()
        if (this.$v.queryTags.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          this.submitStatus = 'OK'
          this.$router.push('/search?tags=' + this.queryTags)
        }
      } else if (this.searchByArticle) {
        this.$v.$touch()
        if (this.$v.queryArticle.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          this.submitStatus = 'OK'
          this.$router.push('/search?article=' + this.queryArticle)
              .catch(error => {
                if (error.name !== 'NavigationDuplicated') {
                  throw error
                }
              })
        }
      } else {
        this.$v.$touch()
        if (this.$v.query.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          this.submitStatus = 'OK'
          this.$router.push('/search?text=' + this.query)
              .catch(error => {
                if (error.name !== 'NavigationDuplicated') {
                  throw error
                }
              })
        }
      }
    },
    // showDropdown (e) {
    //   console.log(e.target)
    //   // event.target.getElementsByClassName('dropdown-menu').classList.add('active')
    //   event.target.$refs.dropdownItem.visible = true;
    // },
    subscribe () {
      var subscriptionData = {
        email: this.subscriptionEmail
      }
      this.CREATE_SUBSCRIPTION(subscriptionData)
          .then((res) => {
            if (res.status === 200) {
              this.err = null
              this.$bvModal.show('modal-subscribe')
            } else {
              this.err = res.response.data
            }
          })
    },
    openBurgerMenu () {
      this.burgerMenuActive = !this.burgerMenuActive
    },
  },
  serverPrefetch () {
    return Promise.all([
      this.GET_CONTACTS_FROM_API(),
      this.GET_MENUS_FROM_API(),
      this.GET_SITE_SETTINGS_FROM_API(),
      this.GET_SOCIALS_FROM_API()
    ])
  },
  mounted () {
    this.GET_CURRENT_USER_FROM_API()
    this.GET_BASKET_FROM_API()
    this.GET_FAVORITES_FROM_API()

    if (!this.CONTACTS) this.GET_CONTACTS_FROM_API()
    if (!this.HEADER_MENU || !this.SUBHEADER_MENU || !this.FOOTER_MENU) this.GET_MENUS_FROM_API()
    if (!this.SITE_SETTINGS) this.GET_SITE_SETTINGS_FROM_API()
    if (!this.SOCIALS.length) this.GET_SOCIALS_FROM_API()
  },
  validations: {
    query: {
      required
    },
    queryTags: {
      required
    },
    queryArticle: {
      required,
      numeric
    },
    subscription: {
      email,
      required
    }
  },
  watch: {
    $route () {
      this.showDropdown = null
    }
  }
}
</script>

<style>
#copyright-blk a {
  color: #f3d64b;
}

#copyright-blk a:hover {
  color: #edbc10;
}

#search-field .input-group {
  background: white;
  box-shadow: inset 0px 1px 3px rgb(0 0 0 / 20%);
  -webkit-box-shadow: inset 0px 1px 3px rgb(0 0 0 / 20%);
  border-radius: 5px;
}

#search-field input.form-input.form-control {
  box-shadow: none;
  -webkit-box-shadow: none;
}

#search-field .input-group .form-input, #search-field .input-group .btn {
  background: transparent;
  background-color: transparent;
}

#search-field .input-group .form-input:focus {
  background: transparent;
}

#search-field #tags-search-wrapper, #search-field #tags-search-wrapper .input-group-text {
  background: transparent;
  background-color: transparent !important;
}

#search-field .input-group #tags-search-wrapper {
  box-shadow: none;
  -webkit-box-shadow: none;
}

#search-field .input-group-append button {
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
  background-color: transparent !important;
  background: transparent !important;
}

#search-field .input-group-append {
  background-color: transparent !important;
  background: transparent !important;
}

</style>
