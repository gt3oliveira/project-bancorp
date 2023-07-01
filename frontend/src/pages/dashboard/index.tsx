import Head from 'next/head'
import Link from 'next/link'
import styles from './Dashboard.module.scss'
import MenuPrincipal from '@/components/MenuPrincipal'
import { IoIosGitCompare, IoIosLogIn, IoIosLogOut, IoMdTrendingDown } from "react-icons/io"

export default function Dashboard() {
  const color = '#1d1d2e'

  return (
    <>
      <Head>
        <title>AMG Bank RP - Dashboard</title>
      </Head>

      <MenuPrincipal>
        <div className={styles.dashMain}>
          <h3>Dashboard</h3>

          <div className={styles.dashButton}>
            <Link href='/deposito' legacyBehavior>
              <a>
                <IoIosLogIn size={40} color={color} />
                Depositar
              </a>
            </Link>
            <Link href='/saque' legacyBehavior>
              <a>
                <IoIosLogOut size={40} color={color} />
                Sacar
              </a>
            </Link>
            <Link href='/transfer' legacyBehavior>
              <a>
                <IoIosGitCompare size={40} color={color} />
                PIX
              </a>
            </Link>
            <Link href='#' legacyBehavior>
              <a>
                <IoMdTrendingDown size={40} color={color} />
                Débitos
              </a>
            </Link>
          </div>

        </div>
      </MenuPrincipal>

    </>
  )
}
