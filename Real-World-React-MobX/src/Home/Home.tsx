import React from "react";
import HomeBanner from "./HomeBanner";
import FeedContainer from "../Feed/FeedContainer";
import Tags from "../Tags/Tags";
import {inject, observer} from "mobx-react"

@inject("tagsStore")
@observer
class Home extends React.Component<any, any> {

    componentDidMount(): void {
        console.log("componentDidMount [ Home ]");
        this.props.tagsStore.loadTags();
    }


    render() {
        const {tags} = this.props.tagsStore;

        console.log("Render [ Home ]");

        return (
            <div>
                <HomeBanner/>
                <div className="container row m-auto">
                    <FeedContainer search={this.props.location.search}/>
                    <Tags tags={tags}/>
                </div>
            </div>
        );
    }
}

export default Home;