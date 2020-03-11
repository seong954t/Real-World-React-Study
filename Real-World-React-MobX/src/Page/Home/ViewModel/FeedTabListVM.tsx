import {GFeedTabListVM} from "../../../Garget/Feed/ViewModel/GFeedTabListVM";
import {GFeedTabItemVM} from "../../../Garget/Feed/ViewModel/GFeedTabItemVM";
import {FeedTabItemVM} from "./FeedTabItemVM";

export class FeedTabListVM extends GFeedTabListVM {
    feedTabItemList: Array<GFeedTabItemVM>;

    constructor(feedTabItems: Array<string>, query: string) {
        super();
        this.feedTabItemList = new Array<GFeedTabItemVM>();

        feedTabItems.map((title) => {
            this.feedTabItemList.push(new FeedTabItemVM(title, query));
        });
    }

}