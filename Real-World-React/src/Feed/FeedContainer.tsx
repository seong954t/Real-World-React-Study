import React from "react";
import FeedList from "./FeedList";
import FeedPageList from "./FeedPageList";
import ArticleDTO from "../DTO/ArticleDTO";
import FeedContainerDTO from "../DTO/FeedContainerDTO";
import RealWorldApi from "../RealWordApi/RealWorldApi";
import FeedTabDTO from "../DTO/FeedTabDTO";

class FeedContainer extends React.PureComponent<FeedTabDTO, FeedContainerDTO> {

    feedSize = 10;

    constructor(props: FeedTabDTO, state: FeedContainerDTO) {
        super(props, state);
        this.state = {
            articles: [],
            articlesCount: 0,
            page: 1,
            tag: "",
            tab: "",
        }
        if (this.props.name !== undefined) {
            this.feedSize = 5;
        }
    }

    setFeeds = (page: number) => {
        const {tab, tag} = this.state;
        if (this.props.tab !== tab || tag !== tag) {
            page = 1;
        }
        const url = this.getRequestArticleUrl(page, tag);
        RealWorldApi.getArticles(url, page, this.setStateFeed)
    }

    setStateFeed = (articles: ArticleDTO[], articlesCount: number, page: number) => {
        this.setState({
            articles: articles,
            articlesCount: articlesCount,
            page: page,
            tab: this.props.tab,
            tag: this.props.tag
        })
    }

    getRequestArticleUrl = (page: number, tag: string): string => {
        const {name, tab} = this.props;

        let url = `https://conduit.productionready.io/api/articles${tab === 'feed' ? '/feed' : ''}?limit=${this.feedSize}&offset=${(page - 1) * this.feedSize}`;

        if (this.props.tag !== undefined) {
            url += `&tag=${tag}`;
        }

        if (tab === 'favorites') {
            url += `&favorited=${name}`
        } else if (name !== undefined) {
            url += `&author=${name}`;
        }

        return url;
    }

    handlePaging = (target: any) => {
        const pageLinks: any = document.getElementsByClassName("page-link");
        const page = Array(...pageLinks).indexOf(target) + 1;
        this.setFeeds(page);
    }

    shouldComponentUpdate(nextProps: Readonly<FeedTabDTO>, nextState: Readonly<FeedContainerDTO>, nextContext: any): boolean {
        return (JSON.stringify(this.state) !== JSON.stringify(nextState)) || (JSON.stringify(this.props) !== (JSON.stringify(nextProps)))
    }

    render() {
        const size = Math.ceil(this.state.articlesCount / this.feedSize);
        this.setFeeds(this.state.page);

        return (
            <div className="container col-md-9">
                <FeedList articles={this.state.articles} feedTab={this.props}>
                </FeedList>
                <FeedPageList size={size} handler={this.handlePaging} page={this.state.page}/>
            </div>
        );
    }
}

export default FeedContainer;