import React from "react";
import {inject, observer} from "mobx-react"
import Auth from "../../../Auth/Auth";
import Config from "../../../Configuration/Config";
import {RouteComponentProps} from "react-router";
import TagsStore from "../../../Store/TagsStore";
import FeedTabStore from "../../../Store/FeedTabStore";
import ArticlesStore from "../../../Store/ArticlesStore";
import HomeBanner from "../../../Widget/Banner/HomeBanner";
import FeedContainer from "../../Feed/FeedContainer";
import Tags from "../../../Widget/Tags/Tags";
import queryString from "query-string";

interface Props extends RouteComponentProps {
    tagsStore: TagsStore,
    articlesStore: ArticlesStore,
    feedTabStore: FeedTabStore
}

@inject("tagsStore", "articlesStore", "feedTabStore")
@observer
export default class HomeContainer extends React.Component<Props, any> {

    componentDidMount(): void {
        console.log("componentDidMount [ Home ]");
        this.props.tagsStore.loadTags();
    }


    render() {
        const {tags} = this.props.tagsStore;
        const {tab, tag, name} = queryString.parse(this.props.location.search);

        console.log("Render [ Home ]");

        return (
            <div>
                <HomeBanner title={Config.TITLE} description={Config.DESCRIPTION} hide={Auth.isSigned()}/>
                <div className="container row m-auto">
                    <FeedContainer articlesStore={this.props.articlesStore}
                                   feedTabStore={this.props.feedTabStore}
                                   tab={tab ? tab.toString() : ''}
                                   tag={tag ? tag.toString() : ''}
                                   name={name ? name.toString() : ''}
                    />
                    <Tags tags={tags}/>
                </div>
            </div>
        );
    }
}