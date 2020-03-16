import {GCommentItemVM} from "../../../Garget/Comment/ViewModel/GCommentItemVM";
import LINK from "../../../PageRouter/Link";
import {UserService} from "../../../Service/UserService";
import {CommentService} from "../../../Service/CommentService";
import {MouseEventHandler} from "react";
import {computed} from "mobx";
import {Comment} from "../../../Model/Comment";

export class CommentItemVM extends GCommentItemVM{

    readonly userService = UserService.instance;
    readonly commentService = CommentService.instance;

    linkToUser: string;
    onClickTrashBox: MouseEventHandler<HTMLSpanElement>;
    showTrashBox: boolean;
    slug: string;
    id: number;

    constructor(id: number, slug: string) {
        super();
        this.id = id;
        this.linkToUser = LINK.USER(this.comment.author.username);
        this.showTrashBox = this.userService.user.username === this.comment.author.username;
        this.slug = slug;
        this.onClickTrashBox = this.onClickTrashBoxHandler;
    }

    @computed
    get comment(){
        return this.commentService._comments.get(this.id) || new Comment();
    }

    onClickTrashBoxHandler = () => {
        this.commentService.deleteComment(this.slug, this.comment.id);
    }

}