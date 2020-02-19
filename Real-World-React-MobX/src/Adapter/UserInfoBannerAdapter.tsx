import React from "react";
import ProfileStore from "../Store/ProfileStore";
import Auth from "../Auth/Auth";
import UserStore from "../Store/UserStore";
import {observer} from "mobx-react";
import UserInfoBanner from "../Widget/Banner/UserInfoBanner";

interface Props {
    profileStore: ProfileStore,
    userStore: UserStore,
    username: string
}

@observer
export default class UserInfoBannerAdapter extends React.Component<Props, any> {

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<any>, snapshot?: any): void {
        console.log("componentDidUpdate [ UserInfoBannerAdapter ]");
        if (this.props.username !== prevProps.username) {
            this.props.profileStore.loadProfile(this.props.username);
        }
    }

    componentDidMount(): void {
        console.log("componentDidMount [ UserInfoBannerAdapter ]");
        if (this.props.username !== this.props.profileStore.profile.username) {
            this.props.profileStore.loadProfile(this.props.username);
        }
    }

    handleFollow = (e: any) => {
        e.preventDefault();
        if (Auth.isSigned()) {
            this.props.profileStore.followUser(this.props.username);
        }
    };

    render() {
        const {username, image, bio, following} = this.props.profileStore.profile;

        console.log("Render [ UserInfoBannerAdapter ]");

        return (
            <UserInfoBanner username={username}
                            onClickFollow={this.handleFollow}
                            hide={this.props.profileStore.isProfileLoading}
                            bio={bio}
                            following={following}
                            image={image}
                            isOwner={Auth.isOwner(this.props.userStore.user.username, username)}
                            isFollowLoading={this.props.profileStore.isFollowLoading}
            />
        );
    }
}