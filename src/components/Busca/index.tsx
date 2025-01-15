import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { mudarBusca, resetarBusca } from '@/store/reducers/busca'
import { RootState } from '@/store'
import styles from './Busca.module.scss'

const Busca = () => {
    const dispatch = useDispatch()
    const { pathname } = useLocation()

    const busca = useSelector((state: RootState) => state.busca)

    useEffect(() => {
        dispatch(resetarBusca())
    }, [pathname, dispatch])

    return (
        <div className={styles.busca}>
            <input
                className={styles.input}
                type="text"
                placeholder="O que você procura?"
                value={busca}
                onChange={evento => dispatch(mudarBusca(evento.target.value))}
            />
        </div>
    )
}

export default Busca
