import mongoose from 'mongoose'

const catalogSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, unique: true, trim: true },
    slug:        { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: '' },
    image:       { type: String, default: '' },
    parent:      { type: mongoose.Schema.Types.ObjectId, ref: 'Catalog', default: null },
    order:       { type: Number, default: 0 }
  },
  { timestamps: true }
)

export default mongoose.model('Catalog', catalogSchema)
