import {ChangeEventHandler, FormEventHandler} from "react";

export default interface CommentEditorProps {
    comment: string,
    image?:string,
    isDisableCommentBox?: boolean
    onSubmit: FormEventHandler<HTMLFormElement>,
    onChangeTextArea: ChangeEventHandler<HTMLTextAreaElement>
}