import React from "react";
import "./Loading.css"

export default class Loading extends React.Component<any, any> {
    render() {
        return (
            <div className={`spinner-border ${this.props.className}`} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    }
}