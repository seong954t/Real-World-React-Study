import React from "react";
import {GProfileBannerVM} from "../ViewModel/GProfileBannerVM";
import {observer} from "mobx-react";
import "./GProfileBanner.less"

interface Props {
    vm: GProfileBannerVM,
    button: any
}

@observer
export class GProfileBanner extends React.Component<Props>{

    render() {
        const {image, username, bio} = this.props.vm.profile;

        return (
            <div className="profile-banner">
                <div className="container">
                    <div className="col-12">
                        <img className="profile-image"
                             alt=""
                             src={image}/>
                        <h4 className="profile-username">{username}</h4>
                        <p className="profile-description">{bio}</p>
                        <div className="profile-button-container">{this.props.button}</div>
                    </div>
                </div>
            </div>
        );
    }
}