const mongoose = require('mongoose');
const { Schema } = mongoose;

//we can add in additional properties
const userSchema = new Schema({
  googleId: String
});

mongoose.model('users', userSchema);