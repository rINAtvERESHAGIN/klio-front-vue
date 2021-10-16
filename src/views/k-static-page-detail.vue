<template>
  <b-row class="content-section">
    <b-col xs="12" sm="12" md="10" lg="10" xl="10" offset-md="1">
      <b-breadcrumb :items="breadcrumbs"/>
    </b-col>

    <b-col cols="10"
           offset-md="1"
           xl="10"
           lg="10"
           md="0"
           sm="0"
           xs="0"
           class="d-none d-lg-block d-xl-block"
    >
      <h1>{{ page.name }}</h1>
    </b-col>

    <b-col
      xl="0"
      lg="0"
      md="0"
      sm="12"
      xs="12"
      class="d-block d-sm-block d-md-block d-lg-none d-xl-none"
    >
      <h2>{{ page.name }}</h2>
    </b-col>
    <!-- desktop-->
    <b-col align-self="center"
           v-if="page.content"
           v-html="page.content"
           xl="10"
           lg="10"
           md="0"
           sm="0"
           xs="0"
           class="d-none d-lg-block d-xl-block"
           offset-md="1"
    />

    <!--    mobile-->
    <b-col
      xl="0"
      lg="0"
      md="0"
      sm="12"
      xs="12"
      class="d-block d-sm-block d-md-block d-lg-none d-xl-none"
      v-html="page.content"
      v-if="page_name !== 'about' && page.content"
    />

    <b-col
      xl="0"
      lg="0"
      md="0"
      sm="12"
      xs="12"
      class="d-block d-sm-block d-md-block d-lg-none d-xl-none"
      v-if="page_name === 'about'"
    >
      <p>Компания &laquo;Клио&raquo; успешно работает на рынке ювелирного оборудования Санкт-Петербурга, Москвы и
        Костромы уже более&nbsp; 30 лет. За это время мы успели обрести множество постоянных клиентов и прекрасно
        зарекомендовать себя.</p>
      <p>Все необходимое для ювелиров, крупных ювелирных предприятий и небольших ювелирных мастерских &ndash; в
        нашем магазине &laquo;Клио&raquo;. Высокое качество товаров, индивидуальный подход к каждому клиенту,
        консультации ювелиров, гарантии послепродажного обслуживания &ndash; залог доверия для наших клиентов.</p>
      <p>&nbsp;</p>
      <h2 style="text-align:center">Москва</h2>
      <table id="#new-table" align="center" border="1" cellpadding="1" cellspacing="1" style="width:100%">
        <tbody>
        <!--            -->
        <tr>
          <td>
            <p style="text-align:center"><strong>Геммологическое оборудование</strong></p>
            <p style="text-align:center"><strong>Все для ломбардов&nbsp;</strong></p>
            <p style="text-align:center"><strong>Весы</strong></p>
            <p style="text-align:center"><strong>Бинокулярные лупы</strong></p>
            <p style="text-align:center"><strong>Перчатки&nbsp;</strong></p>
          </td>
        </tr>
        <!---->
        <tr>
          <td style="text-align:center">Савушкина Ирина</td>
        </tr>
        <!---->
        <!---->
        <tr>
          <td style="text-align:center">+7(903) 679-02-21</td>
        </tr>
        <!---->
        <tr>
          <td>
            <p style="text-align:center">savushkina@kliogem.ru</p>
          </td>
        </tr>
        <!---->
        <tr>
          <td>
            <p style="text-align:center"><strong>Ювелирная упаковка</strong></p>
            <p style="text-align:center"><strong>Футляры</strong></p>
            <p style="text-align:center"><strong>Демонстрационное оборудование</strong></p>
          </td>
        </tr>
        <!--            -->
        <tr>
          <td style="text-align:center">
            <span style="text-align:center">Рудаков Михаил</span>
            <br/>
            <span style="text-align:center">Гвоздев Всеволод</span>
          </td>
        </tr>
        <!--            -->
        <tr>
          <td style="text-align:center">
            <span style="text-align:center">
            +7(903) 679-03-83
          </span>
            <br/>
            <span style="text-align:center">
            +7(963) 675-56-12
          </span>
          </td>
        </tr>
        <!--            -->
        <tr>
          <td style="text-align:center">
          <span style="text-align:center">
            rudakov@kliogem.ru
          </span>
            <br/>
            <span style="text-align:center">
              gvozdev@kliogem.ru
            </span>
          </td>
        </tr>
        <!--            -->
        <tr>
          <td style="text-align:center">
            <p style="text-align:center"><strong>Оборудование для зуботехнических лабораторий</strong></p>
            <p style="text-align:center"><strong>Ювелирное оборудование</strong></p>
            <p style="text-align:center"><strong>Расходные материалы</strong></p>
            <p style="text-align:center"><strong>Инструмент</strong></p>
          </td>
        </tr>
        <tr>
          <td style="text-align:center">Шишов Максим</td>
        </tr>
        <tr>
          <td style="text-align:center">+7(926) 941-16-38</td>
        </tr>
        <tr>
          <td style="text-align:center">shishov@kliogem.ru</td>
        </tr>
        <!--        -->
        <tr>
          <td style="text-align:center">
            <p style="text-align:center"><strong>Синтетические и полудрагоценные камни</strong></p>
            <p style="text-align:center"><strong>Заказы в Интернет-магазине</strong></p>
            <p style="text-align:center"><strong>Ремонт и гарантийное обслуживание оборудования</strong></p>
          </td>
        </tr>
        <tr>
          <td style="text-align:center">Курепкин Сергей</td>
        </tr>
        <tr>
          <td style="text-align:center">+7(903) 678-99-82</td>
        </tr>
        <tr>
          <td>
            <p style="text-align:center">&nbsp;kurepkin@kliogem.ru</p>
          </td>
        </tr>
        <!--            -->
        </tbody>
      </table>
      <p>&nbsp;</p>
      <!--      --------------------------        -->
      <h2 style="text-align:center">Санкт-Петербург</h2>
      <table align="center" border="1" cellpadding="1" cellspacing="1" style="width:100%">
        <tbody>
        <tr>
          <td>
            <p style="text-align:center">
              <strong>
                Ювелирная упаковка<br/>
                Футляры<br/>
                Демонстрационное оборудование
              </strong>
            </p>
            <!---->
            <p style="text-align:center">
              <strong>Ювелирное оборудование<br/>
                Расходные материалы<br/>
                Инструмент</strong>
            </p>
          </td>
        </tr>
        <tr>
          <td style="text-align:center">Симаков Денис</td>
        </tr>
        <tr>
          <td style="text-align:center">+7(921)766-77-09</td>
        </tr>
        <tr>
          <td style="text-align:center">
            spb@kliogem.ru
            <br/>
            simakov@kliogem.ru
          </td>
        </tr>
        </tbody>
      </table>
      <p>&nbsp;</p>
      <h2 style="text-align:center">Кострома</h2>
      <table align="center" border="1" cellpadding="1" cellspacing="1" style="width:100%">
        <tbody>
        <tr>
          <td>
            <p style="text-align:center"><strong>Ювелирная упаковка<br/>
              Футляры<br/>
              Демонстрационное оборудование</strong></p>
            <!---->
            <p style="text-align:center"><strong>Ювелирное оборудование<br/>
              Расходные материалы<br/>
              Инструмент</strong></p>
          </td>
        </tr>
        <tr>
          <td style="text-align:center">Пухов Артем</td>
        </tr>
        <tr>
          <td style="text-align:center">+7(915) 901-58-02</td>
        </tr>
        <tr>
          <td style="text-align:center">puhov@kliogem.ru</td>
        </tr>
        </tbody>
      </table>
      <p>&nbsp;</p>
    </b-col>

  </b-row>
