import mongoose from 'mongoose';

const schema = mongoose.Schema({
  RemarkId: Number,
  RemarkDescription: String,
  Rating: Number,
  UpdatedAt: String,
  UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
  },
  ProductID: Number
})

export default mongoose.model('remarks', schema)
