import express from 'express';
import { Request, Response } from "express";

// This guarantee the dbConfig content gets executed
import './config/dbConfig';
import ModelForUser from './models/UsersData';

const app = express();

// Check credentials
app.get("/confirmLogin", async (req: Request, resp: Response)=>{
    let userExist = await ModelForUser.exists({user: req.query.user, password: req.query.password})

    if (userExist) {
        return resp.json({isRegistered: true})
    }

    return resp.json({isRegistered: false});
})

app.listen(3333);