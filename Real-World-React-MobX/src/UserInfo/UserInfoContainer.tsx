import React from "react";
import UserInfoBanner from "./UserInfoBanner";
import FeedContainer from "../Feed/FeedContainer";

class UserInfoContainer extends React.Component<any, any> {

    render() {
        const {params} = this.props.match;

        console.log("Render [ UserInfoContainer ]");

        return (
            <div>
                <UserInfoBanner username={params.name}/>
                <div className="container row m-auto">
                    <FeedContainer params={params}/>
                </div>
            </div>
        );
    }
}

export default UserInfoContainer;