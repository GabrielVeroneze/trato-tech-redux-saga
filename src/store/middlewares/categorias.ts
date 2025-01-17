import { createListenerMiddleware } from '@reduxjs/toolkit'
import { adicionarUmaCategoria, carregarUmaCategoria } from '@/store/reducers/categorias'
import { RootState, AppDispatch } from '@/store'
import { Categoria } from '@/types/Categoria'
import categoriasService from '@/services/categorias'
import criarTarefa from './utils/criarTarefa'

export const categoriasListener = createListenerMiddleware()

export const startAppListening = categoriasListener.startListening.withTypes<
    RootState,
    AppDispatch
>()

startAppListening({
    actionCreator: carregarUmaCategoria,
    effect: async (action, { dispatch, fork, getState, unsubscribe }) => {
        const { categorias } = getState()
        const nomeCategoria = action.payload
        const categoriaCarregada = categorias.some(categoria => categoria.id === nomeCategoria)

        if (categoriaCarregada) {
            return
        }

        if (categorias.length === 5) {
            return unsubscribe()
        }

        await criarTarefa<Categoria>({
            fork,
            dispatch,
            action: adicionarUmaCategoria,
            busca: () => categoriasService.buscarUmaCategoria(nomeCategoria),
            textoCarregando: `Carregando categoria ${nomeCategoria}`,
            textoSucesso: `Categoria ${nomeCategoria} carregada com sucesso!`,
            textoErro: `Erro na busca da categoria ${nomeCategoria}`,
        })
    },
})
