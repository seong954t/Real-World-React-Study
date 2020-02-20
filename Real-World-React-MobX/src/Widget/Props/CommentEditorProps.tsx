import {ChangeEventHandler, FormEventHandler} from "react";
import LinkToProps from "./LinkToProps";

export default interface CommentEditorProps extends LinkToProps{
    comment: string,
    image?:string,
    isDisableCommentBox?: boolean
    onSubmit: FormEventHandler<HTMLFormElement>,
    onChangeTextArea: ChangeEventHandler<HTMLTextAreaElement>
}