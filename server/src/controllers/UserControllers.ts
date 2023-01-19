import ModelForUser from "../models/ClientsData";
import {Request, Response} from 'express';

export default {
    async confirmLogin (req: Request, resp: Response) {
        const { user, password } = req.query;
        const userExist = await ModelForUser.exists({ user, password });
    
        return resp.json(userExist);
    }
}