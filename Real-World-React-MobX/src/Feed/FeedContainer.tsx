import React from "react";
import FeedList from "./FeedList";
import FeedPageList from "./FeedPageList";
import {observer} from "mobx-react";
import FeedTabStore from "../Store/FeedTabStore";
import ArticlesStore from "../Store/ArticlesStore";
import FeedListAdapter from "../Adapter/FeedListAdapter";

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

    handlePaging(target: any): void {
        const pageLinks: any = document.getElementsByClassName("page-link");
        const page = Array(...pageLinks).indexOf(target) + 1;
        this.loadArticles(page);
    };

    loadArticles(page: number): void {
        const {tab, tag, name} = this.props.feedTabStore;
        this.props.articlesStore.loadArticles(tag, tab, name, page);
    };

    render() {
        const size = this.props.articlesStore.getPageListSize();
        const articles = this.props.articlesStore.getArticles;

        console.log("Render [ FeedContainer ]");

        return (
            <div className="container col-md-9">
                <FeedListAdapter articlesStore={this.props.articlesStore}
                                 feedTabStore={this.props.feedTabStore}
                                 articles={articles}/>
                <FeedPageList size={size} handler={this.handlePaging} page={this.props.articlesStore.page}/>
            </div>
        );
    }
}

export default FeedContainer;