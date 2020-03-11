import {GProfileBannerVM} from "../../../Garget/Banner/ViewModel/GProfileBannerVM";
import ProfileVo from "../../../Vo/ProfileVo";

export class ProfileBannerVM extends GProfileBannerVM{
    profile: ProfileVo;

    constructor(profile: ProfileVo) {
        super();
        this.profile = profile;
    }

}