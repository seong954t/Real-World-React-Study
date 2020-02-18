import React from "react";
import "./HomeBanner.css";
import HomeBannerProps from "../Props/HomeBannerProps";

class HomeBanner extends React.PureComponent<HomeBannerProps, any>{

    homeBanner = (
        <div className="banner text-center">
            <div className="container p-4 mb-4">
                <h1 className="banner-logo">{this.props.title}</h1>
                <p className="banner-p">{this.props.description}</p>
            </div>
        </div>
    );

    render() {
        console.log("Render [ HomeBanner ]");
        return (
            <div>
                {this.props.isDisable ? '' : this.homeBanner}
            </div>
        );
    }
}

export default HomeBanner;