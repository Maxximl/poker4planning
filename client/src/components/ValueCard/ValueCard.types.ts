export interface IValueCardProps {
    value?: string
    selected?: boolean
    custom?: boolean
    onChange?: (value?: string) => void
    onClick?: (value?: string) => void
}