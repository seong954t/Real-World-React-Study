import {GArticleContentVM} from "../../../Garget/Article/ViewModel/GArticleContentVM";
import ArticleVo from "../../../Vo/ArticleVo";
import {ArticleService} from "../../../Service/ArticleService";
import {computed} from "mobx";

export class ArticleContentVM extends GArticleContentVM{

    readonly articleService = ArticleService.instance;

    @computed
    get article(){
        return this.articleService.article;
    }
}