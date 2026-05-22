import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/catalog', name: 'catalog', component: () => import('@/views/CatalogView.vue') },
  { path: '/product', name: 'product', component: () => import('@/views/ProductView.vue') },
  { path: '/product/:id', name: 'product-id', component: () => import('@/views/ProductView.vue') },
  { path: '/cart', name: 'cart', component: () => import('@/views/CartView.vue') },
  { path: '/registration', name: 'registration', component: () => import('@/views/RegistrationView.vue') },
  { path: '/profile', name: 'profile', component: () => import('@/views/ProfileView.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
