import prismaClient from "../../prisma"

export default class ExtratoSaqueService{
    async execute(user_id: string){
        const saque = await prismaClient.saque.findMany({
            where:{
                user_id: user_id
            },
            select:{
                id: true,
                valor:true
            }
        })

        return saque

    }
}

