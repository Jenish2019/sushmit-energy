import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema(
  {
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    mapEmbed: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
