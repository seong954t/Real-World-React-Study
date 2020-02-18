import React from "react";

export default interface SignProps {
    onSubmit: any,
    onChange: any,
    username?: string,
    email: string,
    password: string,
    errors: string[]
}