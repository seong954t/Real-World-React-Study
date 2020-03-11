import {GCommentEditorVM} from "../../../Garget/Comment/ViewModel/GCommentEditorVM";
import {CommentService} from "../../../Service/CommentService";

export class CommentEditorVM extends GCommentEditorVM {

    readonly commentService = CommentService.instance;

    image: string;
    onClickPost: React.MouseEventHandler<HTMLButtonElement>;


}