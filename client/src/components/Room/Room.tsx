import React, { useEffect, useState } from 'react'
import { PlayerCard } from '../Card'
import { Table } from '../Table'
import styles from './Room.module.css'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import { CardSelector } from '../CardSelector/CardSelector'
import { IPlayer, useQuery, useSocket } from '../../hooks'
import { chunkArray } from '../../utils'
import { VoteTable } from '../VoteTable'
import { Typography } from 'antd'

export const ENDPOINT = "http://localhost:5000";

export const Room = () => {
    const query = useQuery()

    const [userName, setName] = useState("");
    const [room, setRoom] = useState("");

    const { players, userId, covered, cickUser, currentUser, taskName, setCovered, removeVotes, sendVote, setTaskName } = useSocket(room, userName)

    useEffect(() => {
        const queryName = query.get('name')
        const queryRoom = query.get('room')

        setName(queryName as string);
        setRoom(queryRoom as string);

        // store.setUser({ id: userId, name: queryName as string, roomId: queryRoom as string })

    }, [query, userId]);

    const splitedPlayers = chunkArray(Object.values(players), 3)

    const [topPlayers, setTopPlayers] = useState<IPlayer[]>([])
    const [leftPlayers, setLeftPlayers] = useState<IPlayer[]>([])
    const [rightPlayers, setRightPlayers] = useState<IPlayer[]>([])

    const preparePlayers = () => {
        const top: IPlayer[] = []
        const left: IPlayer[] = []
        const right: IPlayer[] = []

        for (const pls of splitedPlayers) {
            if (pls[0]) {
                top.push(pls[0])
            }
            if (pls[1]) {
                left.push(pls[1])
            }
            if (pls[2]) {
                right.push(pls[2])
            }
        }

        setTopPlayers(top)
        setLeftPlayers(left)
        setRightPlayers(right)
    }

    useEffect(() => {
        preparePlayers()
    }, [players])


    const renderPlayers = (playersArray: IPlayer[]) => {
        return playersArray.map((player) => {
            return (
                <div key={player.userId}>
                    <PlayerCard
                        name={player.userName}
                        value={player.value}
                        covered={covered}
                        userId={player.userId}
                        onClick={(id) => cickUser(id)}
                    />
                </div>
            )
        })
    }

    return (
        <div className={styles.roomWrapper}>
            <div className={styles.header}>
                <span className={styles.taskCaption}>Оцениваем задачу №: </span>
                <Typography.Title
                    level={1}
                    className={styles.taskNumber}
                    editable={{
                        tooltip: 'нажмите, чтобы отредактировать',
                        onChange: setTaskName,
                    }}
                >
                    {taskName}
                </Typography.Title>
            </div>
            <div className={styles.roomMiddle}>
                <div>
                    <div className={styles.gridContainer}>
                        <div className={cn(styles.topTable, styles.gridCell)}>
                            {renderPlayers(topPlayers)}
                        </div>

                        <div className={cn(styles.leftTable, styles.gridCell)}>
                            {renderPlayers(leftPlayers)}
                        </div>
                        <Table covered={covered} onShowCards={() => setCovered(false)} onNewVote={() => {
                            setCovered(true)
                            removeVotes()
                        }} />
                        <div className={cn(styles.rightTable, styles.gridCell)}>
                            {renderPlayers(rightPlayers)}
                        </div>
                        <div className={cn(styles.bottomTable, styles.gridCell)}>
                            {renderPlayers([currentUser])}
                        </div>
                    </div>
                </div>
                <VoteTable covered={covered} players={players.concat([currentUser])} />
            </div>
            <div className={styles.cardSelector}>
                <CardSelector
                    selectedValue={currentUser.value}
                    onCardSelect={(value: string) => sendVote(value)}
                />
            </div>
        </div>
    )
}