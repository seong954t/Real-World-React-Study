import React from "react";
import {observer} from "mobx-react";
import ArticlesStore from "../Store/ArticlesStore";
import FeedTabStore from "../Store/FeedTabStore";
import ArticleDTO from "../DTO/ArticleDTO";
import Auth from "../Auth/Auth";
import FeedTab from "../Widget/Feed/FeedTab";
import Loading from "../Widget/Loading/Loading";
import FeedList from "../Container/FeedList";

interface Props {
    articlesStore: ArticlesStore,
    feedTabStore: FeedTabStore,
    articles: ArticleDTO[]
}

@observer
export default class FeedListAdapter extends React.PureComponent<Props, any> {

    handleFavorite = (e: any): void => {
        e.preventDefault();
        this.props.articlesStore.favoriteArticle(e.slug);
    };

    render() {
        const {tab, tag, name} = this.props.feedTabStore;

        console.log("Render [ FeedListAdapter ]");

        return (
            <div className="container col-md-12">
                <FeedTab tab={tab}
                         tag={tag}
                         name={name}
                         isDefault={!Auth.isSigned()}
                />
                {
                    this.props.articlesStore.isArticlesLoading ?
                        <div className="text-center m-4">
                            <Loading className="text-success"/>
                        </div> :
                        <FeedList articles={this.props.articles}
                                  onClickFavorite={this.handleFavorite}
                                  favoriteLoadings={this.props.articlesStore.favoriteLoadings}
                        />
                }
            </div>
        );
    };
}