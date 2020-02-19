import React from "react";
import {observer} from "mobx-react";
import ArticlesStore from "../Store/ArticlesStore";
import FeedTabStore from "../Store/FeedTabStore";
import FeedList from "../Feed/FeedList";
import ArticleDTO from "../DTO/ArticleDTO";
import Auth from "../Auth/Auth";

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
            <FeedList articles={this.props.articles}
                      tab={tab}
                      tag={tag}
                      name={name}
                      loading={this.props.articlesStore.isArticlesLoading}
                      isDefault={!Auth.isSigned()}
                      onClickFavorite={this.handleFavorite}
                      favoriteLoadings={this.props.articlesStore.favoriteLoadings}
            />
        );
    }
}