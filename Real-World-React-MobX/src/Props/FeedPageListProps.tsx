import {MouseEventHandler} from "react";

export default interface FeedPageListProps{
    size: number,
    page: number,
    isDisable: boolean,
    onClick: MouseEventHandler<HTMLAnchorElement>
}