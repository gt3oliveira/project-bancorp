import prismaClient from "../../prisma";

export default class DetailUserService{
    async execute(user_id: string){        
        
        const user = await prismaClient.user.findFirst({
            where:{
                id: user_id
            },
            select:{
                id: true,
                name: true,
                email: true,
                profissao: true
            }         
        })

        const conta = await prismaClient.conta.findFirst({
            where:{
                user_id: user_id
            },
            select:{
                saldo: true
            }
        })

        const {id, name, email, profissao} = user
        const {saldo} = conta

        const data = {id, name, email, profissao, saldo}

        return (data)
        
    }
}
