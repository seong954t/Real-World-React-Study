import React from "react";
import "./banner.less";
import HomeBannerProps from "../Props/HomeBannerProps";

export default class HomeBanner extends React.PureComponent<HomeBannerProps, any> {

    homeBanner = (
        <div className="banner text-center">
            <div className="container p-4 mb-4">
                <h1>{this.props.title}</h1>
                <p>{this.props.description}</p>
            </div>
        </div>
    );

    render() {
        console.log("Render [ HomeBanner ]");
        return (
            this.props.hide ? null : this.homeBanner
        );
    }
}