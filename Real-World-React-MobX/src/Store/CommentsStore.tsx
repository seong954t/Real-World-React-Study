import {action, computed, observable} from "mobx";
import CommentDTO from "../DTO/CommentDTO";
import RealWorldApi from "../RealWordApi/RealWorldApi";

export default class CommentsStore {
    @observable
    private _comments: Map<number, CommentDTO> = new Map<number, CommentDTO>();

    @observable
    public comment: string = "";

    @observable
    private _isCommentsLoading: boolean = false;

    @observable
    private slug: string = ""

    @computed
    get isCommentsLoading(){
        return this._isCommentsLoading;
    }

    @action
    public loadComments(slug: string) {
        if(this.slug !== slug && !this._isCommentsLoading) {
            this._isCommentsLoading = true;
            this.slug = slug;
            this.comment = "";
            this._comments.clear();

            RealWorldApi.getComments(slug)
                .then(action((result) => {
                    const {errors, comments} = result;
                    if (errors !== undefined) {
                        RealWorldApi.alertError(errors);
                    } else {
                        comments.forEach((comment: CommentDTO) => {
                            this._comments.set(comment.id, comment);
                        })
                    }
                })).finally(action(() => {
                    this._isCommentsLoading = false;
                })
            )
        }
    }

    @computed
    get comments() {
        return Array.from(this._comments.values()).sort((a: CommentDTO, b: CommentDTO) => {
            return b.id - a.id
        });
    }

    @action
    public addComment(slug: string) {
        RealWorldApi.addComment(slug, this.comment)
            .then(action((result) => {
                const {errors, comment} = result;
                if (errors !== undefined) {
                    RealWorldApi.alertError(errors)
                } else {
                    this._comments.set(comment.id, comment);
                    this.comment = "";
                }
            }))
    }

    @action
    public deleteComment(slug: string, id: number) {
        RealWorldApi.deleteComment(slug, id)
            .then(action((result) => {
                const {errors} = result;
                if (errors !== undefined) {
                    RealWorldApi.alertError(errors)
                } else {
                    this._comments.delete(id);
                }
            }))
    }

    static INSTANCE: CommentsStore;
}

CommentsStore.INSTANCE = new CommentsStore();