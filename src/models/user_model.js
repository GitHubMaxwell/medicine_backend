import mongoose, { Schema } from 'mongoose';

const User = Schema({
  username: { type: String, uppercase: true, required: true },
  password: { type: String, uppercase: true, required: true },
  topSearches: {
    type: Object,
    default: { advil: 1, tylenol: 1, mucinex: 1, pepto: 1, claritin: 1 }
  },
  savedItems: { type: Object },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
});

export default mongoose.model('user', User);
