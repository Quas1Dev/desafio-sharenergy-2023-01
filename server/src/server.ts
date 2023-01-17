import express, { Request, response, Response }  from 'express';
import cors from 'cors';

// This guarantee the dbConfig content gets executed
import './config/dbConfig';
import ModelForUser from './models/UsersData';
import ModelForClient from './models/ClientsData';

const app = express();
app.use(cors());
app.use(express.json());

// Check credentials
app.post("/confirmLogin", async (req: Request, resp: Response)=>{
    const userExist = await ModelForUser.exists({user: req.body.user, password: req.body.password});
    
    return resp.json(userExist);
});

// Add new client
app.post("/add", async (req: Request, resp: Response) => {
    const newClient = new ModelForClient({
        name: req.body.name,
        cpf: req.body.cpf,
        email: req.body.cpf,
        telephone: req.body.telephone,
        address: req.body.address
    });

    const doc = await newClient.save();

    if (doc == newClient) {
        response.json({userAdded: true})
    } else {
        response.json({userAdded: false});
    }
})

app.get("/read", async (req: Request, resp: Response) => {
    const clients = await ModelForClient.find({});
    console.log(clients);
    return resp.json(clients)
})

app.listen(3333);