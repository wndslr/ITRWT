import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    price:       { type: Number, required: true, min: 0 },
    image:       { type: String, default: '' },
    images:      [{ type: String }],
    category:    { type: mongoose.Schema.Types.ObjectId, ref: 'Catalog' },
    productCollection: { type: String, default: '' },
    colors:      [{ type: String }],
    sizes:       [{ type: String, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] }],
    brand:       { type: String, default: '' },
    designer:    { type: String, default: '' },
    inStock:     { type: Boolean, default: true },
    quantity:    { type: Number, default: 0, min: 0 }
  },
  { timestamps: true }
)

productSchema.index({ title: 'text', description: 'text' })

export default mongoose.model('Product', productSchema)
