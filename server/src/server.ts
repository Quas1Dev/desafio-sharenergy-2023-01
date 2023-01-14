import express, { Request, Response }  from 'express';
import cors from 'cors';

// This guarantee the dbConfig content gets executed
import './config/dbConfig';
import ModelForUser from './models/UsersData';

const app = express();
app.use(cors());
app.use(express.json());

// Check credentials
app.get("/confirmLogin", async (req: Request, resp: Response)=>{
    let userExist = await ModelForUser.exists({user: req.query.user, password: req.query.password});
    
    if (userExist) {
        return resp.json({isRegistered: true});
    }

    return resp.json({isRegistered: false});
})

app.get("/", (req, resp)=>{
    return resp.send("Hello");
})

app.listen(3333);