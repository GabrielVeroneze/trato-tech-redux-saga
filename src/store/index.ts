import { configureStore } from '@reduxjs/toolkit'
import { itensListener } from './middlewares/itens'
import { categoriasSaga } from './sagas/categorias'
import createSagaMiddleware from 'redux-saga'
import categoriasSlice from './reducers/categorias'
import itensSlice from './reducers/itens'
import carrinhoSlice from './reducers/carrinho'
import buscaSlice from './reducers/busca'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: {
        categorias: categoriasSlice,
        itens: itensSlice,
        carrinho: carrinhoSlice,
        busca: buscaSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(
            itensListener.middleware,
            sagaMiddleware
        ),
})

sagaMiddleware.run(categoriasSaga)

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
