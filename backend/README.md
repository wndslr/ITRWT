# ITRWT Backend

Express + MongoDB + JWT auth.

## Запуск

```bash
docker compose up -d        # mongo + mongo-express
npm install
npm run seed                # 5 категорий, 20 товаров, demo + admin юзеры
npm run dev                 # http://localhost:3000
```

Демо-аккаунты после seed:
- `demo@example.com  / demo12345`  (роль `user`)
- `admin@example.com / admin12345` (роль `admin`)

## Структура

```
backend/
├── docker-compose.yml
├── server.js
├── .env                       # PORT, MONGO_URI, JWT_SECRET, JWT_EXPIRES_IN
└── src/
    ├── app.js
    ├── db.js
    ├── seed.js
    ├── middleware/auth.js     # signToken, authRequired, adminOnly
    ├── routes/
    ├── controllers/
    └── models/
```

## Авторизация

Пароли хешируются через `bcryptjs` в pre-save hook.
При `register` и `login` сервер возвращает `{ user, token }`.
Защищённые эндпоинты ждут `Authorization: Bearer <token>`.

## Endpoints

### Public
- `POST   /api/user/register`  — `{ firstName, lastName, email, password, gender }` → `{ user, token }`
- `POST   /api/user/login`     — `{ email, password }` → `{ user, token }`
- `GET    /api/catalog`        — категории
- `GET    /api/catalog/categories` — корневые
- `GET    /api/product`        — список (page, limit, category, size, color)
- `GET    /api/product/:id`    — товар

### Auth required (Bearer token)
- `GET    /api/user/me`        — профиль
- `GET    /api/cart`           — корзина
- `POST   /api/cart`           — добавить позицию
- `PUT    /api/cart/:id`       — обновить
- `DELETE /api/cart/:id`       — удалить
- `DELETE /api/cart`           — очистить

### Admin only
- `GET    /api/user`           — список пользователей
- `POST   /api/catalog`        — создать категорию
- `POST   /api/product`        — создать товар
- `PUT    /api/product/:id`    — обновить
- `DELETE /api/product/:id`    — удалить

## Примеры (curl)

```bash
TOKEN=$(curl -s -X POST http://localhost:3000/api/user/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"demo@example.com","password":"demo12345"}' \
  | jq -r .token)

curl http://localhost:3000/api/user/me -H "Authorization: Bearer $TOKEN"
curl http://localhost:3000/api/cart    -H "Authorization: Bearer $TOKEN"
```
