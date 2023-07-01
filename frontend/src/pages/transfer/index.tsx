import { useState, FormEvent, useContext } from 'react'
import styles from './Transfer.module.scss'
import MenuPrincipal from '@/components/MenuPrincipal'
import Head from 'next/head'
import Input from '@/components/ui/input/Input'
import Button from '@/components/ui/button/Button'
import { setupAPIClient } from '@/services/api'
import { toast } from 'react-toastify'
import { AuthContext } from '@/contexts/AuthContext'
import Transacao from '@/logic/core/Transacao'
import useFormulario from '@/logic/hooks/useFormulario'
import Dinheiro from '@/logic/utils/Dinheiro'

interface TransacaoProps {
    transacao: Transacao
}

export default function Saque(props: TransacaoProps) {
    const { valor, alterarValor } = useFormulario<Transacao>(props.transacao)
    const [chave, setChave] = useState('')
    const { detailUser } = useContext(AuthContext)

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        if (valor.valor === 0 || chave === '') {
            toast.warning("Preencha todos os campos!")
            return;
        }

        const apiClient = setupAPIClient()
        await apiClient.post('/transfer', {
            email: chave,
            valor: valor.valor
        })

        toast.success("PIX realizado com sucesso!")
        setChave('')

        detailUser();
    }

    return (
        <>
            <Head>
                <title>AMG Bank RP - PIX</title>
            </Head>

            <MenuPrincipal>
                <div className={styles.dashCard}>
                    <h3>PIX</h3>

                    <form onSubmit={handleRegister} className={styles.formTransfer}>
                        <span>Chave PIX</span>
                        <label>
                            <Input
                                type='text'
                                placeholder='Informe a chave PIX...'
                                value={chave}
                                onChange={(e) => setChave(e.target.value)}
                            />
                        </label>
                        <span>Valor do PIX</span>
                        <label>
                            <Input
                                type='text'
                                placeholder='Digite o valor...'
                                value={Dinheiro.formatar(valor.valor)}
                                onChange={alterarValor('valor', Dinheiro.desformatar)}
                            />
                        </label>

                        <Button type='submit'>
                            Efetuar PIX
                        </Button>

                    </form>
                </div>
            </MenuPrincipal>
        </>
    )
}

