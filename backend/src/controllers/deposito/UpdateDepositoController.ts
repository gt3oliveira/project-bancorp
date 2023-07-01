import { Request, Response, json } from "express";
import UpdateDepositoService from "../../services/deposito/UpdateDepositoService";

type DepRequest = {
    valor: number
}

export default class UpdateDepositoController{
    async handle(req:Request, res:Response){        

        const user_id = req.user_id
        const {...props}: DepRequest = req.body

        const depService = new UpdateDepositoService()
        const deposito = await depService.execute(props.valor, user_id)
        
        return res.json(deposito)
    }
}





