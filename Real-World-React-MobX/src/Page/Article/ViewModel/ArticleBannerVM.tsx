import {GArticleBannerVM} from "../../../Garget/Banner/ViewModel/GArticleBannerVM";
import LINK from "../../../PageRouter/Link";
import {UserService} from "../../../Service/UserService";
import {ArticleService} from "../../../Service/ArticleService";
import {MouseEventHandler} from "react";
import {computed} from "mobx";

export class ArticleBannerVM extends GArticleBannerVM{

    readonly userService = UserService.instance;
    readonly articleService = ArticleService.instance;

    linkToEdit: string;
    linkToUser: string;
    onClickDeleteButton: MouseEventHandler<HTMLButtonElement>;
    showDeleteButton: boolean;
    showEditButton: boolean;

    constructor() {
        super();
        this.linkToEdit = LINK.EDITOR(this.article.slug);
        this.linkToUser = LINK.USER(this.article.author.username);
        this.showDeleteButton = this.article.author.username === this.userService.user.username;
        this.showEditButton = this.article.author.username === this.userService.user.username;
        this.onClickDeleteButton = this.onClickDeleteButtonHandler;
    }

    @computed
    get article(){
        return this.articleService.article;
    }

    onClickDeleteButtonHandler = () => {
        this.articleService.deleteArticle(this.article.slug)
            .then(() => {
                location.href = LINK.HOME;
            });
    }
}