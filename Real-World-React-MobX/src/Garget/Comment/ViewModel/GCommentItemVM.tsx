import CommentVo from "../../../Vo/CommentVo";

export abstract class GCommentItemVM {
    abstract comment: CommentVo;
    abstract linkToUser: string;
    abstract showTrashBox?: boolean;
    abstract onClickTrashBox?: any;
}