import LinkToProps from "./LinkToProps";

export default interface HeaderProps extends LinkToProps{
    username?: string,
    image?: string
    defaultHeader?: boolean,
    title: string
}