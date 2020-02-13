import UserStore from "../Store/UserStore";

const Auth = {
    isSigned: (): boolean => {
        return localStorage.getItem("token") !== null;
    },
    isOwner: (userStore: UserStore, username: string): boolean => {
        if (Auth.isSigned()) {
            return username === userStore.user.username;
        }
        return false;
    },
    getToken: (): string => {
        const token = localStorage.getItem("token");
        if (token) {
            return token;
        }
        return ""
    }
};

export default Auth;