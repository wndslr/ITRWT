import Product from '../models/product.model.js'
import Catalog from '../models/catalog.model.js'

export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 6, category, size, color } = req.query
    const filter = {}
    if (category) {
      const cat = await Catalog.findOne({ name: { $regex: new RegExp(`^${category}$`, 'i') } })
      if (cat) filter.category = cat._id
    }
    if (size) filter.sizes = size
    if (color) filter.colors = color

    const total = await Product.countDocuments(filter)
    const items = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('category', 'name slug')

    res.json({
      items,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      total
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name slug')
    if (!product) return res.status(404).json({ error: 'Product not found' })
    res.json(product)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!product) return res.status(404).json({ error: 'Product not found' })
    res.json(product)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ error: 'Product not found' })
    res.json({ deleted: true, id: req.params.id })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
