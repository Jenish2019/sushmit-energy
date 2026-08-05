import mongoose from 'mongoose';

const AlbumSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    cover: { type: String, default: '' },
    images: [
      {
        url: { type: String },
        caption: { type: String, default: '' },
      },
    ],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Album || mongoose.model('Album', AlbumSchema);
