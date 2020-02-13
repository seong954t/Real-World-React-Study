import React from "react";
import Feed from "./Feed";
import Auth from "../Auth/Auth";
import ArticleDTO from "../DTO/ArticleDTO";
import FeedTabDTO from "../DTO/FeedTabDTO";
import {Link} from "react-router-dom";

class FeedList extends React.Component<{articles: ArticleDTO[], feedTab: FeedTabDTO}, {}> {

    noArticleNotion = (
        <div className="no-article-notion p-4">No articles are here... yet.</div>
    )

    feedList = (articles: ArticleDTO[]) => (
        articles.map((info: ArticleDTO, index: number) => (
            <Feed key={info.slug} info={info}/>
        ))
    )

    singedFeed = (tab: string) => (
        <li className={`nav-item d-inline-block ${(tab === 'feed') ? 'active' : ''}`}>
            <Link className="list-group-item" to="/?tab=feed">Your Feed</Link>
        </li>
    );

    tagFeed = (tag: string) => (
        <li className="nav-item d-inline-block active">
            <Link className="list-group-item" to="/#"><i className="ion-pound"></i>{tag}</Link>
        </li>
    )

    mainFeed = (tab: string, tag: string) => (
        <ul className="nav list-unstyled list-group list-group-flush feed-nav">
            {Auth.isSigned() ? this.singedFeed(tab) : ''}
            <li className={`nav-item d-inline-block ${(tab === undefined) || (tab === '') || (tab === 'all') ? 'active' : ''}`}>
                <Link className="list-group-item" to="/#">GlobalFeed</Link>
            </li>
            {(tab === 'tag') && tag !== undefined ? this.tagFeed(tag) : ''}
        </ul>
    )

    individualFeed = (tab: string, name: string) => (
        <ul className="nav list-unstyled list-group list-group-flush feed-nav">
            <li className={`nav-item d-inline-block ${(tab === undefined) || (tab === 'all') ? 'active' : ''}`}>
                <Link className="list-group-item" to={`/@${name}`}>MyArticles</Link>
            </li>
            <li className={`nav-item d-inline-block ${(tab === 'favorites') ? 'active' : ''}`}>
                <Link className="list-group-item" to={`/@${name}/favorites`}>Favorited Articles</Link>
            </li>
        </ul>
    )

    render() {
        const {tab, tag, name} = this.props.feedTab;
        const {articles} = this.props;

        return (
            <div className="container col-md-12">
                <div>
                    {(name === undefined) ? this.mainFeed(tab, tag) : this.individualFeed(tab, name)}
                </div>
                {(articles === undefined) || (articles.length === 0) ? this.noArticleNotion : this.feedList(articles)}
            </div>
        );
    }
}

export default FeedList;