import {GCommentItemVM} from "../../../Garget/Comment/ViewModel/GCommentItemVM";
import CommentVo from "../../../Vo/CommentVo";
import LINK from "../../../../PageRouter/Link";
import {UserService} from "../../../Service/UserService";
import {CommentService} from "../../../Service/CommentService";

export class CommentItemVM extends GCommentItemVM{

    readonly userService = UserService.instance;
    readonly commentService = CommentService.instance;

    comment: CommentVo;
    linkToUser: string;
    onClickTrashBox: any;
    showTrashBox: boolean;
    slug: string

    constructor(comment: CommentVo, slug: string) {
        super();
        this.comment = comment;
        this.linkToUser = LINK.REFACTOR.USER(comment.author.username);
        this.showTrashBox = this.userService.user.username === comment.author.username;
        this.slug = slug;
        this.onClickTrashBox = this.onClickTrashBoxHandler;
    }

    onClickTrashBoxHandler = () => {
        this.commentService.deleteComment(this.slug, this.comment.id);
    }

}