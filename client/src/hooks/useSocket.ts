import { useEffect, useRef, useState } from 'react'
// получаем класс IO
import { io, Socket } from "socket.io-client";
import { nanoid } from 'nanoid'
// наши хуки
import { useLocalStorage } from 'react-use'
import { useBeforeUnload } from './useBeforeUnload'
import { IUser } from '../store/room';

// адрес сервера
// требуется перенаправление запросов - смотрите ниже
// const SERVER_URL = 'https://damp-meadow-73462.herokuapp.com/'
const SERVER_URL = 'http://localhost:5000'

export interface IPlayer {
    userId?: string
    userName?: string
    online?: boolean
    value?: string
    covered?: boolean
}

type PlayerModel = Record<string, IPlayer>

// хук принимает название комнаты
export const useSocket = (roomId: string, userName: string) => {
    const [players, setPlayers] = useState<IPlayer[]>([])
    const [currentUser, setCurrentUser] = useState<IPlayer>({})
    const [covered, setCovered] = useState<boolean>(true)
    const [taskName, setTaskName] = useState('...');

    // создаем и записываем в локальное хранинище идентификатор пользователя
    const [userId] = useLocalStorage('userId', nanoid(8))
    // получаем из локального хранилища имя пользователя

    const socketRef = useRef<Socket | null>(null)

    useEffect(() => {
        socketRef.current = io(SERVER_URL, {
            query: { roomId },
            transports: ["websocket", "polling", "flashsocket"]
        })

        socketRef.current.emit('player:add', { userName, userId })

        socketRef.current.on('players', (players: PlayerModel) => {
            const playersArray = Object.values(players)

            const currUser = playersArray.find(player => player.userId === userId) || {}
            setCurrentUser(currUser)

            const onlinePlayers = playersArray?.filter(player => player.online && player.userId !== userId)
            setPlayers(onlinePlayers)
        })

        socketRef.current.on('covered', (covered: boolean) => {
            setCovered(covered)
        })

        socketRef.current.on('taskName', (name: string) => {
            setTaskName(name)
        })

        // отправляем запрос на получение всех данных
        socketRef.current.emit('player:get')
        socketRef.current.emit('covered:get')
        socketRef.current.emit('taskName:get')

        return () => {
            // при размонтировании компонента выполняем отключение сокета
            socketRef.current?.emit('player:leave', userId)
            socketRef.current?.disconnect()
        }
    }, [roomId])


    useEffect(() => {
        sendCovered(covered)
    }, [covered])

    useEffect(() => {
        sendTaskName()
    }, [taskName])

    // функция отправки сообщения
    // принимает объект с текстом сообщения и именем отправителя
    const sendVote = (value: string) => {
        const user = players.find(p => p.userId === userId)

        if (user?.value === value) {
            socketRef.current?.emit('vote:set', {
                userId,
                value: ''
            })
        } else {

            socketRef.current?.emit('vote:set', {
                userId,
                value
            })
        }

    }

    const sendCovered = (covered?: boolean) => {
        // добавляем в объект id пользователя при отправке на сервер
        socketRef.current?.emit('covered:set', covered)
    }

    // функция удаления сообщения по id
    const removeVotes = () => {
        socketRef.current?.emit('votes:remove')
    }

    const sendTaskName = () => {
        socketRef.current?.emit('taskName:set', taskName)
    }

    useBeforeUnload(() => {
        socketRef.current?.emit('player:leave', userId)
    })

    const cickUser = (id: string) => {
        socketRef.current?.emit('player:kick', id)
        console.log(id)
    }

    window.addEventListener('unload', () => {
        socketRef.current?.emit('player:leave', userId)
    })

    // хук возвращает пользователей, сообщения и функции для отправки удаления сообщений
    return { players, userId, roomId, covered, currentUser, taskName, setCovered, removeVotes, sendVote, setTaskName, cickUser }
}