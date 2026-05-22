import mongoose from 'mongoose'

const cartItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    title:   { type: String, required: true },
    price:   { type: Number, required: true, min: 0 },
    image:   { type: String, default: '' },
    color:   { type: String, default: '' },
    size:    { type: String, default: '' },
    qty:     { type: Number, required: true, min: 1, default: 1 }
  },
  { _id: true }
)

const cartSchema = new mongoose.Schema(
  {
    user:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [cartItemSchema]
  },
  { timestamps: true }
)

cartSchema.virtual('subTotal').get(function () {
  return this.items.reduce((s, i) => s + i.price * i.qty, 0)
})

cartSchema.set('toJSON',   { virtuals: true })
cartSchema.set('toObject', { virtuals: true })

export default mongoose.model('Cart', cartSchema)
