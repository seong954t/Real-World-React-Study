import {action, observable} from "mobx";
import {Profile} from "../Model/Profile";
import RealWorldApi from "../Request/RealWorldApi";

export class ProfileService {

    @observable profile: Profile = new Profile();
    @observable isProfileLoading: boolean = false;
    @observable isFollowLoading: boolean = false;

    @action
    public loadProfile = (username: string) => {
        this.isProfileLoading = true;
        RealWorldApi.getProfile(username)
            .then(action((result) => {
                const {errors, profile} = result;
                if (profile) {
                    this.profile = profile;
                }
            })).finally(action(() => {
                this.isProfileLoading = false;
            }))
    };

    @action
    public followUser(username: string) {
        if (!this.isFollowLoading) {
            this.isFollowLoading = true;
            RealWorldApi.followUser(username, this.profile.following)
                .then(action((result) => {
                    const {errors, profile} = result;
                    if (profile) {
                        this.profile = profile;
                    }
                })).finally(action(() => {
                    this.isFollowLoading = false;
                }))
        }
    }

    static _instance: ProfileService;

    static get instance(): ProfileService {
        return this._instance;
    }
}

ProfileService._instance = new ProfileService();