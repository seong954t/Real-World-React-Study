import React from "react";
import "./HomeBanner.less";
import HomeBannerProps from "../Props/HomeBannerProps";

export default class HomeBanner extends React.PureComponent<HomeBannerProps, any> {

    homeBanner = (
        <div className="home-banner">
            <div className="container">
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