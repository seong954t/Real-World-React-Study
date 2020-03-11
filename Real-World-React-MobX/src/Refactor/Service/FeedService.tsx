import ArticleVo from "../../Vo/ArticleVo";
import {action, computed, observable} from "mobx";
import Auth from "../../Auth/Auth";
import RealWorldApi from "../Request/RealWorldApi";

export class FeedService {

    readonly MAIN_FEED_SIZE: number = 10;
    readonly INDIVIDUAL_FEED_SIZE: number = 5;

    @observable FEED_SIZE: number = this.MAIN_FEED_SIZE;

    @observable _articles: Map<string, ArticleVo> = new Map<string, ArticleVo>();
    @observable articlesCount: number = 0;
    @observable page: number = 1;
    @observable isArticlesLoading: boolean = false;
    @observable isFavoriteLoadings: Map<string, boolean> = new Map<string, boolean>();

    @action
    loadArticles(tab: string, tag: string, name: string, page: number): void {
        const url = this.getRequestArticleUrl(tab, tag, name, page);
        if (!this.isArticlesLoading) {
            if (page === 1) {
                this.isArticlesLoading = true;
            }
            RealWorldApi.getArticles(url)
                .then(action((result) => {
                    const {errors, articles, articlesCount} = result;
                    if (errors !== undefined) {
                        throw Response.error();
                    } else {
                        this._articles.clear();
                        this.isFavoriteLoadings.clear();
                        articles.forEach((article: ArticleVo) => {
                            this._articles.set(article.slug, article);
                            this.isFavoriteLoadings.set(article.slug, false);
                        });
                        this.articlesCount = articlesCount;
                        this.page = page;
                    }
                })).finally(action(() => {
                    this.isArticlesLoading = false;
                })
            )
        }
    }

    @action
    favoriteArticle(slug: string) {
        const tempArticle = this._articles.get(slug);

        if (tempArticle !== undefined && Auth.isSigned() && !this.isFavoriteLoadings.get(slug)) {
            this.isFavoriteLoadings.set(slug, true);
            RealWorldApi.favoriteArticle(slug, tempArticle.favorited)
                .then(action((result) => {
                    const {errors, article} = result;
                    if (errors !== undefined) {
                        throw Response.error();
                    } else {
                        this._articles.set(slug, article);
                    }
                })).finally(action(() => {
                    this.isFavoriteLoadings.set(slug, false);
                })
            )
        }
    }

    getPageListSize(): number {
        return Math.ceil(this.articlesCount / this.FEED_SIZE);
    }

    @computed
    get articles(): ArticleVo[] {
        return Array.from(this._articles.values());
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

    static _instance: FeedService;

    static get instance(): FeedService {
        return this._instance;
    }
}

FeedService._instance = new FeedService();