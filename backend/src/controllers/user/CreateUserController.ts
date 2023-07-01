import { Request, Response } from "express";
import CreateUserService from "../../services/user/CreateUserService";

type UserRequest = {
    name: string,
    profissao: string,
    email: string,    
    password: string,
}

export default class CreateUserController{
    async handle(req: Request, res:Response){
        const {...props}: UserRequest = req.body  

        const userService = new CreateUserService()
        const user = await userService.execute(props)

        return res.json(user)
    }
}


