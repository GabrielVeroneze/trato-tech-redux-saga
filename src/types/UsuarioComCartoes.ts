import { Usuario } from '@/types/Usuario'
import { Cartao } from '@/types/Cartao'

export interface CartaoComBandeira extends Cartao {
    taxa: number
    bandeira: string
}

export interface UsuarioComCartoes extends Usuario {
    cartoes: CartaoComBandeira[]
}
