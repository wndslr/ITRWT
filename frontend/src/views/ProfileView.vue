<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useUserStore } from '@/stores/useUserStore.js'

const router = useRouter()
const store = useUserStore()

onMounted(() => {
  if (!store.isLoggedIn) router.push('/registration')
})

const logout = () => {
  store.logout()
  router.push('/')
}
</script>

<template>
  <AppHeader />

  <section class="page-head">
    <div class="container">
      <div class="page-head__inner">
        <h1 class="page-head__title">MY PROFILE</h1>
      </div>
    </div>
  </section>

  <section class="profile">
    <div class="container">
      <div class="profile__card">
        <div class="profile__avatar">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="16" r="10" stroke="currentColor" stroke-width="2"/>
            <path d="M6 44c0-10 8-18 18-18s18 8 18 18" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <div class="profile__info">
          <div class="profile__name" v-if="store.user">
            {{ store.user.firstName }} {{ store.user.lastName }}
          </div>
          <div class="profile__email" v-if="store.user">{{ store.user.email }}</div>
          <div class="profile__role" v-if="store.user">{{ store.user.role }}</div>
        </div>
        <button class="profile__logout" @click="logout">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7 1H2a1 1 0 00-1 1v14a1 1 0 001 1h5M13 13l4-4-4-4M17 9H7" stroke="currentColor" stroke-width="1.5"/>
          </svg>
          SIGN OUT
        </button>
      </div>
    </div>
  </section>

  <AppFooter />
</template>
