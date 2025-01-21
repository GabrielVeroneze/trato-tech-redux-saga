import { CartaoComBandeira } from '@/types/UsuarioComCartoes'

export interface PagamentoDetalhes {
    valorTotal: number
    detalhesCartao: CartaoComBandeira | null
}
