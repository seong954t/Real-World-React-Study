import {action, observable} from "mobx";
import UserVo from "../../Vo/UserVo";
import ErrorsVo from "../../Vo/ErrorsVo";
import RealWorldApi from "../Request/RealWorldApi";
import {User} from "../../Model/User";
import {Errors} from "../../Model/Errors";
import Auth from "../../Auth/Auth";

export class UserService {

    @observable user: UserVo | null = null;
    @observable errors: ErrorsVo | null = null;
    @observable isLoading: boolean = false;

    @action
    login(email: string, password: string) {
        this.isLoading = true;
        return RealWorldApi.login(email, password)
            .then(action((result) => {
                if (result instanceof User) {
                    this.user = new User(result);
                    Auth.setToken(this.user.token);
                } else if (result instanceof Errors) {
                    this.errors = new Errors(result)
                }
            })).finally(action(() => {
                this.isLoading = false;
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
    registration(username: string, email: string, password: string) {
        this.isLoading = true;
        return RealWorldApi.registration(username, email, password)
            .then(action((result) => {
                const {errors, user} = result;
                if (user) {
                    this.user = new User(user);
                    Auth.setToken(this.user.token);
                } else if (errors) {
                    this.errors = new Errors(errors)
                }
            })).finally(action(() => {
                this.isLoading = false;
            }))
    }

    @action
    updateUser(image: string, username: string, bio: string, email: string, password: string): Promise<any> {
        this.isLoading = true;
        return RealWorldApi.updateUser(image, username, bio, email, password)
            .then(action((result) => {
                const {errors, user} = result;
                if (errors !== undefined) {
                    this.user = new User(user);
                    Auth.setToken(this.user.token)
                }
            })).finally(action(() => {
                this.isLoading = false;
            }))
    }

    @action
    public loadUser = () => {
        if (Auth.isSigned()) {
            this.isLoading = true;
            RealWorldApi.getUser()
                .then(action((result) => {
                    const {errors, user} = result;
                    if (user) {
                        this.user = new User(user);
                    }
                })).finally(action(() => {
                    this.isLoading = false;
                }))
        }
    };

    private static _instance = new UserService();

    static get instance(): UserService {
        return this._instance;
    }
}