<script setup>
import { ref } from 'vue'
const email = ref('')
const submit = () => { email.value = '' }
</script>

<template>
  <section class="subscribe">
    <div class="subscribe__bg"></div>
    <div class="container">
      <div class="subscribe__inner">
        <div class="subscribe__quote">
          <div class="subscribe__avatar">
            <img :src="'/img/subscribe-avatar.png'" alt="Avatar" />
          </div>
          <p>"Vestibulum quis porttitor dui! Quisque viverra nunc mi, a pulvinar purus condimentum"</p>
        </div>
        <div class="subscribe__form">
          <h2>SUBSCRIBE<br />FOR OUR NEWLETTER AND PROMOTION</h2>
          <div class="subscribe__field">
            <input
              v-model="email"
              type="email"
              placeholder="Enter Your Email"
              @keyup.enter="submit"
            />
            <button type="button" @click="submit">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
