import { useCallback, useState } from "react"

export default function useFormulario<T = any>(dadosIniciais?: T) {
    const [valor, setValor] = useState<T>(dadosIniciais ?? {} as T)

    const alterarDados = useCallback(function (valor: T) {
        setValor(valor)
    }, [])

    const alterarValor = useCallback(function (atributo: string, fn?: Function) {
        return (valorOuEvento: any) => {
            const v = valorOuEvento?.target?.value ?? valorOuEvento
            setValor({ ...valor, [atributo]: fn?.(v) ?? v })
        }
    }, [valor])

    return {
        valor,
        alterarDados,
        alterarValor
    }
}