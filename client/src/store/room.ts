import { makeAutoObservable } from 'mobx'


export interface IRoomStore {
    user: IUser
    point?: string
}

export interface IUser {
    id?: string
    name?: string
    roomId?: string
    value?: string
}

class RoomStore implements IRoomStore {

    user: IUser = {}
    point?: string

    constructor() {
        makeAutoObservable(this)
    }

    setUser(user: IUser) {
        this.user = user
    }
}

export default new RoomStore()