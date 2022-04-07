import React from 'react'
import { ValueCard } from '../ValueCard/ValueCard'
import styles from './CardSelector.module.css'
import store from '../../store/room'
import { observer } from 'mobx-react-lite'
import { ICardSelectorProps } from './CardSelector.types'


const values = ['1', '2', '4', '8', '12', '16', '20', '24']

export const CardSelector: React.FC<ICardSelectorProps> = observer(({ selectedValue, onCardSelect }) => {
    const handleCardSelect = (value?: string) => {
        onCardSelect(value || '')
    }

    return (
        <div className={styles.container}>
            {values.map((value) => {
                const selected = value === selectedValue

                return (
                    <ValueCard
                        key={value}
                        value={value}
                        selected={selected}
                        onClick={handleCardSelect}
                    />
                )
            })}
            <ValueCard custom onChange={handleCardSelect} />
        </div>
    )
})
