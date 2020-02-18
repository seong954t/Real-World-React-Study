import {ChangeEventHandler, FormEventHandler, MouseEventHandler} from "react";

export default interface SettingsProps {
    password: string,
    email: string,
    username: string,
    bio: string,
    image: string,
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    onSubmit: FormEventHandler<HTMLFormElement>,
    onClick: MouseEventHandler<HTMLButtonElement>
}