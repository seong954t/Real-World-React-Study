import UserStore from "../Store/UserStore";
import AuthStore from "../Store/AuthStore";
import {RouteComponentProps} from "react-router"
import SignIn from "../SignIn/SignIn";
import React from "react";

export default interface SignInProps {
    signInHandler: any,
    changeHandler: any,
    email: string
    password: string
    errors: string[]
}