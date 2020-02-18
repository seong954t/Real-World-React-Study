import React from "react";
import UserInfoBanner from "./UserInfoBanner";
import FeedContainer from "../Feed/FeedContainer";
import {RouteComponentProps} from "react-router";
import ArticlesStore from "../Store/ArticlesStore";
import FeedTabStore from "../Store/FeedTabStore";

class UserInfoContainer extends React.Component<RouteComponentProps<{tab: string, tag: string, name: string}>, any> {

    render() {
        const {params} = this.props.match;
        const {tab, tag, name} = params;

        console.log("Render [ UserInfoContainer ]");

        return (
            <div>
                <UserInfoBanner username={params.name}/>
                <div className="container row m-auto">
                    <FeedContainer articlesStore={ArticlesStore.INSTANCE}
                                   feedTabStore={FeedTabStore.INSTANCE}
                                   tab={tab}
                                   tag={tag}
                                   name={name}
                    />
                </div>
            </div>
        );
    }
}

export default UserInfoContainer;