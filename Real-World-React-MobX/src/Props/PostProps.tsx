import {ChangeEventHandler, FormEventHandler, KeyboardEventHandler, MouseEventHandler} from "react";

export default interface PostProps {
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