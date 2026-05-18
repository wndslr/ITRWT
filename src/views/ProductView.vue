<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFeatures from '@/components/AppFeatures.vue'
import AppSubscribe from '@/components/AppSubscribe.vue'
import AppFooter from '@/components/AppFooter.vue'
import ProductCard from '@/components/ProductCard.vue'

const related = Array.from({ length: 3 })
</script>

<template>
  <AppHeader />

  <section class="page-head">
    <div class="container">
      <div class="page-head__inner">
        <h1 class="page-head__title">NEW ARRIVALS</h1>
        <nav class="breadcrumbs">
          <router-link to="/">HOME</router-link>
          <span>/</span>
          <a href="#">MEN</a>
          <span>/</span>
          <span class="is-active">NEW ARRIVALS</span>
        </nav>
      </div>
    </div>
  </section>

  <section class="product-page">
    <div class="product-gallery">
      <button class="gallery-arrow gallery-arrow--prev" aria-label="Previous">
        <svg width="9" height="14" viewBox="0 0 9 14" fill="none">
          <path d="M8 1L2 7l6 6" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>
      <div class="container">
        <div class="product-gallery__inner">
          <img :src="'/img/product-5.png'" alt="Moschino Cheap and Chic" />
        </div>
      </div>
      <button class="gallery-arrow gallery-arrow--next" aria-label="Next">
        <svg width="9" height="14" viewBox="0 0 9 14" fill="none">
          <path d="M1 1l6 6-6 6" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>
    </div>

    <div class="container">
      <div class="product-detail">
        <p class="product-detail__collection">WOMEN COLLECTION</p>
        <hr class="product-detail__divider" />
        <h1 class="product-detail__title">MOSCHINO CHEAP AND CHIC</h1>
        <p class="product-detail__desc">
          Compellingly actualize fully researched processes before proactive outsourcing.
          Progressively syndicate collaborative architectures before cutting-edge services. Completely
          visualize parallel core competencies rather than exceptional portals.
        </p>
        <span class="product-detail__price">$561</span>

        <hr class="product-detail__line" />

        <div class="product-detail__options">
          <button class="product-select">
            CHOOSE COLOR
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5"/>
            </svg>
          </button>
          <button class="product-select">
            CHOOSE SIZE
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5"/>
            </svg>
          </button>
          <button class="product-select">
            QUANTITY
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5"/>
            </svg>
          </button>
        </div>

        <div class="product-detail__addrow">
          <button class="btn-add-cart">
            <svg width="27" height="25" viewBox="0 0 27 25" fill="none">
              <path d="M2 2h4l3 15h13l3-11H8" stroke="currentColor" stroke-width="2"/>
              <circle cx="10" cy="22" r="2" fill="currentColor"/>
              <circle cx="20" cy="22" r="2" fill="currentColor"/>
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </section>

  <section class="products">
    <div class="container">
      <div class="products__grid">
        <ProductCard
          v-for="(p, i) in related" :key="i"
          :image="`/img/product-${(i % 6) + 1}.png`"
        />
      </div>
    </div>
  </section>

  <AppFeatures />
  <AppSubscribe />
  <AppFooter />
</template>
