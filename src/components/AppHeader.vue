<script setup>
import { ref, onMounted } from 'vue'
import { useCartStore } from '@/stores/useCartStore.js'

const navOpen = ref(false)
const toggleNav = () => { navOpen.value = !navOpen.value }
const closeNav = () => { navOpen.value = false }

const cartStore = useCartStore()
onMounted(() => cartStore.getCart())
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <router-link to="/" class="logo" aria-label="Home">
          <span class="logo__mark"></span>
          <span class="logo__text">BRAND</span>
        </router-link>

        <button
          class="burger"
          :class="{ 'is-open': navOpen }"
          :aria-expanded="navOpen ? 'true' : 'false'"
          aria-label="Menu"
          @click="toggleNav"
        >
          <span></span><span></span><span></span>
        </button>

        <nav class="nav" :class="{ 'is-open': navOpen }">
          <ul class="nav__list" @click="closeNav">
            <li><router-link to="/">HOME</router-link></li>
            <li><router-link to="/catalog">CATALOG</router-link></li>
            <li><router-link to="/product/1">PRODUCT</router-link></li>
          </ul>
        </nav>

        <div class="header__actions">
          <button class="icon-btn" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="8.5" cy="8.5" r="7" stroke="currentColor" stroke-width="2"/>
              <path d="M14 14L19 19" stroke="currentColor" stroke-width="2"/>
            </svg>
          </button>
          <router-link to="/registration" class="icon-btn" aria-label="Account">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="6.5" r="4" stroke="currentColor" stroke-width="2"/>
              <path d="M2 19c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" stroke-width="2"/>
            </svg>
          </router-link>
          <router-link to="/cart" class="icon-btn" aria-label="Cart">
            <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
              <path d="M1 1h3l2.5 12h11l2-8H6" stroke="currentColor" stroke-width="2"/>
              <circle cx="8" cy="18" r="1.5" fill="currentColor"/>
              <circle cx="17" cy="18" r="1.5" fill="currentColor"/>
            </svg>
            <span class="icon-btn__count" v-if="cartStore.itemCount > 0">{{ cartStore.itemCount }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>
