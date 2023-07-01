import { Request, Response } from "express";
import AuthUserService from "../../services/user/AuthUserService";

type AuthRequest = {
    email: string,
    password: string,
}

export default class AuthUserController{
    async handle(req: Request, res: Response){
        const {...props}: AuthRequest = req.body

        const authService = new AuthUserService()
        const auth = await authService.execute(props)

        return res.json(auth)
    }
}


