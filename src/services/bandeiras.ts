import { Bandeira } from '@/types/Bandeira'
import instance from '@/common/config/api'

const bandeirasService = {
    buscarPorId: async (bandeiraIds: number[]): Promise<Bandeira[]> => {
        const query = new URLSearchParams()

        bandeiraIds.forEach(id => query.append('id', id.toString()))

        const resposta = await instance.get<Bandeira[]>(
            `/bandeiras?${query.toString()}`
        )

        return resposta.data
    },
}

export default bandeirasService
