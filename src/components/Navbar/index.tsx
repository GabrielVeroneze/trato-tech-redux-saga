import { Link, useLocation, useNavigate } from 'react-router-dom'
import { RiShoppingCart2Line, RiShoppingCartFill } from 'react-icons/ri'
import classNames from 'classnames'
import Busca from '@/components/Busca'
import Logo from '@/assets/logo.svg?react'
import styles from './Navbar.module.scss'

const iconeProps = {
    color: 'white',
    size: 24,
}

const Navbar = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()

    return (
        <nav className={styles.nav}>
            <Logo className={styles.logo} onClick={() => navigate('/')} />
            <div className={styles.links}>
                <div>
                    <Link
                        to="/"
                        className={classNames(styles.link, {
                            [styles.selected]: pathname === '/',
                        })}
                    >
                        Página inicial
                    </Link>
                </div>
            </div>
            <div className={styles.busca}>
                <Busca />
            </div>
            <div className={styles.icones}>
                <Link to="/carrinho">
                    {pathname === '/carrinho' ? (
                        <RiShoppingCartFill {...iconeProps} />
                    ) : (
                        <RiShoppingCart2Line {...iconeProps} />
                    )}
                </Link>
            </div>
        </nav>
    )
}

export default Navbar
