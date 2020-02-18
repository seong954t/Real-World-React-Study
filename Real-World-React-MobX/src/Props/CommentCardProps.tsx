import CommentDTO from "../DTO/CommentDTO";
import {MouseEventHandler} from "react";

export default interface CommentCardProps {
    comment: CommentDTO,
    isDisableTrashBox?: boolean,
    onClickTrashBox: MouseEventHandler<HTMLElement>
}