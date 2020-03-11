import {GFeedTabListVM} from "../../../Garget/Feed/ViewModel/GFeedTabListVM";
import {GFeedTabItemVM} from "../../../Garget/Feed/ViewModel/GFeedTabItemVM";
import {ProfileFeedTabItemVM} from "./ProfileFeedTabItemVM";

export class ProfileFeedTabListVM extends GFeedTabListVM {
    feedTabItemList: Array<GFeedTabItemVM>;

    constructor(feedTabItems: Array<string>, name: string, tab: string) {
        super();
        this.feedTabItemList = new Array<GFeedTabItemVM>();

        feedTabItems.map((title) => {
            this.feedTabItemList.push(new ProfileFeedTabItemVM(title, name, tab));
        });
    }

}