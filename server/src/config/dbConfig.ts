import mongoose from 'mongoose';

const uriToConnect = "mongodb+srv://usuario:usuario@cluster0.tiaomwt.mongodb.net/desafio?retryWrites=true&w=majority";

const connection = mongoose.connect(uriToConnect);

module.exports = connection;


