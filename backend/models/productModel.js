import mongoose from 'mongoose';
import slugify from 'slugify';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    images: [{ type: String }],
    from: { type: String, required: true },
    category: { type: String, required: true },
    categoryImage: { type: String, required: false },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    charishLink: { type: String, required: false }, // URL to Charish listing
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    reviews: [reviewSchema],
    condition: { type: String, required: true },
    dimensions: { type: String, required: true },
    materials: { type: String, required: true },
    period: { type: String, required: true },
    maker: { type: String, required: true },
    provenance: { type: Boolean, required: false },
    sold: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to generate slug from name
productSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;
