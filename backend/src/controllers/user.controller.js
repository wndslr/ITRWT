import User from '../models/user.model.js'
import { signToken } from '../middleware/auth.js'

const sanitize = (user) => {
  const obj = user.toObject ? user.toObject() : user
  delete obj.password
  return obj
}

export const getUser = async (req, res) => {
  try {
    const users = await User.find().limit(50)
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json(sanitize(user))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, gender } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' })
    const exists = await User.findOne({ email })
    if (exists) return res.status(409).json({ error: 'User already exists' })
    const user = await User.create({ firstName, lastName, email, password, gender })
    const token = signToken(user)
    res.status(201).json({ user: sanitize(user), token })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select('+password')
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })
    const match = await user.comparePassword(password)
    if (!match) return res.status(401).json({ error: 'Invalid credentials' })
    const token = signToken(user)
    res.json({ user: sanitize(user), token })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
