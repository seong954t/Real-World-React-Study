import React from "react";
import "./Feed.css"
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import Loading from "../Loading/Loading";

@inject("articlesStore")
@observer
class Feed extends React.PureComponent<any, any> {

    handleFavorite = (e: any): void => {
        e.preventDefault();
        const {article} = this.props;
        this.props.articlesStore.favoriteArticle(article.slug);
    };

    render() {
        const {article} = this.props;
        const tagList = article.tagList.map((tag: string, index: number) => (
            <li key={index} className="tag-default preview-tag mr-1">
                {tag}
            </li>
        ));

        console.log("Render [ Feed ]");

        return (
            <div className="feed-preview pb-4 pt-4">
                <div className="feed mb-4">
                    <Link to={`/@${article.author.username}`}>
                        <img src={article.author.image} alt="" className="author-image"/>
                    </Link>
                    <div className="info">
                        <Link to={`/@${article.author.username}`}>{article.author.username}</Link>
                        <p className="date m-0">{new Date(article.createdAt).toDateString()}</p>
                    </div>
                    <button type="button"
                            onClick={this.handleFavorite}
                            className={`btn btn-sm btn-outline-success float-right ${article.favorited ? 'active' : ''}`}>
                        {this.props.articlesStore.favoriteLoadingSlug !== article.slug ?
                            <span><i className="ion-heart"/>{article.favoritesCount}</span> :
                        <Loading className="sm-spinner-border text-white"/>}
                    </button>
                </div>
                <Link className="preview-link" to={`/article/${article.slug}`}>
                    <h1>{article.title}</h1>
                    <p className="preview-desc">{article.description}</p>
                    <span>Read more...</span>
                </Link>
                <div className="text-right">
                    <ul className="tag-list col-md-6 mb-0">
                        {tagList}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Feed;