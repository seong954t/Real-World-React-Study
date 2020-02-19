import React from "react";
import {observer} from "mobx-react";
import FeedTabStore from "../Store/FeedTabStore";
import ArticlesStore from "../Store/ArticlesStore";
import FeedListAdapter from "../Adapter/FeedListAdapter";
import FeedPageButtonList from "../Widget/Feed/FeedPageButtonList";

interface Props {
    feedTabStore: FeedTabStore,
    articlesStore: ArticlesStore,
    tab: string,
    tag: string,
    name: string
}

@observer
class FeedContainer extends React.Component<Props, any> {

    componentDidMount(): void {
        console.log("componentDidMount [ FeedContainer ]");
        const {tab, tag, name} = this.props;
        this.props.feedTabStore.initialize(tab, tag, name)
        this.loadArticles(1);
    }

    componentDidUpdate(): void {
        console.log("componentDidUpdate [ FeedContainer ]");
        const {tab, tag, name} = this.props;
        if (!this.props.feedTabStore.isEqualFeedTabData(tab, tag, name)) {
            this.props.feedTabStore.initialize(tab, tag, name)
            this.loadArticles(1);
        }

    }

    handlePaging = (e: any): void => {
        e.preventDefault();
        this.loadArticles(e.page);
    };

    loadArticles(page: number): void {
        const {tab, tag, name} = this.props.feedTabStore;
        this.props.articlesStore.loadArticles(tab, tag, name, page);
    };

    render() {
        const size = this.props.articlesStore.getPageListSize();
        const articles = this.props.articlesStore.articles;

        console.log("Render [ FeedContainer ]");

        return (
            <div className="container col-md-9">
                <FeedListAdapter articlesStore={this.props.articlesStore}
                                 feedTabStore={this.props.feedTabStore}
                                 articles={articles}
                />
                <FeedPageButtonList size={size}
                                    onClickPage={this.handlePaging}
                                    page={this.props.articlesStore.page}
                                    isDisable={this.props.articlesStore.isArticlesLoading}
                />
            </div>
        );
    }
}

export default FeedContainer;