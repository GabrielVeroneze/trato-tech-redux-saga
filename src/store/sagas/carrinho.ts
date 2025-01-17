import { takeLatest } from 'redux-saga/effects'
import { carregarPagamento } from '@/store/reducers/carrinho'

function* obterPagamento() {
    yield console.log('carregando pagamento')
}

export function* carrinhoSaga() {
    yield takeLatest(carregarPagamento, obterPagamento)
}
