import React from "react";
import HomeBanner from "./HomeBanner";
import FeedContainer from "../Feed/FeedContainer";
import Tags from "../Tags/Tags";
import {inject, observer} from "mobx-react"
import Auth from "../Auth/Auth";
import Configuration from "../Configuration/Configuration";
import {RouteComponentProps} from "react-router";
import TagsStore from "../Store/TagsStore";


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

        console.log("Render [ Home ]");

        return (
            <div>
                <HomeBanner title={Configuration.TITLE} description={Configuration.DESCRIPTION} isDisable={Auth.isSigned()}/>
                <div className="container row m-auto">
                    <FeedContainer search={this.props.location.search}/>
                    <Tags tags={tags}/>
                </div>
            </div>
        );
    }
}

export default Home;