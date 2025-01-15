import { createListenerMiddleware } from '@reduxjs/toolkit'
import { carregarUmaCategoria } from '@/store/reducers/categorias'
import { adicionarItens } from '@/store/reducers/itens'
import { RootState, AppDispatch } from '@/store'
import { Produto } from '@/types/Produto'
import itensService from '@/services/itens'
import criarTarefa from './utils/criarTarefa'

export const itensListener = createListenerMiddleware()

export const startAppListening = itensListener.startListening.withTypes<
    RootState,
    AppDispatch
>()

startAppListening({
    actionCreator: carregarUmaCategoria,
    effect: async (action, { dispatch, fork, unsubscribe, getState }) => {
        const { itens } = getState()
        const nomeCategoria = action.payload

        const itensCarregados = itens.some(item => item.categoria === nomeCategoria)

        if (itensCarregados) {
            return
        }

        if (itens.length === 25) {
            return unsubscribe()
        }

        await criarTarefa<Produto[]>({
            fork,
            dispatch,
            action: adicionarItens,
            busca: () => itensService.buscarDeCategorias(nomeCategoria),
            textoCarregando: `Carregando itens da categoria ${nomeCategoria}`,
            textoSucesso: `Itens da categoria ${nomeCategoria} carregados com sucesso!`,
            textoErro: 'Erro na busca de itens',
        })
    },
})
