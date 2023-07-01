import { Request, Response } from "express";
import DepositoService from "../../services/extrato/ExtratoDepositoService";

export default class ExtratoDepositoController{
    async handle(req:Request, res:Response){

        const user_id = req.user_id

        const extratoDeposito = new DepositoService()
        const deposito = await extratoDeposito.execute(user_id)        

        return res.json(deposito)
    }
}

