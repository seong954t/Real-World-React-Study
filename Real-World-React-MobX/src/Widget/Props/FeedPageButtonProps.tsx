import {MouseEventHandler} from "react";

export default interface FeedPageButtonProps{
    page: number,
    isActive: boolean,
    onClickPage: MouseEventHandler<HTMLAnchorElement>
}