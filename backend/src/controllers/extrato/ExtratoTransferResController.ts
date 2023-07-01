import { Request, Response } from "express";
import ExtratoTransferResService from "../../services/extrato/ExtratoTransferResService";

export default class ExtratoTransferResController {
    async handle(req:Request, res:Response){
        const user_id = req.user_id

        const extratoTransferRes = new ExtratoTransferResService()
        const transferRes = await extratoTransferRes.execute(user_id)

        return res.json(transferRes)
    }
}

