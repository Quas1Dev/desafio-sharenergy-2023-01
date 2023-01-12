import mongoose from 'mongoose';

const UsersDataSchema = new mongoose.Schema({
    user: String,
    password: String
})

const model = mongoose.model('Users', UsersDataSchema);

module.exports = model;