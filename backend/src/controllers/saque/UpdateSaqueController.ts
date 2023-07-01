import { Request, Response } from "express";
import UpdateSaqueService from "../../services/saque/UpdateSaqueService";

interface SaqueRequest{
    valor: number
}

export default class UpdateSaqueController{
    async handle(req:Request, res:Response){

        const user_id = req.user_id
        const {...props}: SaqueRequest = req.body

        const saqueService = new UpdateSaqueService()
        const saque = await saqueService.execute(props.valor, user_id)

        return res.json(saque)
    }
}