</template>

<script>
// import { preloader } from '../preloader'

export default {
  name: 'k-static-page-detail',
  metaInfo () {
    return {
      title: this.page ? this.page.meta_title : '',
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: this.page ? this.page.meta_description : ''
        },
        {
          vmid: 'keywords',
          name: 'keywords',
          content: this.page ? this.page.meta_keywords : ''
        }
      ]
    }
  },
  props: ['page_name'],
  data () {
    return {
      page: null,
      pageStatus: 'pending'
    }
  },
  async serverPrefetch () {
    await this.do_axios()
    // preloader.add(this.page, 'pageContent')
    // preloader.add(this.breadcrumbs, 'breadcrumbs')
    return true
  },
  created () {
    this.page = this.$preloaded.pageContent
    this.breadcrumbs = this.$preloaded.breadcrumbs
  },
  mounted () {
    if (!this.page) {
      this.do_axios()
    }
  },
  watch: {
    page_name () {
    },
    $route () {
      this.do_axios()
    }
  },
  methods: {
    getBreadcrumbs () {
      return [
        {
          text: 'Главная',
          to: { name: 'home' }
        },
        {
          text: this.page.name,
          active: true
        }
      ]
    },
    do_axios () {
      return this.$axios
        .get(`/general/pages/${this.page_name}/detail`)
        .then(response => {
          this.page = response.data
          this.breadcrumbs = this.getBreadcrumbs()
          return true
        })
    }
  }
}
</script>

<style>

</style>
