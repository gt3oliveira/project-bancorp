import prismaClient from "../../prisma";

export default class UpdateDepositoService {
    async execute(valor: number, user_id: string) {
       
        const dep = await prismaClient.deposito.create({
            data: {
                valor: valor,
                user_id: user_id
            }
        })

        const conta = await prismaClient.conta.findFirst({
            where: {
                user_id: user_id
            }
        })

        const novoSaldo = conta.saldo + valor        

        await prismaClient.conta.update({
            where: {
                id: conta.id
            },
            data: {
                saldo: novoSaldo
            }
        })

        return dep
    }
}



