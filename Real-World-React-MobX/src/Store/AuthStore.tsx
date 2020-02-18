import {action, computed, observable} from "mobx";
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
    private _errors: string[] = [];

    @action
    public setAuthInfo(key: keyof AuthInfo, value: string) {
        this.authInfo[key] = value;
    }

    @computed
    get errors() {
        return this._errors;
    }

    @computed
    get email() {
        return this.authInfo.email;
    }

    @computed
    get password() {
        return this.authInfo.password;
    }

    @computed
    get username() {
        return this.authInfo.username;
    }

    @action
    public resetAuthInfo() {
        this.authInfo.username = "";
        this.authInfo.email = "";
        this.authInfo.password = "";
        this._errors = [];
    }

    @action
    public login(): Promise<any> {
        return RealWorldApi.login(this.authInfo.email, this.authInfo.password)
            .then(action((result) => {
                return this.signHandler(result);
            }));
    }

    @action
    public logout(userStore: UserStore) {
        userStore.resetUser();
        RealWorldApi.logout();
    }

    @action
    public registration(): Promise<any> {
        return RealWorldApi.registration(this.authInfo.username, this.authInfo.email, this.authInfo.password)
            .then(action((result) => {
                return this.signHandler(result)
            }));
    }

    private signHandler(result: any): Promise<any> {
        const {errors, user} = result;
        if (errors !== undefined) {
            const arrayError: string[] = [];
            Object.keys(errors).forEach(key => {
                arrayError.push(key + " " + errors[key].toString())
            });
            this._errors = arrayError
            throw Response.error();
        } else if (user !== undefined) {
            this.resetAuthInfo();
            Auth.setToken(user.token)
            RealWorldApi.setAuthHeader();
        }
        return user;
    }

    static INSTANCE: AuthStore;
}

AuthStore.INSTANCE = new AuthStore();