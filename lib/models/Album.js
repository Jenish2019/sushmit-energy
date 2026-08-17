import mongoose from 'mongoose';

const AlbumSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, default: '', index: true },
    description: { type: String, default: '' },
    cover: { type: String, default: '' },
    images: { type: [mongoose.Schema.Types.Mixed], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Album || mongoose.model('Album', AlbumSchema);
