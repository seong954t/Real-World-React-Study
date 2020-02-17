import {action, computed, observable} from "mobx";
import PostDTO from "../DTO/PostDTO";
import RealWorldApi from "../RealWordApi/RealWorldApi";

export default class PostStore {
    @observable
    public post: PostDTO = {
        tagList: new Set<string>(),
        description: "",
        body: "",
        title: ""
    };

    @observable
    tag: string = "";

    @action
    public setPost(key: keyof PostDTO, value: string) {
        if(key !== "tagList"){
            this.post[key] = value;
        }
    }

    @action
    public setTag(value: string){
        this.tag = value;
    }

    @computed
    get tagList(){
        return Array.from(this.post.tagList);
    }


    @action
    public appendTag() {
        this.post.tagList.add(this.tag);
        this.tag = "";
    }

    @action
    public removeTag(tag: string) {
        this.post.tagList.delete(tag)
    }

    @action
    public resetPost() {
        this.post.tagList.clear();
        this.post.description = "";
        this.post.body = "";
        this.post.title = "";
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
                    this.post = {
                        tagList: tagList,
                        description: description,
                        body: body,
                        title: title
                    }
                }
            }))
    }

    @action
    public createArticle(history: any) {
        const {title, description, body, tagList} = this.post;

        RealWorldApi.createArticle(title, description, body, tagList)
            .then(action((result) => {
                const {errors, article} = result;
                if (errors !== undefined) {
                    RealWorldApi.alertError(errors);
                } else if (article !== undefined) {
                    this.resetPost();
                    history.replace(`/article/${article.slug}`)
                }
            }))
    }

    @action
    public updateArticle(slug: string, history: any) {
        const {title, description, body, tagList} = this.post;

        RealWorldApi.updateArticle(title, description, body, tagList, slug)
            .then(action((result) => {
                const {errors, article} = result;
                if (errors !== undefined) {
                    RealWorldApi.alertError(errors);
                } else if (article !== undefined) {
                    this.resetPost();
                    history.replace(`/article/${slug}`)
                }
            }))
    }

    static INSTANCE: PostStore;
}

PostStore.INSTANCE = new PostStore();