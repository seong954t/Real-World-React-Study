import {GCommentListVM} from "../../../Garget/Comment/ViewModel/GCommentListVM";
import {GCommentItemVM} from "../../../Garget/Comment/ViewModel/GCommentItemVM";
import CommentVo from "../../../Vo/CommentVo";
import {CommentItemVM} from "./CommentItemVM";
import {Comment} from "../../../Model/Comment";

export class CommentListVM extends GCommentListVM{
    commentItemList: Array<GCommentItemVM>;

    constructor(commentItems: Array<CommentVo>, slug: string) {
        super();
        this.commentItemList = new Array<GCommentItemVM>();
        commentItems.map((comment) => {
            this.commentItemList.push(new CommentItemVM(new Comment(comment), slug))
        })
    }
}