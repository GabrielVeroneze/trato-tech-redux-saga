import { forwardRef } from 'react'
import styles from './Input.module.scss'

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>, ref: React.Ref<HTMLInputElement>) => {
    return (
        <input
            ref={ref}
            className={styles.input}
            {...props}
        />
    )
}

export default forwardRef(Input)
