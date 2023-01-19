import express, { Request, Response } from 'express';
import cors from 'cors';

// This guarantee the dbConfig content gets executed
import './config/dbConfig';
import ModelForUser from './models/UsersData';
import ModelForClient from './models/ClientsData';
import axios, { AxiosError } from 'axios';


const app = express();
app.use(cors());
app.use(express.json());

// Check credentials
app.post("/confirmLogin", async (req: Request, resp: Response) => {
    const { user, password } = req.query;
    const userExist = await ModelForUser.exists({ user, password });

    return resp.json(userExist);
});

// Add new client
app.post("/add", async (req: Request, resp: Response) => {
    const { name, email, telephone, cpf, address } = req.body;

    // Do not allow duplicate clients
    const client = await ModelForClient.findOne({ cpf });

    if (!client) return resp.json({ userAdded: false });

    const newClient = new ModelForClient({
        name,
        cpf,
        email,
        telephone,
        address
    });

    const savedDoc = await newClient.save();

    if (savedDoc == newClient) {
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

app.delete("/delete/:id", async (req: Request, resp: Response) => {
    const query = await ModelForClient.deleteOne({ _id: req.params.id });
    resp.json(query);
})

app.put('/update/:id', async (req: Request, resp: Response) => {
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
})

// Check whether link return 404
app.get('/check404', async (req: Request, resp: Response) => {
    const url: string = req.query.url as string;

    axios.get(url).then(response => {
        return resp.json({ status404: false })
    }).catch((err: Error | AxiosError) => {
        if (err) {
            return resp.json({status404: true});
        }
    });
});

app.listen(3333);