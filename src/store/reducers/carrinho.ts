import { createAction, createSlice } from '@reduxjs/toolkit'
import { ItemCarrinho } from '@/types/ItemCarrinho'

const initialState: { data: ItemCarrinho[], total: number } = {
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
        mudarTotal: (state, { payload }) => {
            state.total = payload
        }
    },
})

export const { mudarCarrinho, mudarQuantidade, resetarCarrinho, mudarTotal } = carrinhoSlice.actions

export default carrinhoSlice.reducer
