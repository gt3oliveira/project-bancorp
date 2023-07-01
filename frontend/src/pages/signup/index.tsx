import {useState, FormEvent, useContext} from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import {toast} from 'react-toastify'

import Head from "next/head"
import styles from '../../styles/Home.module.scss'
import Link from "next/link"
import Input from "@/components/ui/input/Input"
import Button from "@/components/ui/button/Button"

export default function Signup() {
  const {signUp} = useContext(AuthContext)

  const [name, setName] = useState('')
  const [profissao, setProfissao] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleRegister(event: FormEvent){
    event.preventDefault();

    if(name === '' || profissao === '' || email === '' || password === ''){
      toast.warning("Por favor, informe todos os campos!")
      return;      
    }    

    setLoading(true)

    let data = {
      name, profissao, email, password
    }

    await signUp(data)
    
    setLoading(false)

  }

  return (
    <>
      <Head>
        <title>Faça seu cadastro agora!</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.neumorphism}>
            <div className={styles.cardText}>

              <div className={styles.segment}>
                <h1>AMG Bank RP</h1>
                <h3>- CADASTRO DE USUÁRIO -</h3>
              </div>

              <form onSubmit={handleRegister} className={styles.formHome}>

                <label>
                  <Input type="text" placeholder="Digite seu nome" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label>
                  <Input type="text" placeholder="Digite sua profissão" 
                    value={profissao}
                    onChange={(e) => setProfissao(e.target.value)}
                  />
                </label>
                <label>
                  <Input type="text" placeholder="Digite seu email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label>
                  <Input type="password" placeholder="Digite sua senha" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>

                <Button type="submit" loading={loading}>Cadastrar</Button>

              </form>

              <Link href="/" legacyBehavior>
                <a className={styles.text}>Já possui conta? Faça o login!</a>
              </Link>

            </div>
          </div>
        </div>
      </main>

    </>
  )
}
