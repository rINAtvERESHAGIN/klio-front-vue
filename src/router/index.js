import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
Vue.use(VueRouter)
Vue.use(VueMeta)

const routes = [
  {
    path: '/',
    name: 'home',
    // component: Home
    component: () => import(/* webpackChunkName: "home" */'../views/k-home.vue')
  },
  {
    path: '/articles',
    name: 'articles',
    // component: ArticleNewsList
    component: () => import(/* webpackChunkName: "articles" */'../views/k-article-news-list.vue')
  },
  {
    path: '/articles/:article_name',
    name: 'article-detail',
    // component: ArticleNewsDetail
    component: () => import(/* webpackChunkName: "article-detail" */'../views/k-article-news-detail.vue')
  },
  // Shop views
  {
    path: '/basket',
    name: 'basket',
    // component: Basket
    component: () => import(/* webpackChunkName: "basket" */'../views/shop/k-basket.vue')
  },
  {
    path: '/catalog',
    name: 'catalog',
    // component: Catalog
    component: () => import(/* webpackChunkName: "catalog" */'../views/shop/k-catalog.vue')
  },
  {
    path: '/catalog/categories/:category_name',
    name: 'catalog',
    // component: CategoryList,
    component: () => import(/* webpackChunkName: "catalog" */'../views/shop/k-category-list.vue'),
    props: true
  },
  {
    path: '/catalog/categories/:category_name/products',
    name: 'category-products',
    // component: ProductList,
    component: () => import(/* webpackChunkName: "category-products" */'../views/shop/k-category-products-list.vue'),
    props: true
  },
  {
    path: '/catalog/brand/:brand_name/products',
    name: 'brand-products',
    // component: BrandProductList,
    component: () => import(/* webpackChunkName: "brand-products" */'../views/shop/k-brand-products-list.vue'),
    props: true
  },
  {
    path: '/new-products',
    name: 'new-products',
    // component: NewProductList,
    component: () => import(/* webpackChunkName: "new-products" */'../views/shop/k-new-products-list.vue'),
    props: true
  },
  {
    path: '/catalog/products/:product_name',
    name: 'product-detail',
    // component: ProductDetail,
    component: () => import(/* webpackChunkName: "product-detail" */'../views/shop/k-product-detail.vue'),
    props: true
  },
  {
    path: '/contacts',
    name: 'contacts',
    // component: Contacts,
    component: () => import(/* webpackChunkName: "contacts" */'../views/k-contacts.vue'),
    props: true
  },
  {
    path: '/favorites',
    name: 'favorites',
    // component: Favorites
    component: () => import(/* webpackChunkName: "favorites" */'../views/shop/k-favorites.vue')
  },
  {
    path: '/info/:page_name',
    name: 'static-page',
    // component: StaticPageDetail,
    component: () => import(/* webpackChunkName: "static-page" */'../views/k-static-page-detail.vue'),
    props: true
  },
  {
    path: '/news',
    name: 'news',
    // component: ArticleNewsList
    component: () => import(/* webpackChunkName: "news" */'../views/k-article-news-list.vue')
  },
  {
    path: '/news/:news_name',
    name: 'news-detail',
    // component: ArticleNewsDetail
    component: () => import(/* webpackChunkName: "news-detail" */'../views/k-article-news-detail.vue')
  },
  {
    path: '/order/process',
    name: 'orderProcess',
    // component: OrderProcess
    component: () => import(/* webpackChunkName: "orderProcess" */'../views/shop/k-order-process.vue')
  },
  {
    path: '/order/process/success',
    name: 'order-success',
    // component: OrderSuccess,
    component: () => import(/* webpackChunkName: "order-success" */'../views/shop/k-order-success.vue'),
    props: route => route.query
  },
  {
    path: '/order/:orderId(\\d+)/payment/:status(success|fail)',
    // component: OrderPaymentResult,
    component: () => import(/* webpackChunkName: "success|fail" */'../views/shop/k-order-payment-result.vue'),
    props: true
  },
  {
    path: '/orders',
    name: 'orders',
    // component: Orders
    component: () => import(/* webpackChunkName: "orders" */'../views/shop/k-orders.vue')
  },
  {
    path: '/pass-change',
    name: 'password-change',
    component: () => import(/* webpackChunkName: "password-change" */'../views/registration/k-password-change-request.vue')
  },
  {
    path: '/password/:user_id/set/:reset_code',
    name: 'PasswordReset',
    // component: PasswordReset,
    component: () => import(/* webpackChunkName: "reset_code" */'../views/registration/k-password-reset.vue'),
    props: true
  },
  {
    path: '/profile',
    name: 'profile',
    // component: Profile
    component: () => import(/* webpackChunkName: "profile" */'../views/k-profile.vue')
  },
  {
    path: '/register',
    name: 'register',
    // component: Registration
    component: () => import(/* webpackChunkName: "register" */'../views/registration/k-registration.vue')
  },
  {
    path: '/register/activate/:activation_code',
    name: 'activate',
    // component: Activation,
    component: () => import(/* webpackChunkName: "activate" */'../views/registration/k-activation.vue'),
    props: true
  },
  {
    path: '/search',
    name: 'SearchResults',
    // component: SearchResults
    component: () => import(/* webpackChunkName: "search" */'../views/k-search-results.vue')
  },
  {
    path: '/specials',
    name: 'specials',
    // component: SpecialList
    component: () => import(/* webpackChunkName: "specials" */'../views/shop/k-special-list.vue')
  },
  {
    path: '/specials/:special_name',
    name: 'special-detail',
    // component: SpecialDetail,
    component: () => import(/* webpackChunkName: "special-detail" */'../views/shop/k-special-detail.vue'),
  },
  {
    path: '*',
    // component: PageNotFound
    component: () => import(/* webpackChunkName: "not-found" */'../views/k-page-not-found.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from) {
    if (to.path !== from.path) {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

export default router
