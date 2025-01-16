import Header from '@/components/Header'
import Select from '@/components/Select'
import Button from '@/components/Button'
import styles from './Pagamento.module.scss'

const Pagamento = () => {
    return (
        <div className={styles.container}>
            <Header titulo="Pagamento" />
            <div className={styles.dados}>
                <p className={styles.forma}>
                    Olá usuário! Escolha a forma de pagamento:
                </p>
                <Select aria-label="Forma de pagamento">
                    <option value="-">Forma de pagamento</option>
                </Select>
                <div className={styles.content}>
                    <p>Total com taxas: R$ 0.00</p>
                </div>
                <div className={styles.finalizar}>
                    <Button>Finalizar Compra</Button>
                </div>
            </div>
        </div>
    )
}

export default Pagamento
