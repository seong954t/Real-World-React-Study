import React from "react";
import {RouteComponentProps} from "react-router";
import ArticlesStore from "../Store/ArticlesStore";
import FeedTabStore from "../Store/FeedTabStore";
import ProfileStore from "../Store/ProfileStore";
import {inject, observer} from "mobx-react";
import UserStore from "../Store/UserStore";
import FeedContainer from "./FeedContainer";
import Auth from "../Auth/Auth";
import UserInfoBanner from "../Widget/Banner/UserInfoBanner";

interface Props extends RouteComponentProps<{ tab: string, tag: string, name: string }> {
    profileStore: ProfileStore,
    userStore: UserStore,
    articlesStore: ArticlesStore,
    feedTabStore: FeedTabStore
}

@inject("profileStore", "userStore")
@observer
class UserInfoContainer extends React.Component<Props, any> {

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<any>, snapshot?: any): void {
        const name = this.getUsername();

        console.log("componentDidUpdate [ UserInfoContainer ]");
        if (name !== prevProps.match.params.name) {
            this.props.profileStore.loadProfile(name);
        }
    }

    componentDidMount(): void {
        const name = this.getUsername();

        console.log("componentDidMount [ UserInfoContainer ]");
        if (name !== this.props.profileStore.profile.username) {
            this.props.profileStore.loadProfile(name);
        }
    }

    handleFollow = (e: any) => {
        e.preventDefault();
        if (Auth.isSigned()) {
            this.props.profileStore.followUser(this.getUsername());
        }
    };

    getUsername = (): string => {
        return this.props.match.params.name;
    }

    render() {
        const {params} = this.props.match;
        const {tab, tag, name} = params;
        const {bio, following, image} = this.props.profileStore.profile;

        console.log("Render [ UserInfoContainer ]");

        return (
            <div>
                <UserInfoBanner username={name}
                                onClickFollow={this.handleFollow}
                                hide={this.props.profileStore.isProfileLoading}
                                bio={bio}
                                following={following}
                                image={image}
                                isOwner={Auth.isOwner(this.props.userStore.user.username, name)}
                                isFollowLoading={this.props.profileStore.isFollowLoading}
                                linkToSettings={"/settings"}
                />
                <div className="container row m-auto">
                    <FeedContainer articlesStore={this.props.articlesStore}
                                   feedTabStore={this.props.feedTabStore}
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