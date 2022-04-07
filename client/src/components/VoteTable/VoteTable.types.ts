import { IPlayer } from "../../hooks";

export interface IVoteTableProps {
    players: IPlayer[]
    covered?: boolean
}