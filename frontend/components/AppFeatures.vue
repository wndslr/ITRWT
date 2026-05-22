<script setup>
const features = [
  {
    title: 'Free Delivery',
    text: 'Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive models.',
    icon: 'truck'
  },
  {
    title: 'Sales & discounts',
    text: 'Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive models.',
    icon: 'tag'
  },
  {
    title: 'Quality assurance',
    text: 'Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive models.',
    icon: 'crown'
  }
]
</script>

<template>
  <section class="features">
    <div class="container">
      <div class="features__grid">
        <div class="feature" v-for="f in features" :key="f.title">
          <div class="feature__icon">
            <svg v-if="f.icon === 'truck'" width="46" height="35" viewBox="0 0 46 35" fill="none">
              <rect x="1" y="6" width="27" height="20" stroke="currentColor" stroke-width="2"/>
              <path d="M28 12h8l8 8v6H28" stroke="currentColor" stroke-width="2"/>
              <circle cx="10" cy="29" r="4" stroke="currentColor" stroke-width="2"/>
              <circle cx="35" cy="29" r="4" stroke="currentColor" stroke-width="2"/>
            </svg>
            <svg v-else-if="f.icon === 'tag'" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="15" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3"/>
              <path d="M14 26L26 14M16 16h.01M24 24h.01" stroke="currentColor" stroke-width="2"/>
            </svg>
            <svg v-else width="46" height="32" viewBox="0 0 46 32" fill="none">
              <path d="M3 8l8 14h24l8-14-10 7-10-14-10 14L3 8z" stroke="currentColor" stroke-width="2"/>
              <path d="M11 27h24" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <h3 class="feature__title">{{ f.title }}</h3>
          <p class="feature__text">{{ f.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
