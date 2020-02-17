import React from "react";
import FeedList from "./FeedList";
import FeedPageList from "./FeedPageList";
import {inject, observer} from "mobx-react";
import queryString from "query-string";

@inject("feedTabStore", "articlesStore")
@observer
class FeedContainer extends React.Component<any, any> {

    componentDidMount(): void {
        console.log("componentDidMount [ FeedContainer ]");
        const {search, params} = this.props;
        if(search){
            const {tab, tag, name} = queryString.parse(search);
            this.props.feedTabStore.initialize(tab, tag, name)
        }else if(params){
            const {tab, tag, name} = params;
            this.props.feedTabStore.initialize(tab, tag, name)
        } else{
            this.props.feedTabStore.initialize("", "", "")
        }
        this.loadArticles(1);
    }

    componentDidUpdate(): void {
        console.log("componentDidUpdate [ FeedContainer ]");
            const {search, params} = this.props;
            if(search){
                const {tab, tag, name} = queryString.parse(search);
                if(!this.props.feedTabStore.isEqualFeedTabData(tab, tag, name)){
                    this.props.feedTabStore.initialize(tab, tag, name);
                    this.props.articlesStore.page = 1;
                    this.loadArticles(this.props.articlesStore.page)
                }
            }else if(params){
                const {tab, tag, name} = params;
                if(!this.props.feedTabStore.isEqualFeedTabData(tab, tag, name)){
                    this.props.feedTabStore.initialize(tab, tag, name);
                    this.props.articlesStore.page = 1;
                    this.loadArticles(this.props.articlesStore.page)
                }
            } else{
                if(!this.props.feedTabStore.isEqualFeedTabData("", "", "")){
                    this.props.feedTabStore.initialize("", "", "");
                    this.props.articlesStore.page = 1;
                    this.loadArticles(this.props.articlesStore.page)
                }
            }
    }

    handlePaging = (target: any) => {
        const pageLinks: any = document.getElementsByClassName("page-link");
        const page = Array(...pageLinks).indexOf(target) + 1;
        this.loadArticles(page);
    };

    loadArticles = (page: number) => {
        const {tag, tab, name} = this.props.feedTabStore;
        this.props.articlesStore.loadArticles(tag, tab, name, page);
    };

    render() {
        const size = this.props.articlesStore.getPageListSize();
        const articles = this.props.articlesStore.getArticles;

        console.log("Render [ FeedContainer ]");

        return (
            <div className="container col-md-9">
                <FeedList articles={articles}/>
                <FeedPageList size={size} handler={this.handlePaging} page={this.props.articlesStore.page}/>
            </div>
        );
    }
}

export default FeedContainer;