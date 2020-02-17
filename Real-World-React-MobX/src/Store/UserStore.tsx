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
    public updatingUser: UserDTO = {
        username: "",
        image: "",
        bio: "",
        email: "",
        token: ""
    };

    @observable
    public password: string = "";

    @action
    public setUser(user: UserDTO) {
        this.user = user;
        this.updatingUser = user;
    }

    @action
    public setUpdatingUserInfo(key: keyof UserDTO, value: string) {
        this.updatingUser[key] = value;
    }

    @action
    public setPassword(value: string){
        this.password = value;
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
                .then(action((result) => {
                    const {errors, user} = result;
                    if (errors !== undefined) {
                        RealWorldApi.alertError(errors)
                    } else if (user !== undefined) {
                        this.user = user;
                        this.updatingUser = user;
                    }
                }))
        }
    };

    @action
    public updateUser(): Promise<any>{
        return RealWorldApi.updateUser(this.updatingUser.image, this.updatingUser.username, this.updatingUser.bio, this.updatingUser.email, this.password)
            .then(action((result) => {
                const {errors, user} = result;
                if (errors !== undefined) {
                    RealWorldApi.alertError(errors)
                } else if (user !== undefined) {
                    this.user = user;
                    this.updatingUser = user;
                    Auth.setToken(JSON.stringify(user.token))
                }
                this.password = "";
            }))
    }

    static INSTANCE: UserStore;
}

UserStore.INSTANCE = new UserStore();