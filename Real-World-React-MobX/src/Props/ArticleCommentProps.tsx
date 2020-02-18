import {ChangeEventHandler, FormEventHandler, MouseEventHandler} from "react";
import CommentDTO from "../DTO/CommentDTO";

export default interface ArticleCommentProps{
    comment: string,
    isDisableCommentBox: boolean,
    image:string,
    username: string,
    comments:  CommentDTO[],
    loading?: boolean,
    onChangeTextArea: ChangeEventHandler<HTMLTextAreaElement>,
    onSubmit: FormEventHandler<HTMLFormElement>,
    onClickTrashBox: MouseEventHandler<HTMLElement>
}