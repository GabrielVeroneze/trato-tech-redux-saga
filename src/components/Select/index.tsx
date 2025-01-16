import { forwardRef } from 'react'
import styles from './Select.module.scss'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    children: React.ReactNode
} 

const Select = ({ children, ...props }: SelectProps, ref: React.Ref<HTMLSelectElement>) => {
    return (
        <select
            ref={ref}
            className={styles.select}
            {...props}
        >
            {children}
        </select>
    )
}

export default forwardRef(Select)
