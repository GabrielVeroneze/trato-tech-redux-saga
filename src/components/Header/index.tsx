import TituloSemImagem from './TituloSemImagem'
import TituloComImagem from './TituloComImagem'
import styles from './Header.module.scss'

interface HeaderProps {
    children?: React.ReactNode
    titulo: string
    descricao: string
    imagem?: string
    className?: string
}

const Header = ({ children, titulo, descricao, imagem, className = '' }: HeaderProps) => {
    return (
        <header className={styles.header}>
            {titulo && !imagem && (
                <TituloSemImagem titulo={titulo} descricao={descricao}>
                    {children}
                </TituloSemImagem>
            )}
            {titulo && imagem && (
                <TituloComImagem
                    titulo={titulo}
                    descricao={descricao}
                    imagem={imagem}
                    className={className}
                >
                    {children}
                </TituloComImagem>
            )}
        </header>
    )
}

export default Header
