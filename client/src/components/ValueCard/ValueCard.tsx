import React, { useState } from 'react'
import { IValueCardProps } from './ValueCard.types'
import styles from './ValueCard.module.css'
import cn from 'classnames'
import { Input } from 'antd'
import { VALUES_MAP } from '../../utils'

export const ValueCard: React.FC<IValueCardProps> = ({ value, custom, selected, onClick, onChange }) => {
    const [customValue, setCustomValue] = useState<string>('')

    const handleOnClick = () => {
        onClick?.(value)
    }

    const customInput = (
        <Input
            className={styles.input}
            size={'large'}
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            onBlur={() => onChange?.(customValue)}
        />
    )

    return (
        <div className={cn(styles.container, (selected || custom && customValue) && styles.selected)} onClick={handleOnClick}>
            {custom ? customInput : VALUES_MAP[value || '']}
        </div>
    )
}
