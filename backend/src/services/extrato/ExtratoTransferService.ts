import prismaClient from "../../prisma";

export default class ExtratoTransferService{
    async execute(user_id: string){
        const transfer = await prismaClient.transferencia.findMany({
            where:{
                user_id: user_id
            },
            select:{
                id: true,
                destinatario: true,                
                valor: true
            }
        })

        return transfer

    }
}



