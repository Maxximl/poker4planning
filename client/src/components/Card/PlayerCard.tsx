import React, { MouseEventHandler } from 'react'
import { IPlayerCardProps } from './PlayerCard.types'
import styles from './PlayerCard.module.css'
import cn from 'classnames'
import { VALUES_MAP } from '../../utils'


export const PlayerCard: React.FC<IPlayerCardProps> = ({ userId, name, value, covered, onClick }) => {

    const handleOnClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        if (e.ctrlKey || e.metaKey) {
            onClick?.(userId || '')
        }
    }

    return (
        <div className={styles.container} onClick={handleOnClick}>
            <div className={styles.wrapper}>
                <div className={cn(styles.cardBody, value && covered && styles.cover)}>
                    {!covered && value && <span>{VALUES_MAP[value]}</span>}
                </div>
                <div className={styles.name}>{name}</div>
            </div>
        </div>
    )
}
