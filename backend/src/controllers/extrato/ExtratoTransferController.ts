import { Request, Response } from "express";
import TransferService from "../../services/extrato/ExtratoTransferService";

export default class ExtratoTransferController{
    async handle(req:Request, res:Response){
        const user_id = req.user_id;

        const extratoTransfer = new TransferService()
        const transfer = await extratoTransfer.execute(user_id)

        return res.json(transfer)
    }
}


