import mongoose from 'mongoose';

const PageSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    content: { type: String, default: '' },
    image: { type: String, default: '' },
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
  },
  { timestamps: true, strict: false }
);

export default mongoose.models.Page || mongoose.model('Page', PageSchema);
