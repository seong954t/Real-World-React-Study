import {ChangeEventHandler, FormEventHandler, MouseEventHandler} from "react";

export default interface SettingsProps {
    password: string,
    email: string,
    username: string,
    bio: string,
    image: string,
    onChangeInputAndTextArea: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    onSubmit: FormEventHandler<HTMLFormElement>,
    onClickLogout: MouseEventHandler<HTMLButtonElement>
}