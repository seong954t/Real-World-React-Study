import React from "react";
import HomeBanner from "./HomeBanner";
import FeedContainer from "../Feed/FeedContainer";
import Tags from "../Tags/Tags";
import {inject, observer} from "mobx-react"
import Auth from "../Auth/Auth";
import Configuration from "../Configuration/Configuration";
import {RouteComponentProps} from "react-router";
import TagsStore from "../Store/TagsStore";
import FeedTabStore from "../Store/FeedTabStore";
import ArticlesStore from "../Store/ArticlesStore";
import queryString from "query-string";


interface Props extends RouteComponentProps {
    tagsStore: TagsStore
}

@inject("tagsStore")
@observer
class Home extends React.Component<Props, any> {

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
                <HomeBanner title={Configuration.TITLE} description={Configuration.DESCRIPTION} hide={Auth.isSigned()}/>
                <div className="container row m-auto">
                    <FeedContainer articlesStore={ArticlesStore.INSTANCE}
                                   feedTabStore={FeedTabStore.INSTANCE}
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

export default Home;