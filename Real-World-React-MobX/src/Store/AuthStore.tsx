import {action, observable} from "mobx";
import UserStore from "./UserStore";
import RealWorldApi from "../RealWordApi/RealWorldApi";

export default class AuthStore {

    @observable
    private authInfo = {
        username: "",
        email: "",
        password: ""
    }

    @observable
    private errors: string[] = [];

    @action
    public setAuthInfo(key: string, value: string) {
        this.authInfo = {
            ...this.authInfo,
            [key]: value
        }
    }

    @action
    private resetAuthInfo() {
        this.authInfo.username = ""
        this.authInfo.email = ""
        this.authInfo.password = ""
        this.errors = [];
    }

    @action
    public login(userStore: UserStore) {
        RealWorldApi.login(this.authInfo.email, this.authInfo.password)
            .then(res => res.json())
            .then(action((result) => this.responseHandler(userStore, result)));
    }

    @action
    public logout(userStore: UserStore) {
        userStore.resetUser();
        RealWorldApi.logout();
    }

    @action
    public registration(userStore: UserStore) {
        RealWorldApi.registration(this.authInfo.username, this.authInfo.email, this.authInfo.password)
            .then(res => res.json())
            .then(action((result) => this.responseHandler(userStore, result)));
    }

    private responseHandler(userStore: UserStore, result: any) {
        const {errors, user} = result;
        if (errors !== undefined) {
            const arrayError: string[] = [];
            Object.keys(errors).forEach(key => {
                arrayError.push(key + " " + errors[key].toString())
            })
            this.errors = arrayError
        } else if (user !== undefined) {
            this.resetAuthInfo()
            userStore.setUser(user);
            localStorage.setItem("token", user.token);
            window.location.href = "/";
        }
    }
}