import React, {ChangeEventHandler, FormEventHandler} from "react";

export default interface SignProps {
    onSubmit: FormEventHandler<HTMLFormElement>,
    onChangeInput: ChangeEventHandler<HTMLInputElement>,
    username?: string,
    email: string,
    password: string,
    errors: string[]
}