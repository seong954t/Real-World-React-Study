import React from "react";
import "./UserInfo.css";
import Auth from "../Auth/Auth";
import ProfileDTO from "../DTO/ProfileDTO";
import RealWorldApi from "../RealWordApi/RealWorldApi";
import {Link} from "react-router-dom";

class UserInfoBanner extends React.Component<{ username: string }, { profile: ProfileDTO }> {

    constructor(props: { username: string }) {
        super(props);
        this.state = {
            profile: {
                username: '',
                bio: '',
                image: '',
                following: false
            }
        }
        this.setProfile();
    }

    setProfile = () => {
        RealWorldApi.getProfile(this.props.username, this.setStateProfile)
    }

    setStateProfile = (profile: ProfileDTO) => {
        this.setState({
            profile: profile
        })
    }

    handleFollow = () => {
        const {username, following} = this.state.profile;
        RealWorldApi.followUser(username, following, this.setStateFollowing);
    }

    setStateFollowing = () => {
        const {following} = this.state.profile;

        this.setState({
            profile: {
                ...this.state.profile,
                following: !following
            }
        })
    }

    followButton = (username: string, following: boolean) => (
        <button
            className={`btn btn-sm btn-outline-secondary float-right ${following ? "active" : ""}`}
            onClick={this.handleFollow}>
            {following ?
                <span>
                    <i className="ion-minus-round"></i> UnFollow {username}
                </span> :
                <span>
                    <i className="ion-plus-round"></i> Follow {username}
                </span>}
        </button>
    )

    editProfileButton = () => (
        <Link className="btn btn-sm btn-outline-secondary float-right" to="/settings"><i className="ion-gear-a"></i> Edit
            Profile Settings</Link>
    )

    render() {
        const {username, bio, image, following} = this.state.profile;

        return (
            <div className="user-info-banner text-center">
                <div className="container">
                    <div className="col-md-10 m-auto d-inline-block">
                        <img className="user-img"
                             src={image}/>
                        <h4>{username}</h4>
                        <p className="pb-2">{bio}</p>
                        {Auth.isOwner(username) ? this.editProfileButton() : this.followButton(username, following)}
                    </div>
                </div>
            </div>
        );
    }
}

export default UserInfoBanner;