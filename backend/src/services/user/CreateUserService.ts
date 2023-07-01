import { hash } from 'bcryptjs'
import prismaClient from "../../prisma";

interface UseRequest{
    name: string,
    profissao: string,
    email: string,
    password: string,
}

export default class CreateUserService{
    async execute({...props}: UseRequest){ 
        if(!props.email){
            throw new Error("Email incorreto!")
        }
        
        const passHash = await hash(props.password, 8)

        const userAlreadyExicts = await prismaClient.user.findFirst({
            where:{
                email: props.email
            }
        })

        if(userAlreadyExicts){
            throw new Error("Este email está sendo usado.")
        }        
        
        const user = await prismaClient.user.create({
            data:{
                name: props.name,                                
                email: props.email,
                password: passHash,
                profissao: props.profissao                                
            }            
        })

        await prismaClient.conta.create({
            data:{
                saldo: 0,
                user_id: user.id
            }
        })

        return user
    }
}


