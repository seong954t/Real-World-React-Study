import React, {ChangeEventHandler, FormEventHandler} from "react";
import LinkToProps from "./LinkToProps";

export default interface SignProps extends LinkToProps{
    onSubmit: FormEventHandler<HTMLFormElement>,
    onChangeInput: ChangeEventHandler<HTMLInputElement>,
    username?: string,
    email: string,
    password: string,
    errors: string[]
}