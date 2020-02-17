import React from "react";

export default interface SignInProps {
    onSubmit: any,
    onChange: any,
    email: string
    password: string
    errors: string[]
}