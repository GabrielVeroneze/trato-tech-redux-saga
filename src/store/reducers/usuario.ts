import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UsuarioComCartoes } from '@/types/UsuarioComCartoes'

const initialState: UsuarioComCartoes = {
    id: 0,
    nome: '',
    cartoes: [],
}

const usuarioSlice = createSlice({
    name: 'usuario',
    initialState,
    reducers: {
        adicionarUsuario: (state, { payload }: PayloadAction<UsuarioComCartoes>) => {
            return payload
        },
    },
})

export const { adicionarUsuario } = usuarioSlice.actions

export default usuarioSlice.reducer
