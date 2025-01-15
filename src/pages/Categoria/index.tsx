import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { carregarUmaCategoria } from '@/store/reducers/categorias'
import { RootState } from '@/store'
import Header from '@/components/Header'
import Button from '@/components/Button'
import Item from '@/components/Item'
import styles from './Categoria.module.scss'

const Categoria = () => {
    const { nomeCategoria } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { categoria, itens } = useSelector((state: RootState) => {
        const regex = new RegExp(state.busca, 'i')

        return {
            categoria: state.categorias.find(categoria => categoria.id === nomeCategoria),
            itens: state.itens.filter(item => item.categoria === nomeCategoria && item.titulo.match(regex)),
        }
    })

    useEffect(() => {
        if (nomeCategoria) {
            dispatch(carregarUmaCategoria(nomeCategoria))
        }
    }, [dispatch, nomeCategoria])

    if (!categoria) {
        return null
    }

    return (
        <div>
            <Header
                titulo={categoria.nome}
                descricao={categoria.descricao}
                imagem={categoria.header}
            >
                <Button onClick={() => navigate(`/anuncie/${nomeCategoria}`)}>
                    Quero anunciar
                </Button>
            </Header>
            <div className={styles.itens}>
                {itens.map(item => (
                    <Item key={item.id} {...item} />
                ))}
            </div>
        </div>
    )
}

export default Categoria
