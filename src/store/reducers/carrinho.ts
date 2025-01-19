import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CarrinhoInfo } from '@/types/CarrinhoInfo'

const initialState: CarrinhoInfo = {
    data: [],
    total: 0
}

export const carregarPagamento = createAction('carrinho/carregarPagamento')

const carrinhoSlice = createSlice({
    name: 'carrinho',
    initialState,
    reducers: {
        mudarCarrinho: (state, { payload }) => {
            const temItem = state.some(item => item.id === payload)

            if (!temItem) {
                return [
                    ...state,
                    {
                        id: payload,
                        quantidade: 1,
                    },
                ]
            }

            return state.filter(item => item.id !== payload)
        },
        mudarQuantidade: (state, { payload }) => {
            state = state.map(itemNoCarrinho => {
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
