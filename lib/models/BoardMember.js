import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    social: { type: Object, default: {} },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.BoardMember || mongoose.model('BoardMember', MemberSchema);
