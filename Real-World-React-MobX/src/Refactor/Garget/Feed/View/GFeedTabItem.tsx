import React from "react";
import {GFeedTabVM} from "../ViewModel/GFeedTabVM";
import {Link} from "react-router-dom";
import "./GFeedTab.less";

interface Props {
    vm: GFeedTabVM,
    active: boolean
}

export class GFeedTab extends React.Component<Props>{
    render() {
        const {title, linkToTitle} = this.props.vm;
        return (
            <span className={`feed-tab ${this.props.active ? "active" : ""}`}>
                <Link to={linkToTitle}>
                    {title}
                </Link>
            </span>
        );
    }
}