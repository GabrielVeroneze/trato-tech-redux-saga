import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { ProdutoCarrinho } from '@/types/ProdutoCarrinho'
import Header from '@/components/Header'
import Item from '@/components/Item'
import Button from '@/components/Button'
import styles from './Carrinho.module.scss'

const Carrinho = () => {
    const navigate = useNavigate()

    const { carrinho, total } = useSelector((state: RootState) => {
        const regex = new RegExp(state.busca, 'i')

        const carrinhoReduce = state.carrinho.data.reduce<ProdutoCarrinho[]>((itens, itemNoCarrinho) => {
            const item = state.itens.find(item => item.id === itemNoCarrinho.id)

            if (item && item.titulo.match(regex)) {
                itens.push({
                    ...item,
                    quantidade: itemNoCarrinho.quantidade,
                })
            }

            return itens
        }, [])

        return {
            carrinho: carrinhoReduce,
            total: state.carrinho.total,
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
                <Button onClick={() => navigate('/pagamento')}>
                    Finalizar Compra
                </Button>
            </div>
        </div>
    )
}

export default Carrinho
