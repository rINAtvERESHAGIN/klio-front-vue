<template>
  <b-row class="content-section">
    <b-col cols="12" lg="10" xl="8" offset-lg="1" offset-xl="2">
      <div class="personal-info-blk">
        <b-nav tabs justified>
          <b-nav-item active>Профиль</b-nav-item>
          <b-nav-item :to="{ name: 'orders' }">Заказы</b-nav-item>
          <b-nav-item :to="{ name: 'favorites' }">Избранное</b-nav-item>
          <b-nav-item :to="{ name: 'basket' }">Корзина</b-nav-item>
        </b-nav>
        <b-container fluid>
          <b-row v-if="CURRENT_USER">
            <b-col cols="12" md="8" offset-md="2">
              <h1>Мои данные</h1>
              <p>E-mail: {{ CURRENT_USER.email }}</p>
              <p>Зарегистрирован: {{ CURRENT_USER.registered }}</p>
              <p>Время последнего входа: {{ CURRENT_USER.last_login }}</p>
              <b-form @submit.prevent="updateUser" method="UPDATE">
                <p class="form-error error-right" v-if="err && err.username">{{ err.username[0] }}</p>
                <b-input-group>
                  <label for="field-username"><span>*</span></label>
                  <b-form-input v-model="CURRENT_USER.username" id="field-username" placeholder="Логин" class="form-input"></b-form-input>
                </b-input-group>
                <p class="form-error error-right" v-if="err && err.last_name">{{ err.last_name[0] }}</p>
                <b-input-group>
                  <label for="field-surname"></label>
                  <b-form-input v-model="CURRENT_USER.last_name" id="field-surname" placeholder="Фамилия" value="Иванов" class="form-input"></b-form-input>
                </b-input-group>
                <p class="form-error error-right" v-if="err && err.first_name">{{ err.first_name[0] }}</p>
                <b-input-group class="required">
                  <label for="field-name"><span>*</span></label>
                  <b-form-input v-model="CURRENT_USER.first_name" id="field-name" placeholder="Имя" class="form-input"></b-form-input>
                </b-input-group>
                <p class="form-error error-right" v-if="err && err.middle_name">{{ err.middle_name[0] }}</p>
                <b-input-group>
                  <label for="field-middle-name"></label>
                  <b-form-input v-model="CURRENT_USER.middle_name" id="field-middle-name" placeholder="Отчество" class="form-input"></b-form-input>
                </b-input-group>
                <p class="form-error error-right" v-if="err && err.birthday">{{ err.birthday[0] }}</p>
                <b-input-group id="birthday-input-group">
                  <label for="field-birthday"></label>
                  <b-form-datepicker id="field-birthday" v-model="CURRENT_USER.birthday" placeholder="Дата рождения (ЧЧ.ММ.ГГГГ)" class="form-input"></b-form-datepicker>
                </b-input-group>
                <!-- TODO: -->
                <!-- <b-input-group>
                  <label for="field-phone"></label>
                  <b-form-input v-model="CURRENT_USER.phones[0].phone" id="field-phone" placeholder="Телефон (+7(XXX)XXX-XX-XX)" class="form-input"></b-form-input>
                  <template v-slot:append>
                    <b-dropdown :text="getPhoneLabel()" variant="outline-secondary">
                      <b-dropdown-item>Мобильный</b-dropdown-item>
                      <b-dropdown-item>Рабочий</b-dropdown-item>
                    </b-dropdown>
                  </template>
                </b-input-group> -->
                <!-- <p class="form-error error-right" v-if="err && err.country">{{ err.country[0] }}</p>
                <b-input-group>
                  <label for="field-country"></label>
                  <b-form-input v-model="CURRENT_USER.country" id="field-country" placeholder="Страна" class="form-input"></b-form-input>
                </b-input-group> -->
                <!-- <p class="form-error error-right" v-if="err && err.city">{{ err.city[0] }}</p>
                <b-input-group>
                  <label for="field-city"></label>
                  <b-form-input v-model="CURRENT_USER.city" id="field-city" placeholder="Город" class="form-input"></b-form-input>
                </b-input-group> -->
                <p class="form-error error-right" v-if="err && err.city">{{ err.city[0] }}</p>
                <b-input-group v-if="CITIES">
                  <label for="field-city"></label>
                  <client-only>
                    <vue-bootstrap-typeahead
                      v-model="city"
                      ref="typeahead"
                      :data="citiesFiltered"
                      :serializer="s => s.text"
                      :minMatchingChars=1
                      inputClass="form-input"
                      id="field-city"
                      class="w-100"
                      placeholder="Выберите город"
                      @hit="CURRENT_USER.city = $event.text"
                    />
                  </client-only>
                </b-input-group>
                <p class="form-error error-right" v-if="err && err.address">{{ err.address[0] }}</p>
                <b-input-group>
                  <label for="field-address"></label>
                  <b-form-input v-model="CURRENT_USER.address" id="field-address" placeholder="Адрес" class="form-input"></b-form-input>
                </b-input-group>

                <b-button squared class="btn-yellow" type="submit">Изменить данные</b-button>
              </b-form>
              <b-button squared class="btn-yellow" :to="{ name: 'password-change' }">Сменить пароль</b-button>
            </b-col>
          </b-row>
          <p v-else class="profile-empty-msg">
            Для доступа к профилю <b-link v-b-modal.modal-login>войдите</b-link>
          </p>
        </b-container>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'k-profile',
  metaInfo: {
    title: 'Профиль пользователя',
    meta: [
      { vmid: 'description', name: 'description', content: 'Профиль пользователя на сайте Интернет-магазина Клио' },
      { vmid: 'keywords', name: 'keywords', content: 'профиль, Клио, магазин, инструмент для ювелиров, зуботехническое оборудование, ювелирная упаковка' }
    ]
  },
  data () {
    return {
      city: '',
      err: null
    }
  },
  computed: {
    ...mapGetters([
      'CITIES',
      'CURRENT_USER',
      'CURRENT_CITY'
    ]),
    citiesFiltered () {
      return this.CITIES.filter(el => el.text !== null)
    }
  },
  methods: {
    ...mapActions([
      'GET_CITIES_FROM_API',
      'GET_CURRENT_USER_FROM_API',
      'UPDATE_USER'
    ]),
    getCityValue () {
      if (this.CURRENT_USER) {
        var cityItem = this.CITIES.find(city => city.text === this.CURRENT_USER.city)
        return cityItem ? cityItem.value : null
      }
    },
    updateUser () {
      var userData = {
        username: this.CURRENT_USER.username,
        last_name: this.CURRENT_USER.last_name,
        first_name: this.CURRENT_USER.first_name,
        middle_name: this.CURRENT_USER.middle_name,
        birthday: this.CURRENT_USER.birthday,
        // country: this.CURRENT_USER.country,
        city: this.getCityValue(),
        address: this.CURRENT_USER.address
      }
      this.UPDATE_USER(userData)
        .then((res) => {
          if (res.status === 200) {
            this.err = null
          } else {
            this.err = res.response.data
          }
        })
    },
    setCityValueInField (val) {
      this.$nextTick(() => {
        if (this.$refs.typeahead) {
          this.$refs.typeahead.inputValue = val
        } else {
          this.setValue && this.setValue(val)
        }
      })
    }
  },
  mounted () {
    this.GET_CITIES_FROM_API()
    if (this.CURRENT_CITY) {
      this.setCityValueInField(this.CURRENT_CITY)
    }
  },
  watch: {
    CURRENT_CITY: {
      handler (val) {
        this.setCityValueInField(val)
      }
    }
  }
}
</script>

<style lang="scss">
  .profile-empty-msg {
    font-size: 24px;
    text-align: center;
    padding: 1rem 0 3rem 0;
    a {
      color: inherit;
      text-decoration: underline;
      &:hover {
        color: inherit;
      }
    }
  }

  #birthday-input-group {
    min-height: 40px;
    input {
      padding-left: 30px;
    }
  }

  #birthday-input-group .form-input {
    box-shadow: none;
  }
</style>
