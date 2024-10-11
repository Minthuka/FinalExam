import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Date_of_birth: {
    type: Date,
    required: true,
    unique: true,
  },
  Member_Number: {
    type: Number,
    required: true,
  },
  Interest: {
    type: String,
    required: true,
  },


  
});

// If the model already exists, avoid re-compiling it
export default mongoose.models.User || mongoose.model('User', UserSchema);
