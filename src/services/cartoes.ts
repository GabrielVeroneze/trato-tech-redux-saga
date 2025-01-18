import { Cartao } from '@/types/Cartao'
import instance from '@/common/config/api'

const cartoesService = {
    buscarPorIdUsuario: async (usuarioId: number): Promise<Cartao[]> => {
        const resposta = await instance.get<Cartao[]>(
            `/cartoes?usuarioId=${usuarioId}`
        )

        return resposta.data
    },
}

export default cartoesService
