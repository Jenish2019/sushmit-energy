import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, trim: true },
    category: { type: String, default: 'News' },
    content: { type: String, default: '' },
    excerpt: { type: String, default: '' },
    image: { type: String, default: '' },
    date: { type: String, default: '' },
    status: { type: String, enum: ['Draft', 'Published'], default: 'Draft' },
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.NewsArticle || mongoose.model('NewsArticle', NewsSchema);
