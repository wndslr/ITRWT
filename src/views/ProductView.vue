<script setup>
import { onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFeatures from '@/components/AppFeatures.vue'
import AppSubscribe from '@/components/AppSubscribe.vue'
import AppFooter from '@/components/AppFooter.vue'
import ProductCard from '@/components/ProductCard.vue'
import { useProductStore } from '@/stores/useProductStore.js'
import { useCartStore } from '@/stores/useCartStore.js'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()

const added = ref(false)

const loadProduct = () => {
  const id = route.params.id || 1
  productStore.getProduct(id)
}

onMounted(loadProduct)
watch(() => route.params.id, loadProduct)

const addToCart = async () => {
  if (!productStore.product) return
  await cartStore.addToCart({
    productId: productStore.product.id,
    title: productStore.product.title,
    price: productStore.product.price,
    color: productStore.product.color,
    size: productStore.product.size,
    qty: 1,
    image: null
  })
  added.value = true
  setTimeout(() => { added.value = false }, 2000)
}
</script>

<template>
  <AppHeader />

  <section class="page-head">
    <div class="container">
      <div class="page-head__inner">
        <h1 class="page-head__title">NEW ARRIVALS</h1>
        <nav class="breadcrumbs">
          <router-link to="/">HOME</router-link>
          <span>/</span><a href="#">MEN</a>
          <span>/</span><span class="is-active">NEW ARRIVALS</span>
        </nav>
      </div>
    </div>
  </section>

  <section class="product-page">
    <div class="product-gallery" v-if="!productStore.loading && productStore.product">
      <button class="gallery-arrow gallery-arrow--prev" aria-label="Previous">
        <svg width="9" height="14" viewBox="0 0 9 14" fill="none"><path d="M8 1L2 7l6 6" stroke="currentColor" stroke-width="2"/></svg>
      </button>
      <div class="container">
        <div class="product-gallery__inner">
          <img :src="productStore.product.image" :alt="productStore.product.title" />
        </div>
      </div>
      <button class="gallery-arrow gallery-arrow--next" aria-label="Next">
        <svg width="9" height="14" viewBox="0 0 9 14" fill="none"><path d="M1 1l6 6-6 6" stroke="currentColor" stroke-width="2"/></svg>
      </button>
    </div>
    <div class="product-gallery" v-else style="min-height:400px;background:#F7F7F7;"></div>

    <div class="container">
      <div v-if="productStore.loading" style="padding:48px;text-align:center;color:var(--text-muted)">Loading...</div>
      <div class="product-detail" v-else-if="productStore.product">
        <p class="product-detail__collection">{{ productStore.product.collection }}</p>
        <hr class="product-detail__divider" />
        <h1 class="product-detail__title">{{ productStore.product.title }}</h1>
        <p class="product-detail__desc">{{ productStore.product.desc }}</p>
        <span class="product-detail__price">${{ productStore.product.price }}</span>

        <hr class="product-detail__line" />

        <div class="product-detail__options">
          <button class="product-select">CHOOSE COLOR <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5"/></svg></button>
          <button class="product-select">CHOOSE SIZE <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5"/></svg></button>
          <button class="product-select">QUANTITY <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5"/></svg></button>
        </div>

        <div class="product-detail__addrow">
          <button class="btn-add-cart" @click="addToCart" :disabled="cartStore.loading">
            <svg width="27" height="25" viewBox="0 0 27 25" fill="none">
              <path d="M2 2h4l3 15h13l3-11H8" stroke="currentColor" stroke-width="2"/>
              <circle cx="10" cy="22" r="2" fill="currentColor"/>
              <circle cx="20" cy="22" r="2" fill="currentColor"/>
            </svg>
            {{ added ? '✓ Added!' : 'Add to Cart' }}
          </button>
        </div>
      </div>
    </div>
  </section>

  <section class="products" v-if="productStore.related.length">
    <div class="container">
      <div class="products__grid">
        <ProductCard
          v-for="p in productStore.related" :key="p.id"
          :id="p.id" :title="p.title" :desc="p.desc"
          :price="'$' + p.price + '.00'" :color="p.color" :size="p.size" :image="p.image"
        />
      </div>
    </div>
  </section>

  <AppFeatures />
  <AppSubscribe />
  <AppFooter />
</template>
