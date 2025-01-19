import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { carregarPagamento } from '@/store/reducers/carrinho'
import { RootState } from '@/store'
import Header from '@/components/Header'
import Select from '@/components/Select'
import Button from '@/components/Button'
import styles from './Pagamento.module.scss'

const Pagamento = () => {
    const dispatch = useDispatch()

    const usuario = useSelector((state: RootState) => state.usuario)
    const total = useSelector((state: RootState) => state.carrinho.total)

    useEffect(() => {
        dispatch(carregarPagamento())
    }, [dispatch])

    return (
        <div className={styles.container}>
            <Header titulo="Pagamento" />
            <div className={styles.dados}>
                <p className={styles.forma}>
                    Olá {usuario.nome}! Escolha a forma de pagamento:
                </p>
                <Select aria-label="Forma de pagamento">
                    <option value="-">Forma de pagamento</option>
                    {usuario.cartoes.map(cartao => (
                        <option key={cartao.id} value={cartao.id}>
                            {cartao.nome}
                        </option>
                    ))}
                </Select>
                <div className={styles.content}>
                    <p>Total com taxas: R$ {total.toFixed(2)}</p>
                </div>
                <div className={styles.finalizar}>
                    <Button>Finalizar Compra</Button>
                </div>
            </div>
        </div>
    )
}

export default Pagamento
