import {GFeedItemVM} from "../../../Garget/Feed/ViewModel/GFeedItemVM";
import {Article} from "../../../Model/Article";
import LINK from "../../../PageRouter/Link";
import {FeedService} from "../../../Service/FeedService";
import {computed} from "mobx";

export class FeedItemVM extends GFeedItemVM {

    readonly feedService = FeedService.instance;

    slug: string;
    linkToUser: string;
    linkToArticle: string;

    constructor(slug: string) {
        super();
        this.slug = slug;
        this.linkToUser = LINK.USER(this.article.author.username);
        this.linkToArticle = LINK.ARTICLE(this.article.slug);
    };

    @computed
    get article(){
        return new Article(this.feedService._articles.get(this.slug));
    }

    onClickFavorite = (e: any) => {
        this.feedService.favoriteArticle(this.article.slug);
    };

    @computed
    get isFavoriteLoading() {
        return this.feedService.isFavoriteLoadings.get(this.article.slug) || false;
    }
}