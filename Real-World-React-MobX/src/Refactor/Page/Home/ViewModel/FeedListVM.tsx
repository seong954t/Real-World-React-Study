import {GFeedListVM} from "../../../Garget/Feed/ViewModel/GFeedListVM";
import {GFeedItemVM} from "../../../Garget/Feed/ViewModel/GFeedItemVM";
import ArticleVo from "../../../Vo/ArticleVo";
import {FeedItemVM} from "./FeedItemVM";
import {Article} from "../../../Model/Article";

export class FeedListVM extends GFeedListVM{
    feedItemList: Array<GFeedItemVM>;

    constructor(feedList: ArticleVo[]) {
        super();
        this.feedItemList = new Array();
        feedList.map((article) => {
            this.feedItemList.push(new FeedItemVM(new Article(article)))
        })
    }
}