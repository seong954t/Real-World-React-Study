import {GFeedTabItemVM} from "../../../Garget/Feed/ViewModel/GFeedTabItemVM";
// @ts-ignore
import queryString from "query-string";
import {FeedTabType} from "../../../Garget/Feed/View/FeedTabType";

export class FeedTabItemVM extends GFeedTabItemVM {
    title: string;
    linkToTab: string;
    active: boolean;

    constructor(title: string, query: string) {
        super();
        this.title = title;
        this.linkToTab = this.getLinkToTab(title, query);
        this.active = this.isActive(title, query);
    }

    getLinkToTab(title: string, query: string): string {
        const {tag} = queryString.parse(query);
        switch (title) {
            case FeedTabType.YOURFEED:
                return "/?tab=feed";
            case FeedTabType.GLOBALFEED:
                return "/";
            default:
                return `?tab=tag&tag=${tag}`;
        }
    }

    isActive(title: string, query: string): boolean {
        const {tab, tag} = queryString.parse(query);
        if(!tab && title === FeedTabType.GLOBALFEED){
            return true;
        } else if(tab === "feed" && title === FeedTabType.YOURFEED){
            return true;
        } else if(tab === "tag" && title === `#${tag}`){
            return true;
        }
        return false;
    }
}