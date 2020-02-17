import {action, observable} from "mobx";
import UserStore from "./UserStore";
import RealWorldApi from "../RealWordApi/RealWorldApi";
import Auth from "../Auth/Auth";

interface AuthInfo {
    username: string,
    email: string,
    password: string
}

export default class AuthStore {

    @observable
    private authInfo: AuthInfo = {
        username: "",
        email: "",
        password: ""
    };

    @observable
    private errors: string[] = [];

    @action
    public setAuthInfo(key: keyof AuthInfo, value: string) {
        this.authInfo[key] = value;
    }

    @action
    private resetAuthInfo() {
        this.authInfo.username = "";
        this.authInfo.email = "";
        this.authInfo.password = "";
        this.errors = [];
    }

    @action
    public login(userStore: UserStore): Promise<any> {
        return RealWorldApi.login(this.authInfo.email, this.authInfo.password)
            .then(res => res.json())
            .then(action((result) => {
                this.responseHandler(userStore, result);
            }));
    }

    @action
    public logout(userStore: UserStore) {
        userStore.resetUser();
        RealWorldApi.logout();
    }

    @action
    public registration(userStore: UserStore, history: any) {
        RealWorldApi.registration(this.authInfo.username, this.authInfo.email, this.authInfo.password)
            .then(res => res.json())
            .then(action((result) => {
                this.responseHandler(userStore, result)
                if(this.errors.length === 0){
                    history.replace("/")
                }
            }));
    }

    private responseHandler(userStore: UserStore, result: any) {
        const {errors, user} = result;
        if (errors !== undefined) {
            const arrayError: string[] = [];
            Object.keys(errors).forEach(key => {
                arrayError.push(key + " " + errors[key].toString())
            });
            this.errors = arrayError
        } else if (user !== undefined) {
            this.resetAuthInfo();
            userStore.setUser(user);
            Auth.setToken(user.token)
            RealWorldApi.setAuthHeader();
        }
    }

    static INSTANCE: AuthStore;
}

AuthStore.INSTANCE = new AuthStore();