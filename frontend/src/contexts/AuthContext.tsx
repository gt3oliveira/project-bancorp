import { createContext, ReactNode, useState, useEffect } from 'react'
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import { api } from '@/services/apiClient'
import {toast} from 'react-toastify'

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void  
    signUp: (credentials: signUpProps) => Promise<void> 
    detailUser: () => void     
}

type UserProps = {
    id: string;
    name: string;    
    profissao: string;
    email: string;  
    saldo: number;  
}

type SignInProps = {
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

type signUpProps = {
    name: string;
    profissao: string;
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
    try {        
        destroyCookie(undefined, '@amg.token')
        toast.success("Até logo! AMG Bank RP")
        Router.push('/')
    } catch (err) {
        toast.error("Erro ao deslogar!")
        console.log('erro ao deslogar!')
    }
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;

    useEffect(() => {
        const {'@amg.token': token} = parseCookies()
        
        if(token){
            api.get('/me').then(response => {                
                const { id, name, email, profissao, saldo } = response.data                
                setUser({
                    id,
                    name,
                    email,
                    profissao,
                    saldo
                })
            })
            .catch(() => {
                signOut()
            })
        }

    }, [])    

    async function signIn({email, password}: SignInProps) {        
        try {
            const response = await api.post('/login', {
                email,
                password
            })
            // console.log(response.data)
            const { id, name, token, profissao, saldo } = response.data
            setCookie(undefined, '@amg.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: "/"
            })  
            
            setUser({
                id, name, email, profissao, saldo
            })

            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success(`Bem-vindo(a) a sua conta!`)
            Router.push('/dashboard')            

        } catch (err) {
            toast.error("Desculpe! Erro ao acessar.")
            console.log('Erro ao acessar ', err)
        }
    }

    async function signUp({name, email, profissao, password}: signUpProps) {
        try {

            const response = await api.post('/users', {
                name, profissao, email, password
            })

            toast.success("Conta registrada com sucesso!")
            Router.push('/')

        } catch (err) {
            toast.error("Erro ao cadastrar!")
            console.log('Erro ao cadastrar ', err)
        }
    }

    async function detailUser() {
        await api.get('/me').then(response => {                
            const { id, name, email, profissao, saldo } = response.data                
            setUser({
                id,
                name,
                email,
                profissao,
                saldo
            })
        })
        Router.push('/dashboard')
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp, detailUser }}>
            {children}
        </AuthContext.Provider>
    )
}
