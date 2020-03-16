import {GFeedListVM} from "../../../Garget/Feed/ViewModel/GFeedListVM";
import {FeedItemVM} from "./FeedItemVM";
import {FeedService} from "../../../Service/FeedService";
import {computed} from "mobx";

export class FeedListVM extends GFeedListVM {

    readonly feedService = FeedService.instance;

    @computed
    get feedItemList(){
        return this.feedService.articles.map((article) => {
            return new FeedItemVM(article.slug);
        })
    }
}