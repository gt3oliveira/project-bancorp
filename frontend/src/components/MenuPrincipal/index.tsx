import styles from './MenuPrincipal.module.scss'
import Header from '@/components/Header'
import Nav from '@/components/Nav'
import Info from '@/components/Information'
import { AuthContext } from '@/contexts/AuthContext'
import React, { ReactNode, useContext } from 'react'

type MenuPrincipalProps = {
  children: ReactNode;
}

export default function MenuPrincipal({children}: MenuPrincipalProps) {
  
  const { user } = useContext(AuthContext)

  return (
    <>
      <Header />      
      <div className={styles.container}>

        <div className={styles.card}>
          <div className={styles.neumorphism}>
            <div className={styles.nav}>
              <Nav />
            </div>
          </div>

          <div className={styles.dashboard}>
            <div className={styles.dashTitle}>
              <h2>Bem-vindo(a), {user?.name}!</h2>
              <p>Ao AMG Bank, o banco que está sempre em alta.</p>
            </div>
            {children}
          </div>

          <div className={styles.neumorphism2}>
            <div className={styles.info}>
              <Info />
            </div>
          </div>

        </div>

      </div>

    </>
  )
}

