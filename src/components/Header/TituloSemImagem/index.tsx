import styles from './TituloSemImagem.module.scss'

interface TituloSemImagemProps {
    children?: React.ReactNode
    titulo: string
    descricao: string
}

const TituloSemImagem = ({
    children,
    titulo,
    descricao,
}: TituloSemImagemProps) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>{titulo}</h1>
            <h2 className={styles.descricao}>{descricao}</h2>
            {children}
        </div>
    )
}

export default TituloSemImagem
