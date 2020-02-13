import React from "react";
import "./HomeBanner.css";
import Auth from "../Auth/Auth";

class HomeBanner extends React.PureComponent<any, any>{

    homeBanner = (
        <div className="banner text-center">
            <div className="container p-4 mb-4">
                <h1 className="banner-logo">conduit</h1>
                <p className="banner-p">A place to share your knowledge.</p>
            </div>
        </div>
    );

    render() {
        console.log("Render [ HomeBanner ]");
        return (
            <div>
                {Auth.isSigned() ? '' : this.homeBanner}
            </div>
        );
    }
}

export default HomeBanner;