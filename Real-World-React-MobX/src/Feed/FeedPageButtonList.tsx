import React from "react";
import FeedPageButton from "./FeedPageButton";
import FeedPageListProps from "../Props/FeedPageListProps";

class FeedPageButtonList extends React.PureComponent<FeedPageListProps, any> {

    pageButtonList = () => [...Array(this.props.size)].map((_, i: number) => (
        <FeedPageButton key={i+1} page={i+1} isActive={(i+1) === this.props.page} onClick={this.props.onClick}/>
    ));

    render() {

        console.log("Render [ FeedPageButtonList ]");

        return (
            <nav aria-label="...">
                <ul className="pagination">
                    {this.props.isDisable ? '' : (this.props.size > 1 ? this.pageButtonList() : '')}
                </ul>
            </nav>
        );
    }
}

export default FeedPageButtonList;