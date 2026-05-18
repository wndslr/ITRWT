<script setup>
defineProps({
  title: { type: String, default: 'ELLERY X M\'O CAPSULE' },
  desc: { type: String, default: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.' },
  price: { type: String, default: '$52.00' },
  image: { type: String, default: '' }
})
</script>

<template>
  <article class="product">
    <div class="product__image">
      <img v-if="image" :src="image" :alt="title" />
      <div class="product__hover">
        <button class="add-to-cart">
          <svg width="27" height="25" viewBox="0 0 27 25" fill="none">
            <path d="M2 2h4l3 15h13l3-11H8" stroke="currentColor" stroke-width="2"/>
            <circle cx="10" cy="22" r="2" fill="currentColor"/>
            <circle cx="20" cy="22" r="2" fill="currentColor"/>
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
    <div class="product__info">
      <h3>{{ title }}</h3>
      <p>{{ desc }}</p>
      <span class="product__price">{{ price }}</span>
    </div>
  </article>
</template>
