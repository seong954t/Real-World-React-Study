import React from "react";
import UserInfoBanner from "./UserInfoBanner";
import FeedContainer from "../Feed/FeedContainer";

class UserInfoContainer extends React.Component<any, {}>{
    render() {
        const { name, tab, tag } = this.props.match.params;
        return (
            <div>
                <UserInfoBanner username={name}/>
                <div className="container row m-auto">
                    <FeedContainer key={name} name={name} tab={tab} tag={tag}/>
                </div>
            </div>
        );
    }
}

export default UserInfoContainer;