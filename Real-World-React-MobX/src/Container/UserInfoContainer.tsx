import React from "react";
import {RouteComponentProps} from "react-router";
import ArticlesStore from "../Store/ArticlesStore";
import FeedTabStore from "../Store/FeedTabStore";
import UserInfoBannerAdapter from "../Adapter/UserInfoBannerAdapter";
import ProfileStore from "../Store/ProfileStore";
import {inject, observer} from "mobx-react";
import UserStore from "../Store/UserStore";
import FeedContainer from "./FeedContainer";

interface Props extends RouteComponentProps<{ tab: string, tag: string, name: string }> {
    profileStore: ProfileStore,
    userStore: UserStore
}

@inject("profileStore", "userStore")
class UserInfoContainer extends React.Component<Props, any> {

    render() {
        const {params} = this.props.match;
        const {tab, tag, name} = params;

        console.log("Render [ UserInfoContainer ]");

        return (
            <div>
                <UserInfoBannerAdapter username={params.name}
                                       profileStore={this.props.profileStore}
                                       userStore={this.props.userStore}
                />
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