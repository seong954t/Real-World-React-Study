import {MouseEventHandler} from "react";
import LinkToProps from "./LinkToProps";

export default interface CommentCardProps extends LinkToProps{
    id?: number,
    body: string,
    username: string,
    image: string,
    createdAt: string,
    isDisableTrashBox?: boolean,
    onClickTrashBox: MouseEventHandler<HTMLElement>,
}