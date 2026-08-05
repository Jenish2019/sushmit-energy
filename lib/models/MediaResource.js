import mongoose from 'mongoose';

const MediaResourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, default: 'PDF' },
    fileUrl: { type: String, default: '' },
    date: { type: String, default: '' },
    group: { type: String, default: 'media-kit' },
  },
  { timestamps: true }
);

export default mongoose.models.MediaResource || mongoose.model('MediaResource', MediaResourceSchema);
