import {MouseEventHandler} from "react";

export default interface FeedPageButtonProps{
    page: number,
    isActive: boolean,
    onClick: MouseEventHandler<HTMLAnchorElement>
}