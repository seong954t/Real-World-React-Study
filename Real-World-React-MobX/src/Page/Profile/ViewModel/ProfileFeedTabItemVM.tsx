import {GFeedTabItemVM} from "../../../Garget/Feed/ViewModel/GFeedTabItemVM";
// @ts-ignore
import {FeedTabType} from "../../../Garget/Feed/View/FeedTabType";
import LINK from "../../../PageRouter/Link";

export class ProfileFeedTabItemVM extends GFeedTabItemVM {
    title: string;
    linkToTab: string;
    active: boolean;

    constructor(title: string, name: string, tab: string) {
        super();
        this.title = title;
        this.linkToTab = this.getLinkToTab(title, name);
        this.active = this.isActive(title, name, tab);
    }

    getLinkToTab(title: string, name: string): string {
        switch (title) {
            case FeedTabType.MYARTICLES:
                return `/@${name}`;
            case FeedTabType.FAVORITEDARITCLES:
                return `/@${name}/favorites`;
            default:
                return LINK.HOME;
        }
    }

    isActive(title: string, name: string, tab: string): boolean {
        if(title === FeedTabType.MYARTICLES && !tab) {
            return true;
        } else if (title === FeedTabType.FAVORITEDARITCLES && tab){
            return true;
        }
        return false;
    }
}