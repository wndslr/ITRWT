<script setup>
import { onMounted } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppSubscribe from '@/components/AppSubscribe.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useCartStore } from '@/stores/useCartStore.js'

const store = useCartStore()
onMounted(() => store.getCart())

const shipping = { country: '', state: '', postcode: '' }
</script>

<template>
  <AppHeader />

  <section class="page-head">
    <div class="container">
      <div class="page-head__inner">
        <h1 class="page-head__title">SHOPPING CART</h1>
      </div>
    </div>
  </section>

  <section class="cart">
    <div class="container">
      <div v-if="store.loading" style="padding:48px;color:var(--text-muted)">Loading...</div>
      <div class="cart__layout" v-else>

        <div>
          <div class="cart__items">
            <div class="cart-item" v-for="item in store.items" :key="item.id">
              <div class="cart-item__img" :style="item.image ? { backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}"></div>
              <div class="cart-item__body">
                <div class="cart-item__name">{{ item.title }}</div>
                <div class="cart-item__meta">
                  Price: <strong>${{ item.price }}</strong><br />
                  Color: {{ item.color }}<br />
                  Size: {{ item.size }}<br />
                  <span class="cart-item__qty">
                    Quantity:
                    <input type="number" :value="item.qty" min="1"
                      @change="store.updateCart(item.id, { qty: +$event.target.value })" />
                  </span>
                </div>
              </div>
              <button class="cart-item__remove" @click="store.deleteFromCart(item.id)" aria-label="Remove">×</button>
            </div>
          </div>

          <div class="cart__actions">
            <button class="btn-cart-action" @click="store.clearCartAll">CLEAR SHOPPING CART</button>
            <router-link to="/catalog" class="btn-cart-action">CONTINUE SHOPPING</router-link>
          </div>
        </div>

        <div class="cart__sidebar">
          <div class="shipping-box">
            <div class="shipping-box__title">SHIPPING ADRESS</div>
            <input v-model="shipping.country" type="text" placeholder="Bangladesh" />
            <input v-model="shipping.state" type="text" placeholder="State" />
            <input v-model="shipping.postcode" type="text" placeholder="Postcode / Zip" />
            <button class="btn-quote">GET A QUOTE</button>
          </div>

          <div class="totals-box">
            <div class="totals-box__row">
              <span class="label">SUB TOTAL</span>
              <span class="amount">${{ store.subTotal }}</span>
            </div>
            <div class="totals-box__row grand">
              <span class="label">GRAND TOTAL</span>
              <span class="amount">${{ store.grandTotal }}</span>
            </div>
            <button class="btn-checkout">PROCEED TO CHECKOUT</button>
          </div>
        </div>

      </div>
    </div>
  </section>

  <AppSubscribe />
  <AppFooter />
</template>
