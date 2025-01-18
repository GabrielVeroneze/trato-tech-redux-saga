import { Usuario } from '@/types/Usuario'
import instance from '@/common/config/api'

const usuariosService = {
    buscarPorId: async (id: number): Promise<Usuario> => {
        const resposta = await instance.get<Usuario>(`/usuarios/${id}`)

        return resposta.data
    },
}

export default usuariosService
