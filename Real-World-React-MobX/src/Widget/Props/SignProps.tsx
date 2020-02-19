import React, {ChangeEventHandler, FormEventHandler, MouseEventHandler} from "react";

export default interface SignProps {
    onSubmit: FormEventHandler<HTMLFormElement>,
    onChangeInput: ChangeEventHandler<HTMLInputElement>,
    username?: string,
    email: string,
    password: string,
    errors: string[]
}