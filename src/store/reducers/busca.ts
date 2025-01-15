import { createSlice } from '@reduxjs/toolkit'

const initialState: string = ''

const buscaSlice = createSlice({
    name: 'busca',
    initialState,
    reducers: {
        mudarBusca: (state, { payload }) => {
            return payload
        },
        resetarBusca: () => {
            return initialState
        },
    },
})

export const { mudarBusca, resetarBusca } = buscaSlice.actions

export default buscaSlice.reducer
