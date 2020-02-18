import {ChangeEventHandler, FormEventHandler, KeyboardEventHandler, MouseEventHandler} from "react";
import PostDTO from "../DTO/PostDTO";

export default interface PostProps {
    // post: PostDTO,
    title: string,
    description: string,
    body: string,
    tagList: Set<string>,
    tag: string,
    onEnterPressAtTagInput: KeyboardEventHandler<HTMLInputElement>,
    onChangeInputAndTextArea: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    onSubmit: FormEventHandler<HTMLFormElement>,
    onClickRemoveTag: MouseEventHandler<HTMLElement>
}