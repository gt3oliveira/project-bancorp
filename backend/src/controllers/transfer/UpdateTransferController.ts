import { Request, Response } from "express";
import UpdateTransferService from "../../services/transfer/UpdateTransferService";

interface TransferRequest{
    email: string,
    valor: number
}

export default class UpdateTransferController{
    async handle(req:Request, res:Response){

        const user_id = req.user_id
        const {...props}: TransferRequest = req.body

        const transferService = new UpdateTransferService()
        const transfer = await transferService.execute({...props}, user_id)

        return res.json(transfer)
    }
}


