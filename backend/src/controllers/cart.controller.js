import Cart from '../models/cart.model.js'
import Product from '../models/product.model.js'

const getUserId = (req) => req.user.id

const findOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId })
  if (!cart) cart = await Cart.create({ user: userId, items: [] })
  return cart
}

export const getCart = async (req, res) => {
  try {
    const cart = await findOrCreateCart(getUserId(req))
    res.json(cart)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const addToCart = async (req, res) => {
  try {
    const { productId, color, size, qty = 1 } = req.body
    const product = await Product.findById(productId)
    if (!product) return res.status(404).json({ error: 'Product not found' })

    const cart = await findOrCreateCart(getUserId(req))
    const existing = cart.items.find(
      i => i.product.toString() === productId && i.color === color && i.size === size
    )

    if (existing) {
      existing.qty += qty
    } else {
      cart.items.push({
        product: product._id,
        title: product.title,
        price: product.price,
        image: product.image,
        color,
        size,
        qty
      })
    }

    await cart.save()
    res.json(cart)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const updateCartItem = async (req, res) => {
  try {
    const cart = await findOrCreateCart(getUserId(req))
    const item = cart.items.id(req.params.id)
    if (!item) return res.status(404).json({ error: 'Cart item not found' })
    Object.assign(item, req.body)
    await cart.save()
    res.json(cart)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const deleteCartItem = async (req, res) => {
  try {
    const cart = await findOrCreateCart(getUserId(req))
    cart.items.pull({ _id: req.params.id })
    await cart.save()
    res.json(cart)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const clearCart = async (req, res) => {
  try {
    const cart = await findOrCreateCart(getUserId(req))
    cart.items = []
    await cart.save()
    res.json(cart)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
