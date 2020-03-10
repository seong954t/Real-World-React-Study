import ArticleVo from "../../../Vo/ArticleVo";

export abstract class GArticleBannerVM {
    abstract article: ArticleVo;
    abstract linkToUser: string;
}