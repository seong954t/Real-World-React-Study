import {action, computed, observable, ObservableMap} from "mobx";
import ArticleDTO from "../DTO/ArticleDTO";
import RealWorldApi from "../RealWordApi/RealWorldApi";
import Auth from "../Auth/Auth";

export default class ArticlesStore {

    readonly MAIN_FEED_SIZE: number = 10;
    readonly INDIVIDUAL_FEED_SIZE: number = 5;

    @observable
    private _articles: Map<string, ArticleDTO> = new Map<string, ArticleDTO>();

    @observable
    private _article?: ArticleDTO;

    @observable
    private articlesCount: number = 0;

    @observable
    private _page: number = 1;

    @observable
    private FEED_SIZE: number = this.MAIN_FEED_SIZE;

    @observable
    private _isArticlesLoading: boolean = false;

    @observable
    private _favoriteLoadings: Map<string, boolean> = new Map<string, boolean>();

    @computed
    get page(){
        return this._page;
    }

    @computed
    get isArticlesLoading(){
        return this._isArticlesLoading
    }

    @computed
    get favoriteLoadings(){
        return new Map<string, boolean>(this._favoriteLoadings);
    }

    @action
    public loadArticles(tab: string, tag: string, name: string, page: number): void {
        const url = this.getRequestArticleUrl(tab, tag, name, page);
        if(!this._isArticlesLoading){
            if (page === 1) {
                this._isArticlesLoading = true;
            }
            RealWorldApi.getArticles(url)
                .then(action((result) => {
                    const {errors, articles, articlesCount} = result;
                    if (errors !== undefined) {
                        RealWorldApi.alertError(errors);
                    } else {
                        this._articles.clear();
                        this._favoriteLoadings.clear();
                        articles.forEach((article: ArticleDTO) => {
                            this._articles.set(article.slug, article);
                            this._favoriteLoadings.set(article.slug, false);
                        });
                        this.articlesCount = articlesCount;
                        this._page = page;
                    }
                })).finally(action(() => {
                    this._isArticlesLoading = false;
                })
            )
        }
    }

    @action
    public isArticleLoading(slug: string): boolean {
        return this._favoriteLoadings.get(slug) || false;
    }

    @computed
    get articles(): ArticleDTO[] {
        return Array.from(this._articles.values());
    }

    @computed
    get article(): ArticleDTO | undefined{
        return this._article
    }

    @action
    public loadArticle(slug: string) {
        const article = this._articles.get(slug);

        if (article) {
            this._article = article;
        } else {
            RealWorldApi.getArticle(slug)
                .then(action((result) => {
                    const {errors, article} = result;
                    if (errors !== undefined) {
                        RealWorldApi.alertError(errors);
                    } else {
                        this._article = article;
                    }
                }))
        }
    }

    @action
    public deleteArticle(slug: string): Promise<any> {
        return RealWorldApi.deleteArticle(slug)
            .then(action((result) => {
                const {errors} = result;
                if (errors !== undefined) {
                    RealWorldApi.alertError(errors);
                } else {
                    this._article = undefined;
                }
            }))
    }

    @action
    public favoriteArticle(slug: string) {
        const tempArticle = this._articles.get(slug);

        if (tempArticle !== undefined && Auth.isSigned() && !this._favoriteLoadings.get(slug)) {
            this._favoriteLoadings.set(slug, true);
            RealWorldApi.favoriteArticle(slug, tempArticle.favorited)
                .then(action((result) => {
                    console.log(result);
                    const {errors, article} = result;
                    if (errors !== undefined) {
                        RealWorldApi.alertError(errors);
                    } else {
                        this._articles.set(slug, article);
                    }
                })).finally(action(() => {
                    this._favoriteLoadings.set(slug, false);
                })
            )
        }
    }

    public getPageListSize(): number {
        return Math.ceil(this.articlesCount / this.FEED_SIZE);
    }

    private getRequestArticleUrl = (tab: string, tag: string, name: string, page: number): string => {
        const url = RealWorldApi.domain + 'articles/';
        this.FEED_SIZE = name ? this.INDIVIDUAL_FEED_SIZE : this.MAIN_FEED_SIZE;
        const query = `?limit=${this.FEED_SIZE}&offset=${(page - 1) * this.FEED_SIZE}`;

        if (tab === 'feed') {
            return url + '/feed/' + query
        }
        if (tab === 'favorites') {
            return url + query + `&favorited=${name}`;
        }
        if (tag) {
            return url + query + `&tag=${tag}`;
        }
        if (name) {
            return url + query + `&author=${name}`;
        }
        return url + query;
    };

    static INSTANCE: ArticlesStore;
}

ArticlesStore.INSTANCE = new ArticlesStore();