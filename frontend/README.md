# ITRWT — интернет-магазин (Vue 3 + Vite)

## Стек
- Vue 3 (Composition API, `<script setup>`)
- Vue Router 4
- Vite 6
- Шрифт Lato (Google Fonts)
- Брейкпоинты: mobile <768 (мин. 375px) / tablet 768–1599 / desktop 1600+

## Запуск (Arch Linux)
```bash
cd /home/wnd/ITRWT
npm install
npm run dev      # http://localhost:5173
npm run build    # прод-сборка в dist/
```

## Структура
```
src/
├── assets/
│   ├── style.css       # глобальные стили + переменные (твой исходный CSS + каталог/карточка)
│   └── img/            # ЗАГЛУШКИ — замени на ассеты из Figma (avatar.png, product-main.png, placeholder.png)
├── components/
│   ├── AppHeader.vue   # шапка + бургер-меню
│   ├── AppFooter.vue   # подвал + соцсети
│   ├── AppFeatures.vue # блок преимуществ
│   ├── AppSubscribe.vue# блок подписки
│   └── ProductCard.vue # карточка товара (переиспользуется)
├── views/
│   ├── HomeView.vue    # главная (из твоих исходных файлов)
│   ├── CatalogView.vue # lesson2: страница каталога
│   └── ProductView.vue # lesson2: карточка продукта
├── router/index.js     # маршруты: / /catalog /product /product/:id
├── App.vue
└── main.js

## lesson2 — что сделано
- ✅ Страница каталога: page-head, фильтр (CATEGORY/BRAND/DESIGNER), сортбар
  с дропдаунами (TRENDING/SIZE/PRICE), сетка товаров, пагинация
- ✅ Карточка продукта: галерея со стрелками, карточка внахлёст,
  опции (COLOR/SIZE/QUANTITY), Add to Cart, блок похожих
- ✅ Адаптив на 3 брейкпоинта для обеих страниц
- ✅ Каркас Vue 3 + Vite + Router (база для lesson3-6)

## Картинки
В src/assets/img/ лежат SVG-заглушки (с расширением .png).
Замени файлы на реальные из Figma, имена сохрани — код менять не нужно.
Для фоновых картинок (hero/subscribe) раскомментируй url() в style.css.
