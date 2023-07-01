import { useState, FormEvent, useContext } from 'react'
import styles from './Saque.module.scss'
import MenuPrincipal from '@/components/MenuPrincipal'
import Head from 'next/head'
import Input from '@/components/ui/input/Input'
import Button from '@/components/ui/button/Button'
import { setupAPIClient } from '@/services/api'
import {toast} from 'react-toastify'
import { AuthContext } from '@/contexts/AuthContext'
import { IoIosLogOut } from 'react-icons/io'
import Transacao from '@/logic/core/Transacao'
import useFormulario from '@/logic/hooks/useFormulario'
import Dinheiro from '@/logic/utils/Dinheiro'

interface TransacaoProps{
    transacao: Transacao
}

export default function Saque(props: TransacaoProps) {
    const { valor, alterarValor } = useFormulario<Transacao>(props.transacao)
    const { detailUser } = useContext(AuthContext)  

    async function handleRegister(event:FormEvent){
        event.preventDefault();

        if(valor.valor === 0){
            toast.warning("Informe o valor do saque!")            
            return;
        }

        const apiClient = setupAPIClient()
        await apiClient.post('/saque', {
            valor: valor.valor
        })

        toast.success("Saque realizado com sucesso!")
        
        detailUser();        
    }

    return (
        <>
            <Head>
                <title>AMG Bank RP - Saque</title>
            </Head>

            <MenuPrincipal>
                <div className={styles.dashCard}>
                    <h3>Saque</h3>

                    <form onSubmit={handleRegister} className={styles.formSaque}>
                        <span>Valor do saque</span>
                        <label>
                            <Input
                                type='text'
                                placeholder='Digite o valor...'
                                value={Dinheiro.formatar(valor.valor)}
                                onChange={alterarValor('valor', Dinheiro.desformatar)}
                            />
                        </label>

                        <Button type='submit'>
                          Efetuar Saque
                        </Button>

                    </form>
                </div>
            </MenuPrincipal>
        </>
    )
}

