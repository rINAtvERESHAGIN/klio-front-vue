import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'

// import ArticleNewsDetail from '../views/k-article-news-detail.vue'
// import ArticleNewsList from '../views/k-article-news-list.vue'
import Contacts from '../views/k-contacts.vue'
// import Home from '../views/k-home.vue'
// import SearchResults from '../views/k-search-results.vue'
// import StaticPageDetail from '../views/k-static-page-detail.vue'
// import PageNotFound from '../views/k-page-not-found.vue'
// import Profile from '../views/k-profile.vue'
// Shop views
// import Basket from '../views/shop/k-basket.vue'
// import Catalog from '../views/shop/k-catalog.vue'
// import CategoryList from '../views/shop/k-category-list.vue'
// import Favorites from '../views/shop/k-favorites.vue'
// import OrderProcess from '../views/shop/k-order-process.vue'
import OrderSuccess from '../views/shop/k-order-success.vue'
// import OrderPaymentResult from '../views/shop/k-order-payment-result.vue'
// import Orders from '../views/shop/k-orders.vue'
// import SpecialList from '../views/shop/k-special-list.vue'
// import SpecialDetail from '../views/shop/k-special-detail.vue'
// import ProductDetail from '../views/shop/k-product-detail.vue'
// import ProductList from '../views/shop/k-category-products-list.vue'
// import BrandProductList from '../views/shop/k-brand-products-list.vue'
// import NewProductList from '../views/shop/k-new-products-list.vue'

// Registration views
// import Activation from '../views/registration/k-activation.vue'
// import PasswordChangeRequest from '../views/registration/k-password-change-request.vue'
// import PasswordReset from '../views/registration/k-password-reset.vue'
// import Registration from '../views/registration/k-registration.vue'

Vue.use(VueRouter)
Vue.use(VueMeta)

const routes = [
  {
    path: '/',
    name: 'home',
    // component: Home
    component: () => import('../views/k-home.vue')
  },
  {
    path: '/articles',
    name: 'articles',
    // component: ArticleNewsList
    component: () => import('../views/k-article-news-list.vue')
  },
  {
    path: '/articles/:article_name',
    name: 'article-detail',
    // component: ArticleNewsDetail
    component: () => import('../views/k-article-news-detail.vue')
  },
  // Shop views
  {
    path: '/basket',
    name: 'basket',
    // component: Basket
    component: () => import('../views/shop/k-basket.vue')
  },
  {
    path: '/catalog',
    name: 'catalog',
    // component: Catalog
    component: () => import('../views/shop/k-catalog.vue')
  },
  {
    path: '/catalog/categories/:category_name',
    name: 'categories',
    // component: CategoryList,
    component: () => import('../views/shop/k-category-list.vue'),
    props: true
  },
  {
    path: '/catalog/categories/:category_name/products',
    name: 'category-products',
    // component: ProductList,
    component: () => import('../views/shop/k-category-products-list.vue'),
    props: true
  },
  {
    path: '/catalog/brand/:brand_name/products',
    name: 'brand-products',
    // component: BrandProductList,
    component: () => import('../views/shop/k-brand-products-list.vue'),
    props: true
  },
  {
    path: '/new-products',
    name: 'new-products',
    // component: NewProductList,
    component: () => import('../views/shop/k-new-products-list.vue'),
    props: true
  },
  {
    path: '/catalog/products/:product_name',
    name: 'product-detail',
    // component: ProductDetail,
    component: () => import('../views/shop/k-product-detail.vue'),
    props: true
  },
  {
    path: '/contacts',
    name: 'contacts',
    // component: Contacts,
    component: () => import('../views/k-contacts.vue'),
    props: true
  },
  {
    path: '/favorites',
    name: 'favorites',
    // component: Favorites
    component: () => import('../views/shop/k-favorites.vue')
  },
  {
    path: '/info/:page_name',
    name: 'static-page',
    // component: StaticPageDetail,
    component: () => import('../views/k-static-page-detail.vue'),
    props: true
  },
  {
    path: '/news',
    name: 'news',
    // component: ArticleNewsList
    component: () => import('../views/k-article-news-list.vue')
  },
  {
    path: '/news/:news_name',
    name: 'news-detail',
    // component: ArticleNewsDetail
    component: () => import('../views/k-article-news-detail.vue')
  },
  {
    path: '/order/process',
    name: 'orderProcess',
    // component: OrderProcess
    component: () => import('../views/shop/k-order-process.vue')
  },
  {
    path: '/order/process/success',
    name: 'order-success',
    // component: OrderSuccess,
    component: () => import('../views/shop/k-order-success.vue'),
    props: route => route.query
  },
  {
    path: '/order/:orderId(\\d+)/payment/:status(success|fail)',
    // component: OrderPaymentResult,
    component: () => import('../views/shop/k-order-payment-result.vue'),
    props: true
  },
  {
    path: '/orders',
    name: 'orders',
    // component: Orders
    component: () => import('../views/shop/k-orders.vue')
  },
  {
    path: '/pass-change',
    name: 'password-change',
    component: () => import('../views/registration/k-password-change-request.vue')
  },
  {
    path: '/password/:user_id/set/:reset_code',
    name: 'PasswordReset',
    // component: PasswordReset,
    component: () => import('../views/registration/k-password-reset.vue'),
    props: true
  },
  {
    path: '/profile',
    name: 'profile',
    // component: Profile
    component: () => import('../views/k-profile.vue')
  },
  {
    path: '/register',
    name: 'register',
    // component: Registration
    component: () => import('../views/registration/k-registration.vue')
  },
  {
    path: '/register/activate/:activation_code',
    name: 'activate',
    // component: Activation,
    component: () => import('../views/registration/k-activation.vue'),
    props: true
  },
  {
    path: '/search',
    name: 'SearchResults',
    // component: SearchResults
    component: () => import('../views/k-search-results.vue')
  },
  {
    path: '/specials',
    name: 'specials',
    // component: SpecialList
    component: () => import('../views/shop/k-special-list.vue')
  },
  {
    path: '/specials/:special_name',
    name: 'special-detail',
    // component: SpecialDetail,
    component: () => import('../views/shop/k-special-detail.vue'),
    props: true
  },
  {
    path: '*',
    // component: PageNotFound
    component: () => import('../views/k-page-not-found.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.path !== from.path) {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

export default router
