import ArticleVo from "../../Vo/ArticleVo";
import {action, observable} from "mobx";
import {Article} from "../Model/Article";
import RealWorldApi from "../Request/RealWorldApi";

export class ArticleService {

    @observable article: ArticleVo | null = null;
    @observable isLoading: boolean = false;

    @action
    loadArticle(slug: string) {
        this.isLoading = true;
        RealWorldApi.getArticle(slug)
            .then(action((result) => {
                const {errors, article} = result;
                if (article) {
                    this.article = new Article(article);
                }
            })).finally(action(() => {
            this.isLoading = false;
        }))
    }

    @action
    public createArticle(title: string, description: string, body: string, tagList: string[]): Promise<any> {
        this.isLoading = true;
        return RealWorldApi.createArticle(title, description, body, tagList)
            .then(action((result) => {
                const {errors, article} = result;
                if (article) {
                    this.article = article;
                }
            })).finally(action(() => {
                this.isLoading = false;
            }))
    }

    @action
    updateArticle(title: string, description: string, body: string, tagList: string[], slug: string): Promise<any> {
        this.isLoading = true;
        return RealWorldApi.updateArticle(title, description, body, tagList, slug)
            .then(action((result) => {
                const {errors, article} = result;
                if (article) {
                    this.article = article;
                } else if (article !== undefined) {
                }
            })).finally(action(() => {
                this.isLoading = false;
            }))
    }

    @action
    deleteArticle(slug: string): Promise<any> {
        this.isLoading = true;
        return RealWorldApi.deleteArticle(slug)
            .then(action((result) => {
                const {errors} = result;
                if (!errors) {
                    this.article = null;
                }
            })).finally(() => {
                this.isLoading = false;
            })
    }

    private static _instance = new ArticleService();

    static get instance(): ArticleService {
        return this._instance;
    }
}