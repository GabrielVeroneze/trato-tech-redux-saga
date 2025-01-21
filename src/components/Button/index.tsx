import styles from './Button.module.scss'

interface ButtonProps {
    children: React.ReactNode
    type?: 'submit' | 'reset' | 'button'
    onClick?: () => void
    disabled?: boolean
}

const Button = ({ children, type = 'button', onClick, disabled }: ButtonProps) => {
    return (
        <button
            className={styles.button}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button
