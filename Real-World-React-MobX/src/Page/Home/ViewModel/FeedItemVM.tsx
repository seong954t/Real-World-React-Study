import {GFeedItemVM} from "../../../Garget/Feed/ViewModel/GFeedItemVM";
import {Article} from "../../../Model/Article";
import ArticleVo from "../../../Vo/ArticleVo";
import LINK from "../../../PageRouter/Link";
import {FeedService} from "../../../Service/FeedService";

export class FeedItemVM extends GFeedItemVM {

    readonly feedService = FeedService.instance;

    article: ArticleVo;
    linkToUser: string;
    linkToArticle: string;
    isFavoriteLoading: boolean;

    constructor(article: Article) {
        super();
        this.article = article;
        this.linkToUser = LINK.USER(this.article.author.username);
        this.linkToArticle = LINK.ARTICLE(this.article.slug);
        this.isFavoriteLoading = this.feedService.isFavoriteLoadings.get(this.article.slug) || false;
    };

    onClickFavorite = (e: any) => {
        this.feedService.favoriteArticle(this.article.slug);
    };
}