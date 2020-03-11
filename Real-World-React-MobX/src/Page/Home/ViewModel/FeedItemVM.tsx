import {GFeedItemVM} from "../../../Garget/Feed/ViewModel/GFeedItemVM";
import {Article} from "../../../Model/Article";
import ArticleVo from "../../../Vo/ArticleVo";
import LINK from "../../../PageRouter/Link";
import {FeedService} from "../../../Service/FeedService";

export class FeedItemVM extends GFeedItemVM {
    article: ArticleVo;
    linkToUser: string;
    linkToArticle: string;

    constructor(article: Article) {
        super();
        this.article = article;
        this.linkToUser = LINK.USER(this.article.author.username);
        this.linkToArticle = LINK.ARTICLE(this.article.slug);
    }

    onClickFavorite = (e: any) => {
        FeedService.instance.favoriteArticle(e.slug);
    }
}