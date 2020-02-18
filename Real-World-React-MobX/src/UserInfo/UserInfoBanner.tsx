import React from "react";
import "./UserInfo.css";
import {Link} from "react-router-dom";
import Loading from "../Loading/Loading";
import UserInfoBannerProps from "../Props/UserInfoBannerProps";

class UserInfoBanner extends React.PureComponent<UserInfoBannerProps, any> {

    followButton = (username: string, following: boolean) => (
        <button
            className={`btn btn-sm btn-outline-secondary float-right ${following ? "active" : ""}`}
            onClick={this.props.onClickFollow}>
            {this.props.isFollowLoading ? <Loading className={"sm-spinner-border text-white mx-4"}/>  : (following ?
                <span>
                    <i className="ion-minus-round"/> UnFollow {username}
                </span> :
                <span>
                    <i className="ion-plus-round"/> Follow {username}
                </span>)}
        </button>
    );

    editProfileButton = () => (
        <Link className="btn btn-sm btn-outline-secondary float-right" to="/settings"><i className="ion-gear-a"/> Edit
            Profile Settings</Link>
    );

    render() {
        const {username, bio, image, following, isOwner, isDisable} = this.props;

        console.log("Render [ UserInfoBanner ]");

        return (
            <div className="user-info-banner text-center">
                <div className="container">
                    {
                        isDisable ? '' :
                            <div className="col-md-10 m-auto d-inline-block">
                                <img className="user-img"
                                     alt=""
                                     src={image}/>
                                <h4>{username}</h4>
                                <p className="pb-2">{bio}</p>
                                {/*{Auth.isOwner(this.props.userStore, username) ? this.editProfileButton() : this.followButton(username, following)}*/}
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