import {action, computed, observable} from "mobx";
import ProfileDTO from "../DTO/ProfileDTO";
import RealWorldApi from "../RealWordApi/RealWorldApi";

export default class ProfileStore {
    @observable
    private _profile: ProfileDTO = {
        following: false,
        username: "",
        bio: "",
        image: ""
    };

    @observable
    private _isProfileLoading: boolean = false;

    @observable
    private _isFollowLoading: boolean = false;

    @computed
    get profile() {
        return this._profile;
    }

    @computed
    get isProfileLoading() {
        return this._isProfileLoading;
    }

    @computed
    get isFollowLoading() {
        return this._isFollowLoading;
    }

    @action
    public resetProfile() {
        this._profile = {
            following: false,
                username: "",
            bio: "",
            image: ""
        };
    }

    @action
    public loadProfile = (username: string) => {
        this._isProfileLoading = true;
        RealWorldApi.getProfile(username)
            .then(action((result) => {
                    const {errors, profile} = result;
                    if (errors !== undefined) {
                        RealWorldApi.alertError(errors);
                    } else {
                        this._profile = profile;
                    }
                }
            )).finally(() => {
                this._isProfileLoading = false;
            }
        )
    };

    @action
    public followUser(username: string) {
        if (!this._isFollowLoading) {
            this._isFollowLoading = true;
            RealWorldApi.followUser(username, this._profile.following)
                .then(action((result) => {
                    const {errors, profile} = result;
                    if (errors !== undefined) {
                        RealWorldApi.alertError(errors)
                    } else if (profile !== undefined) {
                        this._profile = profile;
                    }
                })).finally(() => {
                    this._isFollowLoading = false;
                }
            )
        }
    }

    static INSTANCE: ProfileStore;
}

ProfileStore.INSTANCE = new ProfileStore();