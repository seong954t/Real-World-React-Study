import {action, observable} from "mobx";
import UserVo from "../Vo/UserVo";
import ErrorsVo from "../Vo/ErrorsVo";
import RealWorldApi from "../Request/RealWorldApi";
import {User} from "../Model/User";
import {Errors} from "../Model/Errors";
import Auth from "../Auth/Auth";

export class AuthService {

    @observable user: UserVo | null = null;
    @observable errors: ErrorsVo | null = null;

    @action
    login(email: string, password: string): Promise<any> {
        return RealWorldApi.login(email, password)
            .then(action((result) => {
                if (result instanceof User) {
                    this.user = new User(result);
                    Auth.setToken(this.user.token);
                } else if (result instanceof Errors) {
                    this.errors = new Errors(result)
                }
            }))
    }

    @action
    logout() {
        RealWorldApi.logout();
        Auth.resetToken();
        this.user = null;
        this.errors = null;
    }

    @action
    registration(username: string, email: string, password: string): Promise<any> {
        return RealWorldApi.registration(username, email, password)
            .then(action((result) => {
                    if (result instanceof User) {
                        this.user = new User(result);
                        Auth.setToken(this.user.token);
                    } else if (result instanceof Errors) {
                        this.errors = new Errors(result)
                    }
                }))
    }

    @action
    updateUser(user: UserVo) {
        this.user = user;
    }

    private static _instance = new AuthService();

    static get instance(): AuthService {
        return this._instance;
    }
}