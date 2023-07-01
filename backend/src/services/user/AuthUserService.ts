import prismaClient from "../../prisma";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface AuthRequest{
    email: string,
    password: string,
}

export default class AuthUserService{
    async execute({...props}: AuthRequest){ 
        const user = await prismaClient.user.findFirst({
            where:{
                email: props.email
            }
        }) 
        
        const conta = await prismaClient.conta.findFirst({
            where:{
                user_id: user.id
            }
        })
        
        if(!user){
            throw new Error("Este usuário não existe.")
        }
            
        const passwordMatch = await compare(props.password, user.password)

        if(!passwordMatch){
            throw new Error("A senha está incorreta.")
        }

        const token = sign({
            name: user.name,
            email: user.email
        },
        process.env.JWT_SECRET, {
            subject: user.id,
            expiresIn: '30d'
        }
        )

        return {
            id: user.id, 
            name: user.name,
            profissao: user.profissao, 
            email: user.email,
            saldo: conta.saldo, 
            token: token,             
        }
    }
}



