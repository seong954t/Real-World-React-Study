import {action, observable} from "mobx";
import UserVo from "../Vo/UserVo";
import ErrorsVo from "../Vo/ErrorsVo";
import RealWorldApi from "../RealWorldApi/RealWorldApi";
import {User} from "../Model/User";
import {Errors} from "../Model/Errors";
import Auth from "../Auth/Auth";

export class UserService {

    @observable user: UserVo;
    @observable errors: ErrorsVo;
    @observable isLoading: boolean;
    @observable isLoad: boolean;
    constructor() {
        this.user = new User();
        this.errors = new Errors();
        this.isLoading = false;
        this.isLoad = false;
    }

    @action
    login(email: string, password: string) {
        this.isLoading = true;
        return RealWorldApi.login(email, password)
            .then(action((result) => {
                const {errors, user} = result;
                if (user) {
                    this.user = new User(user);
                    Auth.setToken(this.user.token);
                } else if (errors) {
                    this.errors = new Errors(this.getErrors(errors));
                    throw Response.error();
                }
            })).finally(action(() => {
                this.isLoading = false;
            }))
    }

    @action
    logout() {
        RealWorldApi.logout();
        Auth.resetToken();
        this.user = new User();
        this.errors = new Errors();
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
                    this.errors = new Errors(this.getErrors(errors));
                    throw Response.error();
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
                if (user) {
                    this.user = new User(user);
                    Auth.setToken(this.user.token)
                } else if(errors) {
                    throw Response.error();
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
                    console.log(result);
                    const {errors, user} = result;
                    if (user) {
                        this.user = new User(user);
                    }
                })).finally(action(() => {
                this.isLoading = false;
                this.isLoad = true;
            }))
        } else{
            this.isLoad = true;
        }
    };

    @action
    public resetErrors = () => {
        this.errors = new Errors();
    };

    private getErrors = (errors: any) => {
        const arrayError: string[] = [];
        Object.keys(errors).forEach(key => {
            arrayError.push(key + " " + errors[key].toString())
        });
        return arrayError;
    };

    static _instance: UserService;

    static get instance(): UserService {
        return this._instance;
    }
}

UserService._instance = new UserService();