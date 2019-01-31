import mongoose, { Schema } from 'mongoose';

const User = Schema({
  name: { type: String, uppercase: true, required: true },
  email: { type: String, uppercase: true, required: true },
  topSearches: {
    type: Object,
    default: { advil: 1, tylenol: 1, mucinex: 1, pepto: 1, claritin: 1 }
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
});

export default mongoose.model('user', User);
