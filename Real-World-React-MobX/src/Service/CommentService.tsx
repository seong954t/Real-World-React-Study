export class CommentService {



    private static _instance = new CommentService();

    static get instance(): CommentService {
        return this._instance;
    }
}