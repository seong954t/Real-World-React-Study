import React from "react";
import "./Feed.css"
import {Link} from "react-router-dom";
import FeedPageButtonProps from "../Props/FeedPageButtonProps";

export default class FeedPageButton extends React.PureComponent<FeedPageButtonProps, any>{

    handlePageButton = (e: any) => {
        e.page = this.props.page;
        this.props.onClickPage(e);
    }

    render() {
        const {page, isActive} = this.props;

        console.log("Render [ FeedPageButton ]");

        return (
            <li key={page} className={`page-item ${isActive ? 'active' : ''}`}>
                <Link className="page-link" aria-current="page" onClick={this.handlePageButton} to=''>
                    {page}
                </Link>
            </li>
        );
    }
}