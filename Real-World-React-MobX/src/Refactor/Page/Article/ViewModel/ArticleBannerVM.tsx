import {GArticleBannerVM} from "../../../Garget/Banner/ViewModel/GArticleBannerVM";
import ArticleVo from "../../../Vo/ArticleVo";
import LINK from "../../../../PageRouter/Link";
import {UserService} from "../../../Service/UserService";

export class ArticleBannerVM extends GArticleBannerVM{

    readonly userService = UserService.instance;

    article: ArticleVo;
    linkToEdit: string;
    linkToUser: string;
    onClickDeleteButton: any;
    showDeleteButton: boolean;
    showEditButton: boolean;

    constructor(article: ArticleVo) {
        super();
        this.article = article;
        this.linkToEdit = LINK.REFACTOR.EDITOR(article.slug);
        this.linkToUser = LINK.REFACTOR.USER(article.author.username);
        this.showDeleteButton = article.author.username === this.userService.user.username;
        this.showEditButton = article.author.username === this.userService.user.username;
    }
}