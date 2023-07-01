import prismaClient from "../../prisma";

export default class ExtratoTransferResService{
    async execute(user_id: string){
        const user = await prismaClient.user.findFirst({
            where:{
                id: user_id
            }
        })

        const transferRes = await prismaClient.transferencia.findMany({
            where:{
                destinatario: user.email
            },
            select:{                
                remetente: true,
                valor: true                
            }
        })        
        
        return transferRes
    }
}

