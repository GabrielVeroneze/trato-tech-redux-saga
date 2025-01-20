import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { carregarPagamento } from '@/store/reducers/carrinho'
import { RootState } from '@/store'
import { CartaoComBandeira } from '@/types/UsuarioComCartoes'
import Header from '@/components/Header'
import Select from '@/components/Select'
import Button from '@/components/Button'
import styles from './Pagamento.module.scss'

const Pagamento = () => {
    const [formaDePagamento, setFormaDePagamento] = useState<CartaoComBandeira | string>('')
    const dispatch = useDispatch()

    const usuario = useSelector((state: RootState) => state.usuario)
    const total = useSelector((state: RootState) => state.carrinho.total)
    const valorTotal = formaDePagamento ? total * formaDePagamento.taxa : total

    const mudarFormaDePagamento = (evento: React.ChangeEvent<HTMLSelectElement>) => {
        if (!evento.target.value) {
            setFormaDePagamento('')
            return
        }

        setFormaDePagamento(
            usuario.cartoes.find(cartao => cartao.id === evento.target.value)
        )
    }

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
                <Select
                    aria-label="Forma de pagamento"
                    value={formaDePagamento.id}
                    onChange={mudarFormaDePagamento}
                >
                    <option value="">Forma de pagamento</option>
                    {usuario.cartoes.map(cartao => (
                        <option key={cartao.id} value={cartao.id}>
                            {cartao.nome}
                        </option>
                    ))}
                </Select>
                <div className={styles.content}>
                    {formaDePagamento && (
                        <>
                            <p>
                                A forma de pagamento {formaDePagamento.nome} tem
                                taxa de {formaDePagamento.taxa}x
                            </p>
                            <p>
                                O saldo deste cartão é de R${' '}
                                {formaDePagamento.saldo.toFixed(2)}
                            </p>
                        </>
                    )}
                    <p>Total com taxas: R$ {valorTotal.toFixed(2)}</p>
                </div>
                <div className={styles.finalizar}>
                    <Button>Finalizar Compra</Button>
                </div>
            </div>
        </div>
    )
}

export default Pagamento
