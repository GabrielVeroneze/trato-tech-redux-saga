import { useDispatch, useSelector } from 'react-redux'
import { resetarCarrinho } from '@/store/reducers/carrinho'
import { RootState } from '@/store'
import { ProdutoCarrinho } from '@/types/ProdutoCarrinho'
import Header from '@/components/Header'
import Item from '@/components/Item'
import Button from '@/components/Button'
import styles from './Carrinho.module.scss'

const Carrinho = () => {
    const dispatch = useDispatch()

    const { carrinho, total } = useSelector((state: RootState) => {
        let total = 0
        const regex = new RegExp(state.busca, 'i')

        const carrinhoReduce = state.carrinho.reduce<ProdutoCarrinho[]>((itens, itemNoCarrinho) => {
            const item = state.itens.find(item => item.id === itemNoCarrinho.id)

            if (item && item.titulo.match(regex)) {
                total += item.preco * itemNoCarrinho.quantidade
                itens.push({
                    ...item,
                    quantidade: itemNoCarrinho.quantidade,
                })
            }

            return itens
        }, [])

        return {
            carrinho: carrinhoReduce,
            total: total,
        }
    })

    return (
        <div>
            <Header
                titulo="Carrinho de compras"
                descricao="Confira produtos que você adicionou ao carrinho."
            />
            <div className={styles.carrinho}>
                {carrinho.map(item => (
                    <Item key={item.id} {...item} carrinho />
                ))}
                <div className={styles.total}>
                    <strong>Resumo da compra</strong>
                    <span>
                        Subtotal: <strong>R$ {total.toFixed(2)}</strong>
                    </span>
                </div>
                <Button onClick={() => dispatch(resetarCarrinho())}>
                    Finalizar Compra
                </Button>
            </div>
        </div>
    )
}

export default Carrinho
