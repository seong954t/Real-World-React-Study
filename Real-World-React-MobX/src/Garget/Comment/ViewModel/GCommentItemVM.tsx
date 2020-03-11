import CommentVo from "../../../Vo/CommentVo";
import {MouseEventHandler} from "react";

export abstract class GCommentItemVM {
    abstract comment: CommentVo;
    abstract linkToUser: string;
    abstract showTrashBox?: boolean;
    abstract onClickTrashBox?: MouseEventHandler<HTMLSpanElement>;
}