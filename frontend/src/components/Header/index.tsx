import {useContext} from 'react'
import styles from './header.module.scss'
import Link from 'next/link'
import {FiLogOut} from 'react-icons/fi'
import { AuthContext } from '@/contexts/AuthContext'

export default function Header() {

    const {signOut} = useContext(AuthContext)

    return (
        <header className={styles.header}>
            <div>                
                <Link href='/dashboard' legacyBehavior>
                    <a className={styles.segment}>AMG Bank RP</a>
                </Link>                

                <nav className={styles.headerNav}>                
                    <a className={styles.segment}>Contatos</a>                    
                    <a className={styles.segment}>Sobre</a>
                    <Link href='/' legacyBehavior>
                        <button onClick={signOut}>
                            <FiLogOut color='#fff' size={20} />
                        </button>
                    </Link>
                </nav>
            </div>
        </header>
    )
}
