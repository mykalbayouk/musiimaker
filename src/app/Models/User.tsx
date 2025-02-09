const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Attributes of a User table
const UserSchema = new Schema({
    email: String,
    userName: String,
    password: String,
    picture: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;