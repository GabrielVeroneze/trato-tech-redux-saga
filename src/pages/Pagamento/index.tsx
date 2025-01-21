import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { carregarPagamento, finalizarPagamento } from '@/store/reducers/carrinho'
import { RootState } from '@/store'
import { CartaoComBandeira } from '@/types/UsuarioComCartoes'
import Header from '@/components/Header'
import Select from '@/components/Select'
import Button from '@/components/Button'
import styles from './Pagamento.module.scss'

const Pagamento = () => {
    const [cartaoSelecionado, setCartaoSelecionado] = useState<string>('')
    const [detalhesCartao, setDetalhesCartao] = useState<CartaoComBandeira | null>(null)

    const dispatch = useDispatch()

    const usuario = useSelector((state: RootState) => state.usuario)
    const total = useSelector((state: RootState) => state.carrinho.total)
    const valorTotal = detalhesCartao ? total * detalhesCartao.taxa : total

    const mudarFormaDePagamento = (evento: React.ChangeEvent<HTMLSelectElement>) => {
        setCartaoSelecionado(evento.target.value)

        if (!evento.target.value) {
            setDetalhesCartao(null)
            return
        }

        setDetalhesCartao(
            usuario.cartoes.find(cartao => cartao.id === evento.target.value) || null
        )
    }

    const finalizar = () => {
        dispatch(finalizarPagamento({ valorTotal, detalhesCartao }))
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
                    value={cartaoSelecionado}
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
                    {detalhesCartao && (
                        <>
                            <p>
                                A forma de pagamento {detalhesCartao.nome} tem
                                taxa de {detalhesCartao.taxa}x
                            </p>
                            <p>
                                O saldo deste cartão é de R${' '}
                                {detalhesCartao.saldo.toFixed(2)}
                            </p>
                        </>
                    )}
                    <p>Total com taxas: R$ {valorTotal.toFixed(2)}</p>
                </div>
                <div className={styles.finalizar}>
                    <Button
                        disabled={valorTotal === 0 || cartaoSelecionado === ''}
                        onClick={finalizar}
                    >
                        Finalizar Compra
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Pagamento
