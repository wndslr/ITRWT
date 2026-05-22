<script setup>
import { onMounted } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFeatures from '@/components/AppFeatures.vue'
import AppSubscribe from '@/components/AppSubscribe.vue'
import AppFooter from '@/components/AppFooter.vue'
import ProductCard from '@/components/ProductCard.vue'
import { useCatalogStore } from '@/stores/useCatalogStore.js'

const store = useCatalogStore()
onMounted(() => store.getCatalog())

const categories = ['Accessories','Bags','Denim','Hoodies & Sweatshirts','Jackets & Coats','Polos','Shirts','Shoes','Sweaters & Knits','T-Shirts','Tanks']
const sizes = ['XS','S','M','L']

import { ref } from 'vue'
const openDropdown = ref(null)
const toggleDropdown = (name) => { openDropdown.value = openDropdown.value === name ? null : name }
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

  <section class="catalog">
    <div class="container">
      <div class="catalog__layout">

        <aside class="filter">
          <div class="filter__head">
            FILTER
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
              <path d="M0 1h18M3 7h12M6 13h6" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <div class="filter__group">
            <div class="filter__group-title">CATEGORY</div>
            <ul class="filter__list">
              <li
                v-for="c in categories" :key="c"
                :class="{ 'is-active': store.filters.category === c }"
                @click="store.setFilter('category', store.filters.category === c ? '' : c)"
              >{{ c }}</li>
            </ul>
          </div>
          <div class="filter__group"><div class="filter__group-title">BRAND</div></div>
          <div class="filter__group"><div class="filter__group-title">DESIGNER</div></div>
        </aside>

        <div class="catalog__main">
          <div class="sortbar">
            <div class="sortbar__item" :class="{ 'is-open': openDropdown === 'trending' }">
              <button class="sortbar__btn" @click="toggleDropdown('trending')">
                TRENDING NOW
                <svg class="sortbar__arrow" width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5"/>
                </svg>
              </button>
            </div>
            <div class="sortbar__item" :class="{ 'is-open': openDropdown === 'size' }">
              <button class="sortbar__btn" @click="toggleDropdown('size')">
                SIZE
                <svg class="sortbar__arrow" width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5"/>
                </svg>
              </button>
              <div class="sortbar__dropdown">
                <label v-for="s in sizes" :key="s">
                  <input type="checkbox"
                    :checked="store.filters.size === s"
                    @change="store.setFilter('size', store.filters.size === s ? '' : s)"
                  /> {{ s }}
                </label>
              </div>
            </div>
            <div class="sortbar__item" :class="{ 'is-open': openDropdown === 'price' }">
              <button class="sortbar__btn" @click="toggleDropdown('price')">
                PRICE
                <svg class="sortbar__arrow" width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5"/>
                </svg>
              </button>
            </div>
          </div>

          <div v-if="store.loading" style="padding:32px;color:var(--text-muted)">Loading...</div>
          <div class="catalog__grid" v-else>
            <ProductCard
              v-for="p in store.items" :key="p.id"
              :id="p.id"
              :title="p.title"
              :desc="p.desc"
              :price="'$' + p.price + '.00'"
              :color="p.color"
              :size="p.size"
              :image="p.image"
            />
          </div>

          <div class="pagination">
            <div class="pagination__inner">
              <button class="pagination__arrow" :disabled="store.page <= 1" @click="store.setPage(store.page - 1)">
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M7 1L2 6l5 5" stroke="currentColor" stroke-width="2"/></svg>
              </button>
              <button
                v-for="p in store.totalPages" :key="p"
                class="pagination__page"
                :class="{ 'is-active': store.page === p }"
                @click="store.setPage(p)"
              >{{ p }}</button>
              <button class="pagination__arrow" :disabled="store.page >= store.totalPages" @click="store.setPage(store.page + 1)">
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M1 1l5 5-5 5" stroke="currentColor" stroke-width="2"/></svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <AppFeatures />
  <AppSubscribe />
  <AppFooter />
</template>
