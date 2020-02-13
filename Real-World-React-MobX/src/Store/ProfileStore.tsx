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

    @action
    public loadProfile = (username: string) => {
        RealWorldApi.getProfile(username)
            .then(res => res.json())
            .then((result) => {
                    const {errors, profile} = result;
                    if (errors !== undefined) {
                        RealWorldApi.alertError(errors);
                    } else {
                        this.profile = profile;
                    }
                }
            )
    };

    @action
    public followUser(username: string) {
        RealWorldApi.followUser(username, this.profile.following)
            .then(res => res.json())
            .then(action((result) => {
                const {errors, profile} = result;
                if (errors !== undefined) {
                    RealWorldApi.alertError(errors)
                } else if (profile !== undefined) {
                    this.profile = profile;
                }
            }))
    }
}