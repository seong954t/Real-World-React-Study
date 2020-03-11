import {action, computed, observable} from "mobx";
import CommentVo from "../Vo/CommentVo";
import {Comment} from "../Model/Comment";
import RealWorldApi from "../RealWorldApi/RealWorldApi";

export class CommentService {

    @observable _comments: Map<number, CommentVo> = new Map<number, CommentVo>();
    @observable isCommentsLoading: boolean = false;

    @action
    public loadComments(slug: string) {
        if (!this.isCommentsLoading) {
            this.isCommentsLoading = true;
            this._comments.clear();

            RealWorldApi.getComments(slug)
                .then(action((result) => {
                    const {errors, comments} = result;
                    if (errors !== undefined) {
                        throw Response.error();
                    } else {
                        comments.forEach((comment: CommentVo) => {
                            this._comments.set(comment.id, new Comment(comment));
                        })
                    }
                })).finally(action(() => {
                    this.isCommentsLoading = false;
                })
            )
        }
    }

    @computed
    get comments(): Array<CommentVo> {
        return Array.from(this._comments.values()).sort((a: CommentVo, b: CommentVo) => {
            return b.id - a.id
        });
    }

    @action
    public addComment(slug: string, text: string): Promise<any> {
        return RealWorldApi.addComment(slug, text)
            .then(action((result) => {
                const {errors, comment} = result;
                if (errors !== undefined) {
                    throw Response.error();
                } else {
                    this._comments.set(comment.id, new Comment(comment));
                }
            }))
    }

    @action
    public deleteComment(slug: string, id: number) {
        RealWorldApi.deleteComment(slug, id)
            .then(action((result) => {
                const {errors} = result;
                if (errors !== undefined) {
                    throw Response.error();
                } else {
                    this._comments.delete(id);
                }
            }))
    }

    static _instance: CommentService;

    static get instance(): CommentService {
        return this._instance;
    }
}

CommentService._instance =  new CommentService();