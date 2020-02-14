import {action, observable} from "mobx";
import PostDTO from "../DTO/PostDTO";
import RealWorldApi from "../RealWordApi/RealWorldApi";

export default class PostStore {
    @observable
    public post: PostDTO = {
        tagList: [],
        description: "",
        body: "",
        title: ""
    };

    @observable
    tag: string = "";

    @action
    public setPost(key: string, value: string) {
        if (key === "tag") {
            this.tag = value;
        } else {
            this.post = {
                ...this.post,
                [key]: value
            }
        }
    }

    @action
    public appendTag() {
        const {tagList} = this.post;
        tagList.push(this.tag);
        this.post = {
            ...this.post,
            tagList: Array.from(new Set(tagList))
        };
        this.tag = "";
    }

    @action
    public removeTag(info: string) {
        const {tagList} = this.post;

        this.post = {
            ...this.post,
            tagList: tagList.filter((key) => (key !== info))
        }
    }

    @action
    public resetPost() {
        this.post.tagList = [];
        this.post.description = "";
        this.post.body = "";
        this.post.title = "";
    }

    @action
    public loadPost(slug: string) {
        RealWorldApi.getArticle(slug)
            .then(res => res.json())
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
            .then(res => res.json())
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
            .then(res => res.json())
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
}