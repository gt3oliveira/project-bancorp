import {useContext, FormEvent, useState} from "react"
import Head from "next/head"
import styles from '../styles/Home.module.scss'
import Link from "next/link"
import Input from "@/components/ui/input/Input"
import Button from "@/components/ui/button/Button"
import { AuthContext } from "@/contexts/AuthContext"
import {toast} from 'react-toastify'
import { canSSRGuest } from "@/utils/canSSRGuest"


export default function Home() {
  const {signIn} = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if(email === '' || password === ''){
      toast.warning("Por favor, informe todos os campos!")
      return;
    }

    setLoading(true)

    let data = {
      email,
      password
    }
    await signIn(data)
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>AMG Bank RP - Login</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.neumorphism}>
            <div className={styles.cardText}>

              <form onSubmit={handleLogin} className={styles.formHome}>

                <div className={styles.segment}>
                  <h1>AMG Bank RP</h1>
                </div>

                <label>
                  <Input type="text" placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label>
                  <Input type="password" placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>

                <Button type="submit" loading={loading}>Login</Button>

              </form>

              <Link href="/signup" legacyBehavior>
                <a className={styles.text}>Não possui conta? Cadastre-se.</a>
              </Link>

            </div>
          </div>
        </div>
      </main>

    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return{
    props:{}
  }
})
