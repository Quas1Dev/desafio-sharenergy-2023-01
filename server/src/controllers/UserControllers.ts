import ModelForUser from "../models/UsersData";
import { Request, Response } from 'express';

export default {
    async confirmLogin(req: Request, resp: Response) {
        const { user, password } = req.body;
        const userExist = await ModelForUser.exists({ user, password });
        return userExist ? resp.json(userExist) : resp.json({_id : null});
    },

    async confirmUser(req: Request, resp: Response) {
        const { id } = req.params;
        try {
            const userExist = await ModelForUser.exists({ _id: id });
            return userExist ? resp.json(userExist) : resp.json({_id : null})
        } catch (err) {
            return resp.json({_id: null});
        }

    }
}