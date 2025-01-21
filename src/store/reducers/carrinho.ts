import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CarrinhoInfo } from '@/types/CarrinhoInfo'
import { PagamentoDetalhes } from '@/types/PagamentoDetalhes'

const initialState: CarrinhoInfo = {
    data: [],
    total: 0
}

export const carregarPagamento = createAction('carrinho/carregarPagamento')
export const finalizarPagamento = createAction<PagamentoDetalhes>('carrinho/finalizarPagamento')

const carrinhoSlice = createSlice({
    name: 'carrinho',
    initialState,
    reducers: {
        mudarCarrinho: (state, { payload }) => {
            const temItem = state.data.some(item => item.id === payload)

            if (!temItem) {
                return {
                    total: state.total,
                    data: [
                        ...state.data,
                        {
                            id: payload,
                            quantidade: 1,
                        },
                    ],
                }
            }

            return {
                total: state.total,
                data: state.data.filter(item => item.id !== payload)
            }
        },
        mudarQuantidade: (state, { payload }) => {
            state.data = state.data.map(itemNoCarrinho => {
                if (itemNoCarrinho.id === payload.id) {
                    itemNoCarrinho.quantidade += payload.quantidade
                }

                return itemNoCarrinho
            })
        },
        resetarCarrinho: () => {
            return initialState
        },
        mudarTotal: (state, { payload }: PayloadAction<number>) => {
            state.total = payload
        }
    },
})

export const { mudarCarrinho, mudarQuantidade, resetarCarrinho, mudarTotal } = carrinhoSlice.actions

export default carrinhoSlice.reducer
