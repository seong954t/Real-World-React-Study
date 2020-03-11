import ProfileVo from "../Vo/ProfileVo";
import {observable} from "mobx";

export class Profile implements ProfileVo {
    username: string = "";
    bio: string = "";
    image: string = "";
    @observable following: boolean = false;

    constructor(profile?: Readonly<ProfileVo>) {
        if (profile) {
            this.username = profile.username;
            this.bio = profile.bio;
            this.image = profile.image;
            this.following = profile.following;
        }
    }
}