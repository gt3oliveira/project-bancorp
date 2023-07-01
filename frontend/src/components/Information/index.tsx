import { useContext } from 'react'
import styles from './Info.module.scss'
import { AuthContext } from '@/contexts/AuthContext'
import { MdAccountBalance, MdAddCard } from "react-icons/md";
import { FaUserAstronaut } from "react-icons/fa";

export default function Info() {
    const color = '#1d1d2e'    
    const { user } = useContext(AuthContext)  

    return (
        <div className={styles.container}>
            <div className={styles.infoImg}>
                <FaUserAstronaut size={120} color={color} />
            </div>
            <div>
                <h3>{user?.email}</h3>
            </div>
            <div>
                <span>{user?.profissao}</span>
            </div>

            <div className={styles.infoDashMoney}>
                financeiro
                <div className={styles.infoMoney}>
                    <div className={styles.bancario}>
                        <div className={styles.InfoMoneyBackground}>
                            <div className={styles.bancarioImg}>
                                <MdAccountBalance size={40} color={color} />
                            </div>
                            <div className={styles.bancarioInfo}>
                                <div>
                                    <span>Saldo Bancário</span>
                                </div>
                                <div>
                                    <p>R$ {user?.saldo},00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.bancario}>
                        <div className={styles.InfoMoneyBackground}>
                            <div className={styles.bancarioImg}>
                                <MdAddCard size={40} color={color} />
                            </div>
                            <div className={styles.bancarioInfo}>
                                <div>
                                    <span>Carteira</span>
                                </div>
                                <div>
                                    <p>R$ 250,00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
