import {action, observable} from "mobx";
import ProfileDTO from "../DTO/ProfileDTO";
import RealWorldApi from "../RealWordApi/RealWorldApi";

export default class ProfileStore {
    @observable
    private profile: ProfileDTO = {
        following: false,
        username: "",
        bio: "",
        image: ""
    };

    @observable
    private isProfileLoading: boolean = false;

    @observable
    private isFollowLoading: boolean = false;

    @action
    public loadProfile = (username: string) => {
        console.log("loadProfile")
        this.isProfileLoading = true;
        RealWorldApi.getProfile(username)
            .then(res => res.json())
            .then(action((result) => {
                    const {errors, profile} = result;
                    if (errors !== undefined) {
                        RealWorldApi.alertError(errors);
                    } else {
                        this.profile = profile;
                    }
                }
            )).finally(() => {
                this.isProfileLoading = false;

            }
        )
    };

    @action
    public followUser(username: string) {
        this.isFollowLoading = true;
        RealWorldApi.followUser(username, this.profile.following)
            .then(res => res.json())
            .then(action((result) => {
                const {errors, profile} = result;
                if (errors !== undefined) {
                    RealWorldApi.alertError(errors)
                } else if (profile !== undefined) {
                    this.profile = profile;
                }
            })).finally(() => {
                this.isFollowLoading = false;
            }
        )
    }

    static INSTANCE: ProfileStore;
}

ProfileStore.INSTANCE = new ProfileStore();