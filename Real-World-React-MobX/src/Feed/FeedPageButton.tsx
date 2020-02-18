import React from "react";
import {Link} from "react-router-dom";
import FeedPageButtonProps from "../Props/FeedPageButtonProps";

class FeedPageButton extends React.PureComponent<FeedPageButtonProps, any>{

    render() {
        const {page, isActive} = this.props;

        console.log("Render [ FeedPageButton ]");

        return (
            <li key={page} className={`page-item ${isActive ? 'active' : ''}`}>
                <Link className="page-link" aria-current="page" onClick={this.props.onClick} to=''>
                    {page}
                </Link>
            </li>
        );
    }
}

export default FeedPageButton;