import React from "react";
import "./Feed.css"
import RealWorldApi from "../RealWordApi/RealWorldApi";
import ArticleDTO from "../DTO/ArticleDTO";
import {Link} from "react-router-dom";

class Feed extends React.Component<{ info: ArticleDTO }, { favorited: boolean, favoritesCount: number }> {

    constructor(props: { info: ArticleDTO }) {
        super(props);
        this.state = {
            favorited: this.props.info.favorited,
            favoritesCount: this.props.info.favoritesCount
        }
    }

    handleFavorite = (slug: string): void => {
        RealWorldApi.favoriteArticle(slug, this.state.favorited, this.setStateFavorite)
    }

    setStateFavorite = (article: ArticleDTO) => {
        this.setState({
            favorited: article.favorited,
            favoritesCount: article.favoritesCount
        })
    }

    render() {
        const {info} = this.props;
        const tagList = info.tagList.map((info: string, index: number) => (
            <li key={index} className="tag-default preview-tag mr-1">
                {info}
            </li>
        ));

        return (
            <div className="feed-preview pb-4 pt-4">
                <div className="feed mb-4">
                    <Link to={`/@${info.author.username}`}>
                        <img src={info.author.image} alt="" className="author-image"/>
                    </Link>
                    <div className="info">
                        <Link to={`/@${info.author.username}`}>{info.author.username}</Link>
                        <p className="date m-0">{new Date(info.createdAt).toDateString()}</p>
                    </div>
                    <button type="button"
                            onClick={(e: any) => this.handleFavorite(info.slug)}
                            className={`btn btn-sm btn-outline-success float-right ${this.state.favorited ? 'active' : ''}`}>
                        <i className="ion-heart"></i>
                        {this.state.favoritesCount}
                    </button>
                </div>
                <Link className="preview-link" to={`/article/${info.slug}`}>
                    <h1>{info.title}</h1>
                    <p className="preview-desc">{info.description}</p>
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