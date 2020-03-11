import {GArticleBannerVM} from "../../../Garget/Banner/ViewModel/GArticleBannerVM";
import ArticleVo from "../../../Vo/ArticleVo";
import LINK from "../../../PageRouter/Link";
import {UserService} from "../../../Service/UserService";
import {ArticleService} from "../../../Service/ArticleService";

export class ArticleBannerVM extends GArticleBannerVM{

    readonly userService = UserService.instance;
    readonly articleService = ArticleService.instance;

    article: ArticleVo;
    linkToEdit: string;
    linkToUser: string;
    onClickDeleteButton: any;
    showDeleteButton: boolean;
    showEditButton: boolean;

    constructor(article: ArticleVo) {
        super();
        this.article = article;
        this.linkToEdit = LINK.EDITOR(article.slug);
        this.linkToUser = LINK.USER(article.author.username);
        this.showDeleteButton = article.author.username === this.userService.user.username;
        this.showEditButton = article.author.username === this.userService.user.username;
        this.onClickDeleteButton = this.onClickDeleteButtonHandler;
    }

    onClickDeleteButtonHandler = () => {
        this.articleService.deleteArticle(this.article.slug)
            .then(() => {
                location.href = LINK.HOME;
            });
    }
}