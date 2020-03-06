import {action, computed, observable} from "mobx";
import UserVo from "../Vo/UserVo";
import RealWorldApi from "../RealWordApi/RealWorldApi";
import Auth from "../Auth/Auth";

export default class UserStore {
    @observable
    private _user: UserVo = {
        username: "",
        image: "",
        bio: "",
        email: "",
        token: ""
    };

    @action
    public setUser(user: UserVo) {
        this._user = user;
    }

    @computed
    get user(){
        return this._user;
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
                    }
                }))
        }
    };


    @action
    public updateUser(image: string, username: string, bio: string, email: string, password: string): Promise<any>{
        return RealWorldApi.updateUser(image, username, bio, email, password)
            .then(action((result) => {
                const {errors, user} = result;
                if (errors !== undefined) {
                    RealWorldApi.alertError(errors)
                } else if (user !== undefined) {
                    this._user = user;
                    Auth.setToken(JSON.stringify(user.token))
                }
            }))
    }

    static INSTANCE: UserStore;
}

UserStore.INSTANCE = new UserStore();