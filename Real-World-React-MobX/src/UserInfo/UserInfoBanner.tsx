import React from "react";
import "./UserInfo.css";
import Auth from "../Auth/Auth";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";

@inject("profileStore", "userStore")
@observer
class UserInfoBanner extends React.PureComponent<any, any> {

    componentDidMount(): void {
        console.log("componentDidMount [ UserInfoBanner ]");
        if(this.props.username !== this.props.profileStore.profile.username){
            this.props.profileStore.loadProfile(this.props.username);
        }
    }

    handleFollow = () => {
        if(Auth.isSigned()){
            this.props.profileStore.followUser(this.props.username);
        }
    };

    followButton = (username: string, following: boolean) => (
        <button
            className={`btn btn-sm btn-outline-secondary float-right ${following ? "active" : ""}`}
            onClick={this.handleFollow}>
            {following ?
                <span>
                    <i className="ion-minus-round"/> UnFollow {username}
                </span> :
                <span>
                    <i className="ion-plus-round"/> Follow {username}
                </span>}
        </button>
    );

    editProfileButton = () => (
        <Link className="btn btn-sm btn-outline-secondary float-right" to="/settings"><i className="ion-gear-a"/> Edit
            Profile Settings</Link>
    );

    render() {
        const {username, bio, image, following} = this.props.profileStore.profile;

        console.log("Render [ UserInfoBanner ]");

        return (
            <div className="user-info-banner text-center">
                <div className="container">
                    {this.props.profileStore.isProfileLoading ? '' :
                        <div className="col-md-10 m-auto d-inline-block">
                            <img className="user-img"
                                 alt=""
                                 src={image}/>
                            <h4>{username}</h4>
                            <p className="pb-2">{bio}</p>
                            {Auth.isOwner(this.props.userStore, username) ? this.editProfileButton() : this.followButton(username, following)}
                        </div>}
                </div>
            </div>
        );
    }
}

export default UserInfoBanner;