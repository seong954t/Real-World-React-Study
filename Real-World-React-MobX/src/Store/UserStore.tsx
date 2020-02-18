import {action, computed, observable} from "mobx";
import UserDTO from "../DTO/UserDTO";
import RealWorldApi from "../RealWordApi/RealWorldApi";
import Auth from "../Auth/Auth";

export default class UserStore {
    @observable
    public _user: UserDTO = {
        username: "",
        image: "",
        bio: "",
        email: "",
        token: ""
    };

    @observable
    public _updatingUser: UserDTO = {
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
        this._user = user;
        this._updatingUser = user;
    }

    @computed
    get updatingUser(){
        return this._updatingUser;
    }

    @computed
    get user(){
        return this._user;
    }

    @action
    public setUpdatingUserInfo(key: keyof UserDTO, value: string) {
        this._updatingUser[key] = value;
    }

    @action
    public setPassword(value: string){
        this.password = value;
    }

    @action
    public resetUpdatingUser(){
        this._updatingUser = {...this._user};
    }

    @action
    public resetUser = () => {
        this._user.username = "";
        this._user.image = "";
        this._user.bio = "";
        this._user.email = "";
        this._user.token = "";
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
                        this._user = user;
                        this._updatingUser = user;
                    }
                }))
        }
    };

    @action
    public updateUser(): Promise<any>{
        return RealWorldApi.updateUser(this._updatingUser.image, this._updatingUser.username, this._updatingUser.bio, this._updatingUser.email, this.password)
            .then(action((result) => {
                const {errors, user} = result;
                if (errors !== undefined) {
                    RealWorldApi.alertError(errors)
                } else if (user !== undefined) {
                    this._user = user;
                    this._updatingUser = user;
                    Auth.setToken(JSON.stringify(user.token))
                }
                this.password = "";
            }))
    }

    static INSTANCE: UserStore;
}

UserStore.INSTANCE = new UserStore();