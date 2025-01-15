import styles from './Button.module.scss'

interface ButtonProps {
    children: React.ReactNode
    type?: 'submit' | 'reset' | 'button'
    onClick?: () => void
}

const Button = ({ children, type = 'button', onClick }: ButtonProps) => {
    return (
        <button
            className={styles.button}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button
