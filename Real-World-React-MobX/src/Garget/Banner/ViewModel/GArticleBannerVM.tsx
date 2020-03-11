import ArticleVo from "../../../Vo/ArticleVo";
import {MouseEventHandler} from "react";

export abstract class GArticleBannerVM {
    abstract article: ArticleVo;
    abstract linkToUser: string;
    abstract showEditButton?: boolean;
    abstract linkToEdit?: string;
    abstract showDeleteButton?: boolean;
    abstract onClickDeleteButton?: MouseEventHandler<HTMLButtonElement>;
}