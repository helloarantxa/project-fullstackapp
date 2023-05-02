const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: [true, 'Username is required.'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    lowercase: true,
    trim:true,
    validate: {
      validator: function(email) {
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(email);
      },
      message: 'Invalid email format.'
    }
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required.']
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps:true
});

const User = mongoose.model('User', userSchema);

module.exports = User;