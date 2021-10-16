<template>
  <b-row class="content-section">
    <b-col cols="12" v-if="ORDER_ACTIVE">
      <h1 class="text-center">оформление заказа</h1>
      <b-row class="bottom-spaced">
        <b-col cols="12" lg="8" offset-lg="2">
          <div class="order-status-line">
            <ul>
              <li v-for="step in steps"
                :key="step.number"
                :class="[step.number < ORDER_ACTIVE.step ? 'preactive' : step.number == ORDER_ACTIVE.step ? 'active' : '']">
                  {{ step.number }}
                  <p>{{ step.title }}</p>
              </li>
              <li><b-icon class="icon icon-diamond"></b-icon></li>
            </ul>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" md="4" lg="2" order="2" order-lg="1" class="mt-4 mt-lg-0">
          <b-button v-if="ORDER_ACTIVE.step == 1" class="btn-yellow basket-order-btn sticky-top" :to="{ name: 'basket' }">
            <b-icon class="icon icon-arrow left float-left"></b-icon>{{ steps.find(step => step.number === ORDER_ACTIVE.step).prevText }}</b-button>
          <b-button v-if="ORDER_ACTIVE.step > 1" class="btn-yellow basket-order-btn sticky-top" @click="prevStep()" href="#">
            <b-icon class="icon icon-arrow left float-left"></b-icon>{{ steps.find(step => step.number === ORDER_ACTIVE.step).prevText }}</b-button>
        </b-col>
        <b-col cols="12" lg="8" order="1" order-lg="2" class="text-center">
          <div v-if="ORDER_ACTIVE.step == 1" class="main-order-content">
            <b-row>
              <b-col cols="12" md="8" offset-md="2">
                <p class="bottom-spaced" v-if="!CURRENT_USER">
                  <b-link v-b-modal.modal-login>
                    войдите
                  </b-link> или
                  <b-link :to="{ name: 'register' }">
                    зарегистрируйтесь
                  </b-link> для автоматического заполнения
                </p>
                <b-form>
                  <p class="form-error error-right" v-if="err && err.client_type">{{ err.client_type[0] }}</p>
                  <b-form-group class="bottom-spaced text-right">
                    <b-form-radio v-model="clientType" name="buyer-radios" value="individual">физическое лицо</b-form-radio>
                    <b-form-radio v-model="clientType" name="buyer-radios" value="company">юридическое лицо</b-form-radio>
                  </b-form-group>
                  <p class="form-error error-right" v-if="err && err.last_name">{{ err.last_name[0] }}</p>
                  <b-input-group>
                      <label for="field-surname"><span>*</span></label>
                      <b-form-input v-model="lastName" id="field-surname" required placeholder="Фамилия" class="form-input"></b-form-input>
                  </b-input-group>
                  <p class="form-error error-right" v-if="err && err.first_name">{{ err.first_name[0] }}</p>
                  <b-input-group class="required">
                      <label for="field-name"><span>*</span></label>
                      <b-form-input v-model="firstName" id="field-name" required placeholder="Имя" class="form-input"></b-form-input>
                  </b-input-group>
                  <p class="form-error error-right" v-if="err && err.middle_name">{{ err.middle_name[0] }}</p>
                  <b-input-group class="required">
                      <label for="field-middle-name"></label>
                      <b-form-input v-model="middleName" id="field-middle-name" placeholder="Отчество" class="form-input"></b-form-input>
                  </b-input-group>
                  <p class="form-error error-right" v-if="err && err.phone">{{ err.phone[0] }}</p>
                  <b-input-group class="required">
                      <label for="field-phone"><span>*</span></label>
                      <b-form-input v-model="phone" id="field-phone" required placeholder="Телефон" class="form-input"></b-form-input>
                  </b-input-group>
                  <p class="form-error error-right" v-if="err && err.email">{{ err.email[0] }}</p>
                  <b-input-group class="required bottom-spaced">
                      <label for="field-email"><span>*</span></label>
                      <b-form-input v-model="email" id="field-email" required placeholder="e-mail" class="form-input"></b-form-input>
                  </b-input-group>
                  <p class="form-error error-right" v-if="err && err.personal_data">{{ err.personal_data[0] }}</p>
                  <b-form-checkbox size="lg" v-model="personalData">
                    подтверждаю <b-link>согласие на обработку персональных данных</b-link>
                  </b-form-checkbox>
                </b-form>
              </b-col>
            </b-row>
          </div>
          <div v-if="ORDER_ACTIVE.step == 2" class="main-order-content">
            <b-row>
              <b-col cols="12" md="8" xl="6" offset-md="2" offset-xl="3">
                <b-form>
                  <p class="form-error error-right" v-if="err && err.type">{{ err.type[0] }}</p>
                  <b-form-group class="bottom-spaced text-left">
                    <b-form-radio :disabled="deliveryOnlyCompany" name="delivery-radios" value="courier" v-model="deliveryType">
                      доставка курьером<br>
                      <span class="subtext" v-if="deliveryCity === 'Санкт-Петербург'"><font-awesome-icon icon="ruble-sign" />500, при заказе от <font-awesome-icon icon="ruble-sign" />5000 - бесплатно</span>
                      <span class="subtext" v-else-if="deliveryCity === 'Кострома'">бесплатная доставка</span>
                      <span class="subtext" v-else><font-awesome-icon icon="ruble-sign" />350, при заказе от <font-awesome-icon icon="ruble-sign" />3000 - бесплатно + <font-awesome-icon icon="ruble-sign" />20 за каждый км от МКАД</span>
                    </b-form-radio>
                    <b-form-radio name="delivery-radios" value="company" v-model="deliveryType">
                      доставка транспортной компанией<br><span class="subtext">от <font-awesome-icon icon="ruble-sign" />350</span>
                    </b-form-radio>
                    <b-form-radio :disabled="deliveryOnlyCompany" name="delivery-radios" value="pickup" v-model="deliveryType">
                      самовывоз<br><span class="subtext">бесплатно</span>
                    </b-form-radio>
                  </b-form-group>
                  <div class="text-left small bottom-spaced">
                    Доставка курьером или самовывоз доступны только в городах: <br />Москва, Санкт-Петербург, Кострома
                  </div>
                  <p class="form-error error-right" v-if="err && err.to_city">{{ err.to_city[0] }}</p>
                  <b-input-group class="required bottom-spaced" v-if="CITIES">
                    <label for="field-delivery-city"><span>*</span></label>
                    <client-only>
                      <vue-bootstrap-typeahead
                        v-model="deliveryCity"
                        ref="typeahead"
                        :data="citiesFiltered"
                        :serializer="s => s.text"
                        :minMatchingChars=1
                        inputClass="form-input"
                        id="field-delivery-city"
                        class="w-100"
                        placeholder="Выберите город"
                      />
                    </client-only>
                  </b-input-group>
                  <p class="form-error error-right" v-if="err && err.to_address">{{ err.to_address[0] }}</p>
                  <b-input-group class="bottom-spaced">
                        <label v-if="deliveryType !== 'pickup'" for="field-delivery-address"><span>*</span></label>
                        <b-form-input
                          v-model="deliveryAddress"
                          id="field-delivery-address"
                          required
                          placeholder="Адрес доставки"
                          class="form-input"
                        ></b-form-input>
                  </b-input-group>
                  <b-input-group class="required bottom-spaced">
                      <label for="field-comment"><span></span></label>
                      <b-form-textarea
                        id="field-comment"
                        placeholder="Комментарий к заказу (здесь вы можете указать транспортную компанию)"
                        class="form-input"
                        v-model="deliveryComment"
                      ></b-form-textarea>
                  </b-input-group>
                  <p class="bottom-spaced" v-if="deliveryType === 'courier'">
                    <strong>Стоимость доставки: <font-awesome-icon icon="ruble-sign" /> {{ getDeliveryPrice() }}</strong><br /> (стоимость заказа: <font-awesome-icon icon="ruble-sign" /> {{ totalSum() }} <span v-if="deliveryPrice"> + {{ deliveryPrice }}</span>)
                  </p>
                  <p class="bottom-spaced" v-else-if="deliveryType === 'company'">
                    <strong>Стоимость доставки: от <font-awesome-icon icon="ruble-sign" />350</strong><br />(в стоимость заказа не включается)
                  </p>
                  <p class="bottom-spaced" v-else><strong>Стоимость доставки: <font-awesome-icon icon="ruble-sign" /> {{ deliveryPrice }}</strong></p>
                  <div class="text-left small">
                    <p class="form-error error-right" v-if="err && err.delivery_terms">{{ err.delivery_terms[0] }}</p>
                    <b-form-checkbox size="lg" v-model="deliveryTermsAgree">
                      согласен с <b-link>условиями доставки</b-link>
                    </b-form-checkbox>
                  </div>
                  <div class="text-left small" id="moscow-terms-checkbox">
                    <p class="form-error error-right" v-if="err && err.moscow_terms">{{ err.moscow_terms[0] }}</p>
                    <b-form-checkbox size="lg" v-model="moscowTermsAgree">
                      информирован о том, что заказ формируется в г. Москве. Наличие товара на сайте показано на основании остатков склада г. Москвы
                    </b-form-checkbox>
                  </div>
                </b-form>
              </b-col>
            </b-row>
           </div>
          <div v-if="ORDER_ACTIVE.step == 3" class="main-order-content">
            <b-col cols="12" xl="10" offset-xl="1">
              <b-row>
                <b-col cols="12" md="6" xl="5">
                  <b-form @submit.prevent="checkPromocode()">
                    <p class="form-error error-right" v-if="err && err.promocode">{{ err.promocode }}</p>
                    <b-input-group class="bottom-spaced">
                      <b-form-input
                        v-model="promocode"
                        id="field-promocode"
                        required
                        placeholder="Промокод"
                        class="form-input"
                      ></b-form-input>
                      <b-input-group-append>
                        <b-button squared type="submit">отправить</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form>
                </b-col>
              </b-row>
              <OrderProductCard v-for="product in ORDER_ACTIVE.basket.products" :key="product.id" :productData="product" />
              <div class="float-right text-right">
                <p><strong>Доставка:
                  <span v-if="deliveryType === 'company'">от <font-awesome-icon icon="ruble-sign" />350 <br />(в стоимость заказа не включается)</span>
                  <span v-else><font-awesome-icon icon="ruble-sign" /> {{ ORDER_ACTIVE.delivery_info.price }}</span>
                </strong></p>
                <p class="bottom-no-space">общая сумма</p>
                <p class="product-sum" v-if="ORDER_ACTIVE.promo">
                  <b-badge>Применен промокод: <br />{{ ORDER_ACTIVE.promo_code }}</b-badge> <font-awesome-icon icon="ruble-sign" /> {{ totalSumWithDelivery(ORDER_ACTIVE.price) }}
                </p>
                <p class="product-sum" v-else><font-awesome-icon icon="ruble-sign" /> {{ totalSumWithDelivery() }}</p>
              </div>
              <b-link class="btn btn-yellow btn-block btn-order-rtn" :to="{ name: 'basket' }">
                вернуться в корзину
              </b-link>
            </b-col>
          </div>
          <div v-if="ORDER_ACTIVE.step == 4" class="main-order-content">
            <b-row>
              <b-col cols="12" md="6" offset-md="3">
                <b-form>
                  <p class="form-error error-right" v-if="err && err.type">{{ err.type[0] }}</p>
                  <b-form-group class="bottom-spaced text-left">
                    <b-form-radio name="payment-radios" value="cash" v-model="paymentType">
                      наличными при получении
                    </b-form-radio>
                    <b-form-radio name="payment-radios" value="transfer" v-model="paymentType">
                      получить квитанцию для оплаты<br><span class="subtext">счет в Сбербанке</span>
                    </b-form-radio>
                    <b-form-radio name="payment-radios" value="card" v-model="paymentType">
                      банковской картой
                    </b-form-radio>
                  </b-form-group>
                </b-form>
              </b-col>
            </b-row>
          </div>
        </b-col>
        <b-col cols="12" md="4" lg="2" offset-md="4" offset-lg="0" order="3" class="mt-4 mt-lg-0">
          <b-button
            class="btn-yellow basket-order-btn sticky-top"
            @click="nextStep()"
          >
            {{ steps.find(step => step.number === ORDER_ACTIVE.step).nextText }}<b-icon class="icon icon-arrow"></b-icon>
          </b-button>
        </b-col>
      </b-row>
    </b-col>
    <b-col v-else cols="12" class="text-center">
      <b-spinner type="grow" class="m-3"></b-spinner>
      <b-spinner type="grow" class="m-3"></b-spinner>
      <b-spinner type="grow" class="m-3"></b-spinner>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import OrderProductCard from '../../components/k-order-product-card.vue'

