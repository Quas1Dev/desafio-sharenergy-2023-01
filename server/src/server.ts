import express, { Request, Response }  from 'express';
import cors from 'cors';

// This guarantee the dbConfig content gets executed
import './config/dbConfig';
import ModelForUser from './models/UsersData';

const app = express();
app.use(cors());
app.use(express.json());

// Check credentials
app.post("/confirmLogin", async (req: Request, resp: Response)=>{
    const userExist = await ModelForUser.exists({user: req.body.user, password: req.body.password});
    
    return resp.json(userExist);
})

app.get("/", (req, resp)=>{
    return resp.send("Hello");
})

app.listen(3333);