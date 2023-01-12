import mongoose from 'mongoose';

// Structure declaration for the users collection 
const UsersDataSchema = new mongoose.Schema({
    user: String,
    password: String
})

const modelForUser = mongoose.model('User', UsersDataSchema);

module.exports = modelForUser;
