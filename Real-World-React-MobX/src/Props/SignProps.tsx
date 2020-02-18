import React, {ChangeEventHandler, FormEventHandler, MouseEventHandler} from "react";

export default interface SignProps {
    onSubmit: FormEventHandler<HTMLFormElement>,
    onChange: ChangeEventHandler<HTMLInputElement>,
    username?: string,
    email: string,
    password: string,
    errors: string[]
}