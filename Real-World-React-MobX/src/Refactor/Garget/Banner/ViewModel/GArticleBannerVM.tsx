import ArticleVo from "../../../Vo/ArticleVo";

export abstract class GArticleBannerVM {
    abstract article: ArticleVo;
    abstract linkToUser: string;
    abstract showEditButton?: boolean;
    abstract linkToEdit?: any;
    abstract showDeleteButton?: boolean;
    abstract onClickDeleteButton?: any;
}