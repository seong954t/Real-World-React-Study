import {GCommentListVM} from "../../../Garget/Comment/ViewModel/GCommentListVM";
import {GCommentItemVM} from "../../../Garget/Comment/ViewModel/GCommentItemVM";
import CommentVo from "../../../Vo/CommentVo";
import {CommentItemVM} from "./CommentItemVM";
import {Comment} from "../../../Model/Comment";
import {CommentService} from "../../../Service/CommentService";
import {computed} from "mobx";

export class CommentListVM extends GCommentListVM{

    readonly commentService = CommentService.instance;
    slug: string;

    constructor(slug: string) {
        super();
        this.slug = slug;
    }

    @computed
    get commentItemList(){
        return this.commentService.comments.map((comment) => {
            return new CommentItemVM(comment.id, this.slug);
        })
    }
}