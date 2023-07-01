import prismaClient from "../../prisma";

export default class ExtratoDepositoService{
    async execute(user_id: string){

        const deposito = await prismaClient.deposito.findMany({
            where:{
                user_id: user_id
            },
            select:{
                id: true,
                valor: true
            }
        })        

        return deposito
    }
}

