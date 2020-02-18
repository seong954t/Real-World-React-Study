import UserStore from "../Store/UserStore";

const Auth = {
    TOKEN_KEY: "token",
    isSigned: (): boolean => {
        return localStorage.getItem(Auth.TOKEN_KEY) !== null;
    },
    isOwner: (username1: string, username2: string): boolean => {
        if (Auth.isSigned()) {
            return username1 === username2;
        }
        return false;
    },
    getToken: (): string => {
        const token = localStorage.getItem(Auth.TOKEN_KEY);
        if (token) {
            return token;
        }
        return ""
    },
    setToken: (token: string) => {
        localStorage.setItem(Auth.TOKEN_KEY, token);
    }
};

export default Auth;