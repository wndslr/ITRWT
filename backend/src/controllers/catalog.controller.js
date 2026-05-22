import Catalog from '../models/catalog.model.js'

export const getCatalog = async (req, res) => {
  try {
    const items = await Catalog.find().sort({ order: 1, name: 1 })
    res.json(items)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getCategories = async (req, res) => {
  try {
    const categories = await Catalog.find({ parent: null }).sort({ order: 1 })
    res.json(categories)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const createCategory = async (req, res) => {
  try {
    const cat = await Catalog.create(req.body)
    res.status(201).json(cat)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
