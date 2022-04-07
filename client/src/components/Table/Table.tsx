import { Button } from 'antd'
import React from 'react'
import styles from './Table.module.css'
import { observer } from 'mobx-react-lite'
import { ITableProps } from './Table.types'

export const Table: React.FC<ITableProps> = observer(({ covered, onShowCards, onNewVote }) => {

    const buttonText = covered ? 'Показать карточки' : 'Новое голосование'

    const handleShowCardClick = () => {
        onShowCards()
    }

    const handleNewVoteClick = () => {
        onNewVote()
    }

    return (
        <div className={styles.container}>
            <Button
                className={styles.showButton}
                type='primary'
                shape='round'
                size='large'
                onClick={covered ? handleShowCardClick : handleNewVoteClick}
            >
                {buttonText}
            </Button>
        </div>
    )
})
