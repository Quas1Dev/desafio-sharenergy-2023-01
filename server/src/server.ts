import express, { Request, response, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// This guarantee the dbConfig content gets executed
import './config/dbConfig';
import ModelForUser from './models/UsersData';
import ModelForClient from './models/ClientsData';
import { Query } from 'mongoose';

const app = express();
app.use(cors());
app.use(express.json());

// Check credentials
app.post("/confirmLogin", async (req: Request, resp: Response) => {
    const userExist = await ModelForUser.exists({ user: req.body.user, password: req.body.password });

    return resp.json(userExist);
});

// Add new client
app.post("/add", async (req: Request, resp: Response) => {

    // Do not allow duplicate clients
    const listOfClients = await ModelForClient.find({ cpf: req.body.cpf });

    if (listOfClients.length > 0) {
        return resp.json({ userAdded: false });
    }

    const newClient = new ModelForClient({
        name: req.body.name,
        cpf: req.body.cpf,
        email: req.body.email,
        telephone: req.body.telephone,
        address: req.body.address
    });

    const doc = await newClient.save();

    if (doc == newClient) {
        resp.json({ userAdded: true })
    } else {
        resp.json({ userAdded: false });
    }
})

app.get("/read", async (req: Request, resp: Response) => {
    const clients = await ModelForClient.find({});
    console.log(clients);
    return resp.json(clients)
})

app.delete("/delete", async (req: Request, resp: Response) => {
    const query = await ModelForClient.deleteOne({ cpf: req.query.cpf });
    resp.json(query);
})

app.put('/update/:id', async (req: Request, resp: Response) => {
    const id = req.params.id;
    const { cpf, email, telephone, address, name } = req.body; 

    const client = await ModelForClient.findById(id);

    if (!client)  return resp.json(client);

    if (client && cpf || email || telephone || address || name) {
        client.cpf = cpf;
        client.name = name;
        client.email = email;
        client.address = address;
        client.telephone = telephone;

        client.save();
    }

    return resp.json(client);
})

app.listen(3333);