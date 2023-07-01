import React from 'react'
import styles from './Nav.module.scss'
import Link from 'next/link'
import {MdOutlineDashboard} from 'react-icons/md'
import {IoIosGitCompare, IoMdPaper, IoIosLogIn, IoIosLogOut, IoMdTrendingDown} from "react-icons/io"

export default function Nav() {
    const color = '#1d1d2e'

    return (
        <>
            <div className={styles.button}>
                <Link href='/dashboard' legacyBehavior>
                    <a>
                        <MdOutlineDashboard size={30} color={color} />
                        Dashboard
                    </a>
                </Link>
            </div>
            <div className={styles.button}>
                <Link href='/deposito' legacyBehavior>
                    <a>
                        <IoIosLogIn size={30} color={color} />
                        Depositar
                    </a>
                </Link>
            </div>
            <div className={styles.button}>
                <Link href='/saque' legacyBehavior>
                    <a>
                        <IoIosLogOut size={30} color={color} />
                        Sacar
                    </a>
                </Link>
            </div>
            <div className={styles.button}>
                <Link href='/transfer' legacyBehavior>
                    <a>
                        <IoIosGitCompare size={30} color={color} />
                        PIX
                    </a>
                </Link>
            </div>
            <div className={styles.button}>
                <Link href='/extrato' legacyBehavior>
                    <a>
                        <IoMdPaper size={30} color={color} />
                        Extrato                        
                    </a>
                </Link>
            </div>
            <div className={styles.button}>
                <Link href='#' legacyBehavior>
                    <a>
                        <IoMdTrendingDown size={30} color={color} />
                        Débitos
                    </a>
                </Link>
            </div>
        </>
        
    )
}
