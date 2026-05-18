<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFeatures from '@/components/AppFeatures.vue'
import AppSubscribe from '@/components/AppSubscribe.vue'
import AppFooter from '@/components/AppFooter.vue'
import ProductCard from '@/components/ProductCard.vue'

const offers = [
  { mod: 'women', label: 'WOMEN' },
  { mod: 'men', label: 'MEN' },
  { mod: 'kids', label: 'KIDS' },
  { mod: 'accessories', label: 'ACCESSORIES' }
]
const products = Array.from({ length: 6 })
</script>

<template>
  <AppHeader />

  <section class="hero">
    <div class="hero__bg"></div>
    <div class="container">
      <div class="hero__inner">
        <div class="hero__text">
          <div class="hero__bar"></div>
          <h1 class="hero__title">
            THE BRAND<br />
            <span>OF LUXURIOUS</span><br />
            FASHION
          </h1>
        </div>
      </div>
    </div>
  </section>

  <section class="offer">
    <div class="container">
      <div class="offer__grid">
        <div
          v-for="o in offers"
          :key="o.mod"
          class="offer__card"
          :class="`offer__card--${o.mod}`"
          :style="{ backgroundImage: `url('/img/offer-${o.mod}.png')` }"
        >
          <div class="offer__overlay"></div>
          <div class="offer__label">
            <span>30% OFF</span>
            <em>{{ o.label }}</em>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="products">
    <div class="container">
      <div class="products__head">
        <h2 class="products__title">Featured Items</h2>
        <p class="products__subtitle">SHOP FOR ITEMS BASED ON CATEGORY</p>
      </div>
      <div class="products__grid">
        <ProductCard
          v-for="(p, i) in products" :key="i"
          :image="`/img/product-${(i % 6) + 1}.png`"
        />
      </div>
      <div class="products__more">
        <router-link to="/catalog" class="btn-outline">Browse All Product</router-link>
      </div>
    </div>
  </section>

  <AppFeatures />
  <AppSubscribe />
  <AppFooter />
</template>
