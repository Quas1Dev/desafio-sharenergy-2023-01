import mongoose from 'mongoose';

const uriToConnect = "mongodb+srv://usuario:mongoose@cluster0.tiaomwt.mongodb.net/desafio?retryWrites=true&w=majority";

//
const connection = mongoose.connect(uriToConnect, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;


