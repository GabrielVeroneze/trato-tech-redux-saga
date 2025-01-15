import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { carregarCategorias, carregarUmaCategoria } from '@/store/reducers/categorias'
import { cadastrarItem } from '@/store/reducers/itens'
import { RootState } from '@/store'
import { DadosCadastroProduto } from '@/types/DadosCadastroProduto'
import Header from '@/components/Header'
import Input from '@/components/Input'
import Button from '@/components/Button'
import styles from './Anuncie.module.scss'

const Anuncie = () => {
    const { nomeCategoria = '' } = useParams()

    const dispatch = useDispatch()

    const categorias = useSelector((state: RootState) =>
        state.categorias.map(({ nome, id }) => ({ nome, id }))
    )

    const { register, handleSubmit } = useForm<DadosCadastroProduto>({
        defaultValues: {
            titulo: '',
            descricao: '',
            foto: '',
            categoria: nomeCategoria,
            preco: 0,
        },
    })

    const cadastrar = (data: DadosCadastroProduto) => {
        dispatch(cadastrarItem(data))
    }

    useEffect(() => {
        if (nomeCategoria) {
            dispatch(carregarUmaCategoria(nomeCategoria))
            return
        }

        dispatch(carregarCategorias())
    }, [dispatch, nomeCategoria])

    return (
        <div className={styles.container}>
            <Header
                titulo="Anuncie aqui!"
                descricao="Anuncie seu produto no melhor site do Brasil!"
            />
            <form
                className={styles.formulario}
                onSubmit={handleSubmit(cadastrar)}
            >
                <Input
                    type="text"
                    placeholder="Nome do produto"
                    alt="nome do produto"
                    {...register('titulo', { required: true })}
                />
                <Input
                    type="text"
                    placeholder="Descrição do produto"
                    alt="descrição do produto"
                    {...register('descricao', { required: true })}
                />
                <Input
                    type="text"
                    placeholder="URL da imagem do produto"
                    alt="URL da imagem do produto"
                    {...register('foto', { required: true })}
                />
                <select
                    {...register('categoria', { required: true })}
                    disabled={!!nomeCategoria}
                >
                    <option value="" disabled>
                        Selecione a categoria
                    </option>
                    {categorias.map(categoria => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.nome}
                        </option>
                    ))}
                </select>
                <Input
                    type="number"
                    placeholder="Preço do produto"
                    {...register('preco', {
                        required: true,
                        valueAsNumber: true,
                    })}
                />
                <Button type="submit">Cadastrar Produto</Button>
            </form>
        </div>
    )
}

export default Anuncie
