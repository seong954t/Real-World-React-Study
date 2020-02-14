import {action, computed, observable} from "mobx";
import CommentDTO from "../DTO/CommentDTO";
import RealWorldApi from "../RealWordApi/RealWorldApi";

export default class CommentsStore {
    @observable
    private comments: Map<number, CommentDTO> = observable.map();

    @observable
    private comment: string = "";

    @observable
    private isCommentsLoading: boolean = false;

    @observable
    private slug:string = ""
    @action
    public loadComments(slug: string) {
        console.log("loadComments", slug)
        this.isCommentsLoading = true;
        this.slug = slug;
        RealWorldApi.getComments(slug)
            .then(res => res.json())
            .then(action((result) => {
                const {errors, comments} = result;
                if (errors !== undefined) {
                    RealWorldApi.alertError(errors);
                } else {
                    this.comments.clear();
                    comments.forEach((comment: CommentDTO) => {
                        this.comments.set(comment.id, comment);
                    })
                    this.comment = "";
                    this.isCommentsLoading = false;
                }
            }))
    }

    @computed
    get getComments() {
        return Array.from(this.comments.values()).sort((a: CommentDTO, b: CommentDTO) => { return b.id - a.id});
    }

    @action
    public addComment(slug: string) {
        RealWorldApi.addComment(slug, this.comment)
            .then(res => res.json())
            .then(action((result) => {
                const {errors, comment} = result;
                if (errors !== undefined) {
                    RealWorldApi.alertError(errors)
                } else {
                    this.comments.set(comment.id, comment);
                    this.comment = "";
                }
            }))
    }

    @action
    public deleteComment(slug: string, id: number) {
        RealWorldApi.deleteComment(slug, id)
            .then(res => res.json())
            .then(action((result) => {
                const {errors} = result;
                if (errors !== undefined) {
                    RealWorldApi.alertError(errors)
                } else {
                    this.comments.delete(id);
                }
            }))
    }
}