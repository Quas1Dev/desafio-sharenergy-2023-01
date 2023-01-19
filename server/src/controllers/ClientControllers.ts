import express, { Request, Response } from 'express';
import ModelForClient from '../models/ClientsData';

export default {
    async add(req: Request, resp: Response) {
        const { name, email, telephone, cpf, address } = req.body;

        // Do not allow duplicate clients
        const client = await ModelForClient.findOne({ cpf });

        if (client) return resp.json({ userAdded: false });

        const newClient = new ModelForClient({
            name,
            cpf,
            email,
            telephone,
            address,
        });
        
        console.log("New client: ", newClient)
        const savedDoc = await newClient.save();

        if (savedDoc == newClient) {
            return resp.json({ userAdded: true })
        } else {
            return resp.json({ userAdded: false });
        }
    },
    
    async read(req: Request, resp: Response) {
        const clients = await ModelForClient.find({});
        return resp.json(clients)
    },
    
    async delete(req: Request, resp: Response) {
        const query = await ModelForClient.deleteOne({ _id: req.params.id });
        resp.json(query);
    },

    async update(req: Request, resp: Response) {

        const id = req.params.id;
        const { cpf, email, telephone, address, name } = req.body;

        const client = await ModelForClient.findById(id);

        if (!client) return resp.json(client);

        if (cpf || email || telephone || address || name) {
            client.cpf = cpf;
            client.name = name;
            client.email = email;
            client.address = address;
            client.telephone = telephone;

            client.save();
        }

        return resp.json(client);
    }
}