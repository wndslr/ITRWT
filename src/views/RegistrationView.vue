<script setup>
import { ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppSubscribe from '@/components/AppSubscribe.vue'
import AppFooter from '@/components/AppFooter.vue'

const form = ref({
  firstName: '',
  lastName: '',
  gender: '',
  email: '',
  password: ''
})

const perks = [
  '15% off welcome offer',
  'Free shipping, returns and exchanges on all orders',
  '$10 off a purchase on your birthday',
  'Early access to products',
  'Exclusive offers & rewards'
]

const submit = () => {
  console.log('register', form.value)
}
</script>

<template>
  <AppHeader />

  <section class="page-head">
    <div class="container">
      <div class="page-head__inner">
        <h1 class="page-head__title">REGISTRATION</h1>
      </div>
    </div>
  </section>

  <section class="registration">
    <div class="container">
      <div class="registration__layout">

        <form class="reg-form" @submit.prevent="submit">
          <div class="reg-form__section-label">Your Name</div>
          <input type="text" v-model="form.firstName" placeholder="First Name" />
          <input type="text" v-model="form.lastName" placeholder="Last Name" />

          <div class="reg-form__gender">
            <label>
              <input type="radio" v-model="form.gender" value="male" />
              Male
            </label>
            <label>
              <input type="radio" v-model="form.gender" value="female" />
              Female
            </label>
          </div>

          <div class="reg-form__section-label">Login details</div>
          <input type="email" v-model="form.email" placeholder="Email" />
          <input type="password" v-model="form.password" placeholder="Password" />
          <p class="reg-form__hint">
            Please use 8 or more characters, with at least 1 number and a mixture of uppercase and lowercase letters
          </p>

          <button type="submit" class="btn-join">
            JOIN NOW
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M1 6h14M9 1l6 5-6 5" stroke="currentColor" stroke-width="1.5"/>
            </svg>
          </button>
        </form>

        <div class="reg-perks">
          <h2 class="reg-perks__title">LOYALTY HAS ITS PERKS</h2>
          <p class="reg-perks__desc">
            Get in on the loyalty program where you can earn points and unlock serious perks. Starting with these as soon as you join:
          </p>
          <ul class="reg-perks__list">
            <li v-for="perk in perks" :key="perk">
              <span class="reg-perks__check">
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                  <path d="M1 5l4 4L13 1" stroke="currentColor" stroke-width="2"/>
                </svg>
              </span>
              {{ perk }}
            </li>
          </ul>
        </div>

      </div>
    </div>
  </section>

  <AppSubscribe />
  <AppFooter />
</template>
