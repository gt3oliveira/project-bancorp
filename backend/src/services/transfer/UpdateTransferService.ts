import prismaClient from "../../prisma";

interface TransferRequest{
    email: string,
    valor: number
}

export default class UpdateTransferService{
    async execute({...props}: TransferRequest, user_id: string){

        const userRem = await prismaClient.user.findFirst({
            where:{
                id: user_id
            }
        })

        const transfer = await prismaClient.transferencia.create({
            data:{
                remetente: userRem.email,
                destinatario: props.email,
                valor: props.valor,
                user_id: user_id
            }
        })

        const user = await prismaClient.user.findFirst({
            where:{
                email: props.email
            }
        })

        const contaTransfer = await prismaClient.conta.findFirst({
            where:{
                user_id: user.id
            }
        })

        const contaTitular = await prismaClient.conta.findFirst({
            where:{
                user_id: user_id
            }
        })

        const novoSaldoTitular = contaTitular.saldo - props.valor
        const novoSaldoTransfer = contaTransfer.saldo + props.valor


        await prismaClient.conta.update({
            where:{
                id: contaTransfer.id                
            },            
            data:{
                saldo: novoSaldoTransfer
            }
        })
        
        await prismaClient.conta.update({
            where:{
                id: contaTitular.id                
            },            
            data:{
                saldo: novoSaldoTitular
            }
        })
        

        return transfer
    }
}



