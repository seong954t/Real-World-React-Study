import {MouseEventHandler} from "react";

export default interface FeedPageListProps{
    size: number,
    page: number,
    isDisable: boolean,
    onClickPage: MouseEventHandler<HTMLAnchorElement>
}