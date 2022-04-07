import React, { useMemo } from 'react'
import { Table } from 'antd';
import { IVoteTableProps } from './VoteTable.types';
import styles from './VoteTable.module.css'
import { VALUES_MAP } from '../../utils';
import CountUp from 'react-countup';

const columns = [
    {
        title: 'Имя',
        dataIndex: 'name',
        key: 'name',
        render: (name: string) => (
            <div className={styles.bigFont}>
                {name}
            </div>
        ),
    },
    {
        title: 'Оценка',
        dataIndex: 'vote',
        key: 'vote',
        render: (vote: string) => (
            <div className={styles.bigFont}>
                {VALUES_MAP[vote]}
            </div>
        ),
    },
];


export const VoteTable: React.FC<IVoteTableProps> = ({ players, covered }) => {
    const data = players.map(player => {
        return {
            key: player.userName,
            name: player.userName,
            vote: !covered ? player.value : '',
        }
    }).sort((a, b) => +(b.vote || 0) - +(a.vote || 0))

    const averageVote: number = useMemo(() => {
        const average = players.reduce((acc, curr) => {
            const voteValue = parseInt(curr.value || '')
            if (voteValue) {
                acc += voteValue
            }
            return acc
        }, 0)

        const votedPlayers = players.filter(player => player.value)

        if (votedPlayers.length) {
            return +(average / votedPlayers.length).toFixed(2)
        }

        return 0
    }, [players])

    console.log(averageVote)

    return (
        <div className={styles.container}>
            <Table
                size={'middle'}
                pagination={false}
                columns={columns}
                dataSource={data}
            />
            <div className={styles.average}>
                <span>{`Средняя: `} </span>
                {!covered && <CountUp duration={0.8} start={0} end={averageVote} decimals={1} suffix={'h'} />}
            </div>
        </div>
    )
}