export default {
  name: 'k-order-process',
  metaInfo: {
    title: 'Оформление заказа',
    meta: [
      { vmid: 'description', name: 'description', content: 'Оформление заказа на сайте Интернет-магазина Клио' },
      { vmid: 'keywords', name: 'keywords', content: 'оформление, заказ, Клио, магазин, инструмент для ювелиров, зуботехническое оборудование, ювелирная упаковка' }
    ]
  },
  components: {
    OrderProductCard
  },
  data () {
    return {
      clientType: 'individual',
      deliveryAddress: '',
      deliveryCity: '',
      deliveryComment: '',
      deliveryOnlyCompany: false,
      deliveryPrice: 0,
      deliveryTermsAgree: false,
      deliveryType: 'courier',
      email: null,
      err: null,
      firstName: null,
      lastName: null,
      middleName: null,
      moscowTermsAgree: false,
      paymentType: null,
      personalData: false,
      phone: null,
      promocode: '',
      steps: [
        { number: 1, title: 'личные данные', prevText: 'посмотреть корзину', nextText: 'оформление доставки', link: '#' },
        { number: 2, title: 'доставка', prevText: 'изменить данные', nextText: 'проверить заказ', link: '#' },
        { number: 3, title: 'проверка заказа', prevText: 'параметры доставки', nextText: 'способ оплаты', link: '#' },
        { number: 4, title: 'оплата заказа', prevText: 'проверить заказ', nextText: 'заказать!', link: '#' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'CITIES',
      'CURRENT_USER',
      'ORDER_ACTIVE',
      'CURRENT_CITY'
    ]),
    citiesFiltered () {
      return this.CITIES.filter(el => el.text !== null)
    }
  },
  methods: {
    ...mapActions([
      'CHANGE_ACTIVE_ORDER_TO_PENDING',
      'CREATE_ORDER_DELIVERY_DATA',
      'CREATE_ORDER_PAYMENT_DATA',
      'CREATE_ORDER_PRIVATE_DATA',
      'GET_ACTIVE_ORDER_FROM_API',
      'GET_CITIES_FROM_API',
      'UPDATE_ACTIVE_ORDER_STEP',
      'UPDATE_ORDER_DELIVERY_DATA',
      'UPDATE_ORDER_PAYMENT_DATA',
      'UPDATE_ORDER_PRIVATE_DATA'
    ]),
    checkPromocode () {
      if (this.ORDER_ACTIVE) {
        var data = {
          step: Number(this.ORDER_ACTIVE.step),
          promocode: this.promocode
        }
        this.UPDATE_ACTIVE_ORDER_STEP(data)
          .then((res) => {
            if (res.status === 200) {
              this.err = null
            } else {
              this.err = res.response.data
            }
          })
      }
    },
    createOrderDeliveryData () {
      var deliveryData = {
        type: this.deliveryType,
        delivery_terms: this.deliveryTermsAgree,
        moscow_terms: this.moscowTermsAgree,
        to_city: this.getCityValue(),
        to_address: this.deliveryAddress,
        price: this.deliveryPrice,
        comment: this.deliveryComment
      }
      return this.CREATE_ORDER_DELIVERY_DATA(deliveryData)
    },
    getCityValue () {
      if (this.CITIES) {
        var cityItem = this.CITIES.find(city => city.text === this.deliveryCity)
        return cityItem ? cityItem.value : null
      }
    },
    getDeliveryPrice () {
      if (this.deliveryType === 'courier') {
        if (this.ORDER_ACTIVE) {
          var orderPrice = this.totalSum()
          var cityName = this.deliveryCity
          if (cityName) {
            if (cityName === 'Москва') {
              if (orderPrice <= 3000) {
                this.deliveryPrice = 350
              } else {
                this.deliveryPrice = 0
              }
            } else if (cityName === 'Санкт-Петербург') {
              if (orderPrice <= 5000) {
                this.deliveryPrice = 500
              } else {
                this.deliveryPrice = 0
              }
            } else { this.deliveryPrice = 0 }
          }
          return this.deliveryPrice
        }
      } else if (this.deliveryType === 'pickup') {
        this.deliveryPrice = 0
      }
    },
    updateOrderDeliveryData () {
      var deliveryData = {
        type: this.deliveryType,
        delivery_terms: this.deliveryTermsAgree,
        moscow_terms: this.moscowTermsAgree,
        to_city: this.getCityValue(),
        to_address: this.deliveryAddress,
        price: this.deliveryPrice,
        comment: this.deliveryComment
      }
      return this.UPDATE_ORDER_DELIVERY_DATA(deliveryData)
    },
    createOrderPaymentData () {
      var paymentData = {
        type: this.paymentType
      }
      return this.CREATE_ORDER_PAYMENT_DATA(paymentData)
    },
    updateOrderPaymentData () {
      var paymentData = {
        type: this.paymentType
      }
      return this.UPDATE_ORDER_PAYMENT_DATA(paymentData)
    },
    createOrderPrivateData () {
      var privateData = {
        client_type: this.clientType,
        email: this.email,
        first_name: this.firstName,
        last_name: this.lastName,
        middle_name: this.middleName,
        personal_data: this.personalData,
        phone: this.phone
      }
      return this.CREATE_ORDER_PRIVATE_DATA(privateData)
    },
    updateOrderPrivateData () {
      var privateData = {
        client_type: this.clientType,
        email: this.email,
        first_name: this.firstName,
        last_name: this.lastName,
        middle_name: this.middleName,
        personal_data: this.personalData,
        phone: this.phone
      }
      return this.UPDATE_ORDER_PRIVATE_DATA(privateData)
    },
    prevStep () {
      if (this.ORDER_ACTIVE.step > 1) {
        this.UPDATE_ACTIVE_ORDER_STEP({ step: Number(this.ORDER_ACTIVE.step) - 1, promocode: null })
      }
    },
    nextStep () {
      if (this.ORDER_ACTIVE.step === 1) {
        if (this.ORDER_ACTIVE.private_info) {
          this.updateOrderPrivateData()
            .then((res) => {
              if (res.status === 200) {
                this.err = null
                this.UPDATE_ACTIVE_ORDER_STEP({ step: Number(this.ORDER_ACTIVE.step) + 1, promocode: null })
              } else {
                this.err = res.response.data
              }
            })
        } else {
          this.createOrderPrivateData()
            .then((res) => {
              if (res.status === 200) {
                this.err = null
                this.UPDATE_ACTIVE_ORDER_STEP({ step: Number(this.ORDER_ACTIVE.step) + 1, promocode: null })
              } else {
                this.err = res.response.data
              }
            })
        }
      } else if (this.ORDER_ACTIVE.step === 2) {
        if (!this.deliveryCity) {
          this.err = { to_city: ['Необходимо указать город доставки.'] }
          return this.err
        }
        if (this.deliveryType !== 'pickup' && !this.deliveryAddress) {
          this.err = { to_address: ['Необходимо указать адрес доставки.'] }
        } else {
          if (this.ORDER_ACTIVE.delivery_info) {
            this.updateOrderDeliveryData()
              .then((res) => {
                if (res.status === 200) {
                  this.err = null
                  this.UPDATE_ACTIVE_ORDER_STEP({ step: Number(this.ORDER_ACTIVE.step) + 1, promocode: null })
                } else {
                  this.err = res.response.data
                }
              })
          } else {
            this.createOrderDeliveryData()
              .then((res) => {
                if (res.status === 200) {
                  this.err = null
                  this.UPDATE_ACTIVE_ORDER_STEP({ step: Number(this.ORDER_ACTIVE.step) + 1, promocode: null })
                } else {
                  this.err = res.response.data
                }
              })
          }
        }
      } else if (this.ORDER_ACTIVE.step === 3) {
        this.UPDATE_ACTIVE_ORDER_STEP({ step: Number(this.ORDER_ACTIVE.step) + 1, promocode: null })
      } else if (this.ORDER_ACTIVE.step === 4) {
        if (this.ORDER_ACTIVE.payment_info) {
          this.updateOrderPaymentData()
            .then((res) => {
              if (res.status === 200) {
                this.CHANGE_ACTIVE_ORDER_TO_PENDING()
                  .then((res) => {
                    this.$router.push({ name: 'order-success', query: { orderId: res.data.id, paymentType: this.paymentType } })
                  })
              } else {
                this.err = res.response.data
              }
            })
        } else {
          this.createOrderPaymentData()
            .then((res) => {
              if (res.status === 200) {
                this.CHANGE_ACTIVE_ORDER_TO_PENDING()
                  .then((res) => {
                    this.$router.push({ name: 'order-success', query: { orderId: res.data.id, paymentType: this.paymentType } })
                  })
              } else {
                this.err = res.response.data
              }
            })
        }
      }
    },
    totalSum: function () {
      var result = 0
      if (this.ORDER_ACTIVE.basket.products) {
        for (var i = 0; i < this.ORDER_ACTIVE.basket.products.length; i++) {
          var product = this.ORDER_ACTIVE.basket.products[i]
          result += Number(product.current_price) * (product.quantity / product.base_amount)
        }
      }
      return result.toFixed(2)
    },
    totalSumWithDelivery: function (totalWithoutDelivery) {
      var result = 0
      if (this.ORDER_ACTIVE) {
        if (totalWithoutDelivery) {
          result = Number(totalWithoutDelivery) + Number(this.ORDER_ACTIVE.delivery_info.price)
        } else {
          result = Number(this.totalSum()) + Number(this.ORDER_ACTIVE.delivery_info.price)
        }
      }
      return result.toFixed(2)
    }
  },
  mounted () {
    this.GET_ACTIVE_ORDER_FROM_API()
      .then((res) => {
        var order = res.data
        if (order.private_info) {
          this.clientType = order.private_info.client_type
          this.lastName = order.private_info.last_name
          this.firstName = order.private_info.first_name
          this.middleName = order.private_info.middle_name
          this.phone = order.private_info.phone
          this.email = order.private_info.email
          this.personalData = order.private_info.personal_data
        } else {
          if (this.CURRENT_USER) {
            this.lastName = this.CURRENT_USER.last_name
            this.firstName = this.CURRENT_USER.first_name
            this.middleName = this.CURRENT_USER.middle_name
            this.email = this.CURRENT_USER.email
            if (this.CURRENT_USER.phones) this.phone = this.CURRENT_USER.phones[0].phone
          }
        }
        if (order.delivery_info) {
          this.deliveryAddress = order.delivery_info.to_address
          this.deliveryType = order.delivery_info.type
          var currentCity = this.CITIES.find(city => city.value === order.delivery_info.to_city)
          this.$refs.typeahead.inputValue = currentCity.text
          this.deliveryCity = currentCity.text
          this.deliveryTermsAgree = order.delivery_info.delivery_terms
          this.moscowTermsAgree = order.delivery_info.moscow_terms
          this.deliveryComment = order.delivery_info.comment
        }
        if (order.payment_info) {
          this.paymentType = order.payment_info.type
        }
      })
    this.GET_CITIES_FROM_API()
  },
  watch: {
    'ORDER_ACTIVE.step' (newVal) {
      if (newVal === 2) {
        const setFormValue = (i) => {
          this.$nextTick(() => {
            if (this.$refs.typeahead) {
              this.deliveryCity = this.CURRENT_CITY
              this.$refs.typeahead.inputValue = this.CURRENT_CITY
            } else {
              if (i < 1000) {
                setFormValue(i + 1)
              }
            }
          })
        }
        setFormValue(0)
      }
    },
    CURRENT_CITY (newVal) {
      if (this.ORDER_ACTIVE && this.ORDER_ACTIVE.step === 2) {
        this.deliveryCity = this.CURRENT_CITY
        this.$refs.typeahead.inputValue = this.CURRENT_CITY
      }
    },
    CURRENT_USER (newVal, oldVal) {
      if (newVal) {
        setTimeout(() => {
          if (this.ORDER_ACTIVE && this.ORDER_ACTIVE.private_info) {
            this.clientType = this.ORDER_ACTIVE.private_info.client_type
            this.lastName = this.ORDER_ACTIVE.private_info.last_name
            this.firstName = this.ORDER_ACTIVE.private_info.first_name
            this.middleName = this.ORDER_ACTIVE.private_info.middle_name
            this.phone = this.ORDER_ACTIVE.private_info.phone
            this.email = this.ORDER_ACTIVE.private_info.email
            this.personalData = this.ORDER_ACTIVE.private_info.personal_data
          } else {
            this.lastName = newVal.last_name
            this.firstName = newVal.first_name
            this.middleName = newVal.middle_name
            this.phone = newVal.phones[0].phone
            this.email = newVal.email
          }
          if (this.ORDER_ACTIVE && !this.ORDER_ACTIVE.delivery_info) {
            if (newVal.address) this.deliveryAddress = this.CURRENT_USER.address
            if (newVal.city !== '') var currentCity = this.CITIES.find(city => city.value === this.CURRENT_CITY)
            this.$refs.typeahead.inputValue = currentCity.text
            this.deliveryCity = currentCity.text
          }
        }, 500)
      }
    },
    paymentType (newVal, oldVal) {
      if (newVal === 'card') {
        this.steps.find(step => step.number === 4).nextText = 'перейти к оплате'
      } else {
        this.steps.find(step => step.number === 4).nextText = 'заказать!'
      }
    },
    deliveryCity (newVal, oldVal) {
      var cityName = this.deliveryCity
      if (cityName) {
        if (cityName === '' || cityName === 'Москва' || cityName === 'Кострома' || cityName === 'Санкт-Петербург') {
          this.deliveryOnlyCompany = false
        } else {
          this.deliveryType = 'company'
          this.deliveryOnlyCompany = true
        }
      }
    }
  }
}
</script>

<style lang="scss">
  textarea.form-input.form-control {
    -webkit-box-shadow: none;
    box-shadow: none;
    border-radius: 0;
    border: 0;
    border-bottom: 1px solid #bbb;
    font-size: 16px;
    padding: 20px;
  }

  .content-section .btn.btn-yellow.btn-order-rtn {
    display: inline-block;
    width: inherit;
    background-color: #a1a1a1;
    border: 1px solid #a1a1a1;
    color: #e1e1e1
  }

  .content-section .btn.btn-yellow.btn-order-rtn:active {
    background-color: #777 !important;
    border: 1px solid #777 !important;
    color: #d1d1d1 !important;
  }

  .product-sum .badge {
    font-size: 14px;
    line-height: 18px;
    background-color: #f3d64b;
    color: #555;
  }
</style>
