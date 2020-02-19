import CommentDTO from "../DTO/CommentDTO";
import {MouseEventHandler} from "react";

export default interface CommentCardListProps {
    username: string,
    comments: CommentDTO[],
    loading?: boolean,
    onClickTrashBox: MouseEventHandler<HTMLButtonElement>
}