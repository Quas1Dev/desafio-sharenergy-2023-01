import express from 'express';
import './config/dbConfig';

const app = express();

// Rote to index
app.get("/login", (req, resp)=>{
    console.log("Acessou login.");

    return resp.json([
        {id: 1, name: "Anúncio 1"},
        {id: 2, name: "Anúncio 2"},
        {id: 3, name: "Anúncio 3"},
    ]);
})

app.listen(3333);