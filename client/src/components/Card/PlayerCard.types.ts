
export interface IPlayerCardProps {
    name?: string
    value?: string
    owner?: boolean
    covered?: boolean
    userId?: string
    onClick?: (id: string) => void
}