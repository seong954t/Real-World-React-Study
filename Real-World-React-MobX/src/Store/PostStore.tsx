import {action, computed, observable} from "mobx";
import PostDTO from "../DTO/PostDTO";
import RealWorldApi from "../RealWordApi/RealWorldApi";
import {addObserver} from "mobx/lib/core/observable";

export default class PostStore {
    @observable
    private _post: PostDTO = {
        tagList: new Set<string>(),
        description: "",
        body: "",
        title: ""
    };

    @observable
    tag: string = "";

    @computed
    get post(){
        return this._post;
    }

    @action
    public setPost(key: keyof PostDTO, value: string) {
        if(key !== "tagList"){
            this._post[key] = value;
        }
    }

    @action
    public setTag(value: string){
        this.tag = value;
    }

    @computed
    get tagList(){
        return Array.from(this._post.tagList);
    }


    @action
    public appendTag() {
        console.log(this._post);
        this._post.tagList.add(this.tag);
        this.tag = "";
    }

    @action
    public removeTag(tag: string) {
        this._post.tagList.delete(tag)
    }

    @action
    public resetPost() {
        this._post.tagList.clear();
        this._post.description = "";
        this._post.body = "";
        this._post.title = "";
    }

    @action
    public loadPost(slug: string) {
        RealWorldApi.getArticle(slug)
            .then(action((result) => {
                const {errors, article} = result;
                if (errors !== undefined) {
                    RealWorldApi.alertError(errors);
                } else {
                    const {title, description, body, tagList} = article;

                    this._post = {
                        tagList: new Set<string>(tagList),
                        description: description,
                        body: body,
                        title: title
                    }
                }
            }))
    }

    @action
    public createArticle(): Promise<any> {
        const {title, description, body, tagList} = this._post;
        return RealWorldApi.createArticle(title, description, body, tagList)
            .then(action((result) => {
                const {errors, article} = result;
                if (errors !== undefined) {
                    RealWorldApi.alertError(errors);
                } else if (article !== undefined) {
                    this.resetPost();
                }
                return article;
            }))
    }

    @action
    public updateArticle(slug: string): Promise<any> {
        const {title, description, body, tagList} = this._post;
        return RealWorldApi.updateArticle(title, description, body, tagList, slug)
            .then(action((result) => {
                const {errors, article} = result;
                if (errors !== undefined) {
                    RealWorldApi.alertError(errors);
                } else if (article !== undefined) {
                    this.resetPost();
                }
            }))
    }

    static INSTANCE: PostStore;
}

PostStore.INSTANCE = new PostStore();