import {GFeedTabItemVM} from "../../../Garget/Feed/ViewModel/GFeedTabItemVM";
import LINK from "../../../../PageRouter/Link";
import queryString from "query-string";

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
            case "Your Feed":
                return "/refactor/?tab=feed";
            case "GlobalFeed":
                return "/refactor/";
            default:
                return `?tab=tag&tag=${tag}`;
        }
    }

    isActive(title: string, query: string): boolean {
        const {tab, tag} = queryString.parse(query);
        if(!tab && title === "GlobalFeed"){
            return true;
        } else if(tab === "feed" && title === "Your Feed"){
            return true;
        } else if(tab === "tag" && title === `#${tag}`){
            return true;
        }
        return false;
    }
}