import React, { ReactNode, useContext, useEffect, useState } from 'react'
import styles from './Extrato.module.scss'
import Head from 'next/head'
import MenuPrincipal from '@/components/MenuPrincipal'
import { canSSRAuth } from '@/utils/canSSRAuth'
import { setupAPIClient } from '@/services/api'
import Button from '@/components/ui/button/Button'
import TableView from '@/components/TableView'

type DepositoProps = {
    id: string;
    valor: number;
}

type SaqueProps = {
    id: string;
    valor: number;
}

type TransferProps = {
    id: string;
    destinatario: string;
    valor: number;
}

type TransferRespProps = {
    remetente: string;
    valor: number;
}

interface ExtratoProps {
    depositoList: DepositoProps[];
    saqueList: SaqueProps[];
    transferlist: TransferProps[];
    transferRespList: TransferRespProps[];
}

export default function Extrato({ ...props }: ExtratoProps) {

    const [deposito, setDeposito] = useState(props.depositoList || [])
    const [saque, setSaque] = useState(props.saqueList || [])
    const [remetente, setRemetente] = useState(props.transferlist || [])
    const [destinatario, setDestinatario] = useState(props.transferRespList || [])
    const [option, setOption] = useState(Number)

    return (
        <>
            <Head>
                <title>AMG Bank RP - Depósito</title>
            </Head>

            <MenuPrincipal>
                <div className={styles.dashCard}>
                    <h3>Extrato</h3>                    

                    <div className={styles.tableExtrato}>
                        <Button onClick={() => setOption(1)}>Depositos</Button>
                        <Button onClick={() => setOption(2)}>Saques</Button>
                        <Button onClick={() => setOption(3)}>PIX</Button>
                    </div>

                    <TableView>
                        {/* ==============================================================
                                -- DADOS DO DEPÓSITO --     -- DADOS DO DEPÓSITO -- 
                         */}
                        {option === 1 ? (
                            deposito.length === 0 ? (
                                <div className={styles.tableInfo}>
                                    <p><strong>Nenhum resultado de depósito foi encontrado.</strong></p>
                                </div>
                            ) : (
                                <div className={styles.tableInfo}>
                                    <div className={styles.tableTitle}>
                                        <span>Depósitos</span>
                                    </div>
                                    <div className={styles.tableDetail}>
                                        {deposito.map((item, index) => (
                                            <div key={index} className={styles.extratoData}>
                                                R$ {item.valor},00
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        ) : ''}

                        {/* ==============================================================
                                -- DADOS DO SAQUE --             -- DADOS DO SAQUE -- 
                         */}
                        {option === 2 ? (
                            saque.length === 0 ? (
                                <div className={styles.tableInfo}>
                                    <p><strong>Nenhum resultado de saque foi encontrado.</strong></p>
                                </div>
                            ) : (
                                <div className={styles.tableInfo}>
                                    <div className={styles.tableTitle}>
                                        <span>Saques</span>
                                    </div>
                                    <div className={styles.tableDetail}>
                                        {saque.map((item, index) => (
                                            <div key={index} className={styles.extratoDataSaque}>
                                                R$ -{item.valor},00
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        ) : ''}

                        {/* ==============================================================
                                -- DADOS DO PIX --              -- DADOS DO PIX -- 
                         */}
                        {option === 3 ? (
                            remetente.length === 0 && destinatario.length === 0 ? (
                                <div className={styles.tableInfo}>
                                    <p><strong>Nenhum resultado de pix foi encontrado.</strong></p>
                                </div>
                            ) : (
                                <div className={styles.tableInfo}>
                                    <div className={styles.tableTitle}>
                                        <span>Email</span>                                        
                                        <span>Valor</span>
                                    </div>
                                    <div className={styles.tableDetail}>
                                        {remetente.map((item, index) => (
                                            <div key={index} className={styles.extratoData}>
                                                <div className={styles.dadosTransfer}>{item.destinatario}</div>                                                
                                                <div className={styles.dadosTransfer2}>R$ -{item.valor},00</div>
                                            </div>
                                        ))}
                                        {destinatario.map((item, index) => (
                                            <div key={index} className={styles.extratoData}>                                                
                                                <div className={styles.dadosTransfer}>{item.remetente}</div>
                                                <div className={styles.dadosTransfer}>R$ {item.valor},00</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        ) : ''}
                    </TableView>

                </div>
            </MenuPrincipal>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    const apiClient = setupAPIClient(ctx)
    const deposito = await apiClient.get('/extrato/deposito')
    const saque = await apiClient.get('/extrato/saque')
    const transfer = await apiClient.get('/extrato/transfer')
    const transferRes = await apiClient.get('/extrato/transferresp')

    return {
        props: {
            depositoList: deposito.data,
            saqueList: saque.data,
            transferlist: transfer.data,
            transferRespList: transferRes.data
        }
    }
})
