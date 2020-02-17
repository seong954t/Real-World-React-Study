import {action, observable} from "mobx";
import UserDTO from "../DTO/UserDTO";
import RealWorldApi from "../RealWordApi/RealWorldApi";
import Auth from "../Auth/Auth";

export default class UserStore {
    @observable
    public user: UserDTO = {
        username: "",
        image: "",
        bio: "",
        email: "",
        token: ""
    };

    @observable
    private updatingUser: UserDTO = {
        username: "",
        image: "",
        bio: "",
        email: "",
        token: ""
    };

    @observable
    private password: string = "";

    @action
    public setUser(user: UserDTO) {
        this.user = user;
        this.updatingUser = user;
    }

    @action
    public setUpdatingUserInfo(key: string, value: string) {
        if(key === "password"){
            this.password = value;
        }else{
            this.updatingUser = {
                ...this.user,
                [key]: value
            }
        }
    }

    @action
    public resetUpdatingUser(){
        this.updatingUser = this.user;
    }

    @action
    public resetUser = () => {
        this.user.username = "";
        this.user.image = "";
        this.user.bio = "";
        this.user.email = "";
        this.user.token = "";
    };


    @action
    public getCurrentUser = () => {
        if (Auth.isSigned()) {
            RealWorldApi.getCurrentUser()
                .then(res => res.json())
                .then((result) => {
                    const {errors, user} = result;

                    if (errors !== undefined) {
                        RealWorldApi.alertError(errors)
                    } else if (user !== undefined) {
                        this.user = user;
                        this.updatingUser = user;
                    }
                })
        }
    };

    @action
    public updateUser = (history: any) => {
        RealWorldApi.updateUser(this.updatingUser.image, this.updatingUser.username, this.updatingUser.bio, this.updatingUser.email, this.password)
            .then(res => res.json())
            .then((result) => {
                const {errors, user} = result;
                if (errors !== undefined) {
                    RealWorldApi.alertError(errors)
                } else if (user !== undefined) {
                    this.user = user;
                    this.updatingUser = user;
                    Auth.setToken(JSON.stringify(user.token))
                    history.replace("/");
                }
                this.password = "";
            })
    }
}