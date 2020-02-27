import React from "react";
import "./UserInfoBanner.less";
import {Link} from "react-router-dom";
import Loading from "../Loading/Loading";
import UserInfoBannerProps from "../Props/UserInfoBannerProps";

class UserInfoBanner extends React.PureComponent<UserInfoBannerProps, any> {

    followButton = (username: string, following: boolean) => (
        <button
            className={`follow-button ${following ? "active" : ""}`}
            onClick={this.props.onClickFollow}>
            {this.props.isFollowLoading ? <Loading className={"sm-spinner-border mx-4"}/>  : (following ?
                <span>
                    <i className="ion-minus-round"/> UnFollow {username}
                </span> :
                <span>
                    <i className="ion-plus-round"/> Follow {username}
                </span>)}
        </button>
    );

    editProfileButton = () => (
        <Link className="follow-button" to={this.props.linkToSettings || ''}><i className="ion-gear-a"/> Edit
            Profile Settings</Link>
    );

    render() {
        const {username, bio, image, following, isOwner, hide} = this.props;

        console.log("Render [ UserInfoBanner ]");

        return (
            <div className="user-info-banner">
                <div className="container user-info-container">
                    {
                        hide ? '' :
                            <div className="col-12">
                                <img className="user-img"
                                     alt=""
                                     src={image}/>
                                <h4>{username}</h4>
                                <p className="pb-2">{bio}</p>
                                {
                                    isOwner ?
                                        this.editProfileButton() :
                                        this.followButton(username, following ? following : false)
                                }
                            </div>
                    }
                </div>
            </div>
        );
    }
}

export default UserInfoBanner;