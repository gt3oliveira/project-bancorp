import { Request, Response } from "express";
import SaqueService from "../../services/extrato/ExtratoSaqueService";

export default class ExtratoSaqueController{
    async handle(req:Request, res:Response){

        const user_id = req.user_id

        const extratoSaque = new SaqueService()
        const saque = await extratoSaque.execute(user_id)        

        return res.json(saque)
    }
}

