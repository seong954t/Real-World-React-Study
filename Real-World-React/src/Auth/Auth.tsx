import React from "react";
import AuthInfoDTO from "../DTO/AuthInfoDTO";

const Auth = {
    isSigned: (): boolean => {

        return localStorage.getItem("user") !== null;
    },
    isOwner: (username: string): boolean => {
        if (Auth.isSigned()) {
            return username === Auth.getUserInfo()?.username;
        }
        return false;
    },
    getUserInfo: (): AuthInfoDTO | null => {
        const strUser = localStorage.getItem("user");
        if (strUser !== null) {
            return JSON.parse(strUser);
        }
        return null;
    },
    getToken: (): string => {
        const strUser = localStorage.getItem("user");
        if (strUser !== null) {
            return JSON.parse(strUser).token;
        }
        return ""
    }
}

export default Auth;