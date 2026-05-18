<script setup>
import { ref, computed } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppSubscribe from '@/components/AppSubscribe.vue'
import AppFooter from '@/components/AppFooter.vue'

const items = ref([
  { id: 1, name: 'MANGO PEOPLE T-SHIRT', price: 300, color: 'Red', size: 'XL', qty: 2 },
  { id: 2, name: 'MANGO PEOPLE T-SHIRT', price: 300, color: 'Red', size: 'XL', qty: 2 }
])

const shipping = ref({ country: '', state: '', postcode: '' })

const subTotal = computed(() => items.value.reduce((s, i) => s + i.price * i.qty, 0))
const grandTotal = computed(() => subTotal.value)

const removeItem = (id) => { items.value = items.value.filter(i => i.id !== id) }
const clearCart = () => { items.value = [] }
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
      <div class="cart__layout">

        <!-- ITEMS -->
        <div>
          <div class="cart__items">
            <div class="cart-item" v-for="item in items" :key="item.id">
              <div class="cart-item__img"></div>
              <div class="cart-item__body">
                <div class="cart-item__name">{{ item.name }}</div>
                <div class="cart-item__meta">
                  Price: <strong>${{ item.price }}</strong><br />
                  Color: {{ item.color }}<br />
                  Size: {{ item.size }}<br />
                  <span class="cart-item__qty">
                    Quantity:
                    <input type="number" v-model="item.qty" min="1" />
                  </span>
                </div>
              </div>
              <button class="cart-item__remove" @click="removeItem(item.id)" aria-label="Remove">×</button>
            </div>
          </div>

          <div class="cart__actions">
            <button class="btn-cart-action" @click="clearCart">CLEAR SHOPPING CART</button>
            <router-link to="/catalog" class="btn-cart-action">CONTINUE SHOPPING</router-link>
          </div>
        </div>

        <!-- SIDEBAR -->
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
              <span class="amount">${{ subTotal }}</span>
            </div>
            <div class="totals-box__row grand">
              <span class="label">GRAND TOTAL</span>
              <span class="amount">${{ grandTotal }}</span>
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
