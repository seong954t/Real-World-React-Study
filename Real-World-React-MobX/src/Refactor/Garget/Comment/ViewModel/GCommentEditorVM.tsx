import {MouseEventHandler} from "react";

export abstract class GCommentEditorVM {
    abstract onClickPost: MouseEventHandler<HTMLButtonElement>;
    abstract image: string;
}