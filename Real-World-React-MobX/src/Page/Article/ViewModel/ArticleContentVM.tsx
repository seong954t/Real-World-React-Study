import {GArticleContentVM} from "../../../Garget/Article/ViewModel/GArticleContentVM";
import ArticleVo from "../../../Vo/ArticleVo";

export class ArticleContentVM extends GArticleContentVM{
    article: ArticleVo;

    constructor(article: ArticleVo) {
        super();
        this.article = article;
    }

}