import { ActionCreatorWithPayload, ForkedTask, ForkedTaskExecutor } from '@reduxjs/toolkit'
import { AppDispatch } from '@/store'

export interface Tarefa<T> {
    fork: <R>(executor: ForkedTaskExecutor<R>) => ForkedTask<R>
    dispatch: AppDispatch
    action: ActionCreatorWithPayload<T, string>
    textoCarregando: string
    busca: () => Promise<T>
    textoSucesso: string
    textoErro: string
}
