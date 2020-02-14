import React from "react";
import Feed from "./Feed";
import Auth from "../Auth/Auth";
import ArticleDTO from "../DTO/ArticleDTO";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react"
import Loading from "../Loading/Loading";

@inject("feedTabStore", "articlesStore")
@observer
class FeedList extends React.PureComponent<any, any> {

    noArticleNotion = (
        <div className="no-article-notion p-4">No articles are here... yet.</div>
    );

    getFeedList = (articles: ArticleDTO[]) => (
        articles.map((article: ArticleDTO, _) => (
            <Feed key={article.slug} article={article}/>
        ))
    );

    singedFeed = (tab: string) => (
        <li className={`nav-item d-inline-block ${(tab === 'feed') ? 'active' : ''}`}>
            <Link className="list-group-item" to="/?tab=feed">Your Feed</Link>
        </li>
    );

    tagFeed = (tag: string) => (
        <li className="nav-item d-inline-block active">
            <Link className="list-group-item" to="/#"><i className="ion-pound"/>{tag}</Link>
        </li>
    );

    mainFeed = (tab: string, tag: string) => (
        <ul className="nav list-unstyled list-group list-group-flush feed-nav">
            {Auth.isSigned() ? this.singedFeed(tab) : ''}
            <li className={`nav-item d-inline-block ${(tab === undefined) || (tab === '') || (tab === 'all') ? 'active' : ''}`}>
                <Link className="list-group-item" to="/#">GlobalFeed</Link>
            </li>
            {(tab === 'tag') && tag !== undefined ? this.tagFeed(tag) : ''}
        </ul>
    );

    individualFeed = (tab: string, name: string) => (
        <ul className="nav list-unstyled list-group list-group-flush feed-nav">
            <li className={`nav-item d-inline-block ${(tab === undefined) || (tab === 'all') ? 'active' : ''}`}>
                <Link className="list-group-item" to={`/@${name}`}>MyArticles</Link>
            </li>
            <li className={`nav-item d-inline-block ${(tab === 'favorites') ? 'active' : ''}`}>
                <Link className="list-group-item" to={`/@${name}/favorites`}>Favorited Articles</Link>
            </li>
        </ul>
    );


    render() {
        const {articles} = this.props;
        const {tab, tag, name} = this.props.feedTabStore;
        const feedList = (articles === undefined) || (articles.length === 0) ? this.noArticleNotion : this.getFeedList(articles);

        console.log("Render [ FeedList ]");

        return (
            <div className="container col-md-12">
                <div>
                    {!name ? this.mainFeed(tab, tag) : this.individualFeed(tab, name)}
                </div>
                {this.props.articlesStore.isArticlesLoading ?
                    <div className="text-center m-4">
                        <Loading className="text-success"/>
                    </div> :
                    feedList}
            </div>
        );
    }
}

export default FeedList;