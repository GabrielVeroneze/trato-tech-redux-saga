import { createAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createStandaloneToast } from '@chakra-ui/toast'
import { resetarCarrinho } from '@/store/reducers/carrinho'
import { Categoria } from '@/types/Categoria'
import categoriasService from '@/services/categorias'

const { toast } = createStandaloneToast()

const initialState: Categoria[] = []

export const carregarCategorias = createAction<void>('categorias/carregarCategorias')
export const carregarUmaCategoria = createAction<string>('categorias/carregarUmaCategoria')

export const buscarCategorias = createAsyncThunk(
    'categorias/buscar',
    categoriasService.buscar
)

const categoriasSlice = createSlice({
    name: 'categorias',
    initialState,
    reducers: {
        adicionarTodasAsCategorias: (state, { payload }: PayloadAction<Categoria[]>) => {
            return payload
        },
        adicionarUmaCategoria: (state, { payload }: PayloadAction<Categoria>) => {
            state.push(payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(resetarCarrinho.type, () => {
                toast({
                    title: 'Sucesso!',
                    description: 'Compra completada com sucesso!',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
            })
    },
})

export const { adicionarTodasAsCategorias, adicionarUmaCategoria } = categoriasSlice.actions

export default categoriasSlice.reducer
