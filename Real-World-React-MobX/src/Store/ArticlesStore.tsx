import {action, computed, observable, ObservableMap} from "mobx";
import ArticleDTO from "../DTO/ArticleDTO";
import FeedTabStore from "./FeedTabStore";
import RealWorldApi from "../RealWordApi/RealWorldApi";
import Auth from "../Auth/Auth";

export default class ArticlesStore {

    readonly MAIN_FEED_SIZE: number = 10;
    readonly INDIVIDUAL_FEED_SIZE: number = 5;

    @observable
    private articles: ObservableMap<string, ArticleDTO> = observable.map();

    @observable
    private article?: ArticleDTO;

    @observable
    private articlesCount: number = 0;

    @observable
    private page: number = 1;

    @observable
    private FEED_SIZE: number = this.MAIN_FEED_SIZE;

    @observable
    private isArticlesLoading: boolean = false;

    @observable
    private favoriteLoadingSlug: string = "";

    @action
    public loadArticles(feedTabStore: FeedTabStore, page: number): void {
        const url = this.getRequestArticleUrl(feedTabStore, page);
        if (page === 1) {
            this.isArticlesLoading = true;
        }
        RealWorldApi.getArticles(url)
            .then(res => res.json())
            .then(action((result) => {
                const {errors, articles, articlesCount} = result;
                if (errors !== undefined) {
                    RealWorldApi.alertError(errors);
                } else {
                    this.articles.clear();
                    articles.forEach((article: ArticleDTO) => {
                        this.articles.set(article.slug, article);
                    });
                    this.articlesCount = articlesCount;
                    this.page = page;
                }
            })).finally(() => {
                this.isArticlesLoading = false;
            }
        )
    }

    @computed
    get getArticles() {
        return Array.from(this.articles.values());
    }

    @action
    public loadArticle(slug: string) {
        const article = this.articles.get(slug);

        if (article) {
            this.article = article;
        } else {
            RealWorldApi.getArticle(slug)
                .then(res => res.json())
                .then(action((result) => {
                    const {errors, article} = result;
                    if (errors !== undefined) {
                        RealWorldApi.alertError(errors);
                    } else {
                        this.article = article;
                    }
                }))
        }
    }

    @action
    public deleteArticle(slug: string, history: any) {
        RealWorldApi.deleteArticle(slug)
            .then(res => res.json())
            .then(action((result) => {
                const {errors} = result;
                if (errors !== undefined) {
                    RealWorldApi.alertError(errors);
                } else {
                    this.article = undefined;
                    history.replace("/");
                }
            }))
    }

    @action
    public favoriteArticle(slug: string) {
        const tempArticle = this.articles.get(slug);
        this.favoriteLoadingSlug = slug;
        if (tempArticle !== undefined && Auth.isSigned()) {
            RealWorldApi.favoriteArticle(slug, tempArticle.favorited)
                .then(res => res.json())
                .then(action((result) => {
                    const {errors, article} = result;
                    if (errors !== undefined) {
                        RealWorldApi.alertError(errors);
                    } else {
                        this.articles.set(slug, article);
                    }
                })).finally(() => {
                    this.favoriteLoadingSlug = "";
                }
            )
        }
    }

    public getPageListSize(): number {
        return Math.ceil(this.articlesCount / this.FEED_SIZE);
    }

    private getRequestArticleUrl = (feedTabStore: FeedTabStore, page: number): string => {
        const {tab, tag, name} = feedTabStore;
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
    }
}