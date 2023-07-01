import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.scss'
import { FaSpinner } from 'react-icons/fa'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    loading?: boolean,  
    children: ReactNode,   
}

export default function Button({...props}: ButtonProps) {
  return (
    <button 
        disabled={props.loading}
        className={styles.button} 
        {...props} 
    >
        {props.loading ? (
            <FaSpinner className={styles.spinner} color="#1d1d2e" size={16} />
        ): (
            <a>{props.children}</a>
        )}
    </button>
  )
}
