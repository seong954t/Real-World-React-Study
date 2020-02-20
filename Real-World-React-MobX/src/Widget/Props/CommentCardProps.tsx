import {MouseEventHandler} from "react";

export default interface CommentCardProps {
    id?: number,
    body: string,
    username: string,
    image: string,
    createdAt: string,
    isDisableTrashBox?: boolean,
    onClickTrashBox: MouseEventHandler<HTMLElement>,
    linkToUser?:string
}