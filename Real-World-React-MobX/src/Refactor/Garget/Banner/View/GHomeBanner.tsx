import React from "react";
import "./GHomeBanner.less";

interface Props {
    title: string,
    description: string
}

export class GHomeBanner extends React.Component<Props> {

    render() {
        return (
            <div className="home-banner">
                <div className="home-banner-text">
                    <h1>{this.props.title}</h1>
                    <p>{this.props.description}</p>
                </div>
            </div>
        );
    }
}