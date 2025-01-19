import { call, delay, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import { carregarPagamento, mudarCarrinho, mudarQuantidade, mudarTotal } from '@/store/reducers/carrinho'
import { adicionarUsuario } from '@/store/reducers/usuario'
import { RootState } from '@/store'
import { Usuario } from '@/types/Usuario'
import { Cartao } from '@/types/Cartao'
import { Bandeira } from '@/types/Bandeira'
import usuariosService from '@/services/usuarios'
import cartoesService from '@/services/cartoes'
import bandeirasService from '@/services/bandeiras'

const usuarioLogado = 1

function* obterPagamento() {
    try {
        const usuario: Usuario = yield call(usuariosService.buscarPorId, usuarioLogado)

        const cartoes: Cartao[] = yield call(cartoesService.buscarPorIdUsuario, usuarioLogado)

        const bandeiraIds = cartoes.map(cartao => cartao.bandeiraId)

        const bandeiras: Bandeira[] = yield call(bandeirasService.buscarPorId, bandeiraIds)

        const cartoesComBandeiras = cartoes.map(cartao => {
            const bandeiraDoCartao = bandeiras.find(bandeira => Number(bandeira.id) === cartao.bandeiraId)

            return {
                ...cartao,
                taxa: bandeiraDoCartao!.taxa,
                bandeira: bandeiraDoCartao!.nome,
            }
        })

        yield put(adicionarUsuario({ ...usuario, cartoes: cartoesComBandeiras }))
    } catch (error) {}
}

function* calcularTotal() {
    yield delay(500)
    const state: RootState = yield select()

    const total = state.carrinho.data.reduce((total, itemNoCarrinho) => {
        const item = state.itens.find(item => item.id === itemNoCarrinho.id)
        return total + item!.preco * itemNoCarrinho.quantidade
    }, 0)

    yield put(mudarTotal(total))
}

export function* carrinhoSaga() {
    yield takeLatest(carregarPagamento, obterPagamento)
    yield takeEvery([mudarQuantidade, mudarCarrinho], calcularTotal)
}
