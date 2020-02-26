import React from "react";
import FeedPageButton from "./FeedPageButton";
import "./PageButton.less"
import FeedPageListProps from "../Props/FeedPageListProps";

export default class FeedPageButtonList extends React.PureComponent<FeedPageListProps, any> {

    pageButtonList = () => [...Array(this.props.size)].map((_, i: number) => (
        <FeedPageButton key={i+1}
                        page={i+1}
                        isActive={(i+1) === this.props.page}
                        onClickPage={this.props.onClickPage}
        />
    ));

    render() {

        console.log("Render [ FeedPageButtonList ]");

        return (
            <nav>
                <ul className="pagination">
                    {this.props.isDisable ? '' : (this.props.size > 1 ? this.pageButtonList() : '')}
                </ul>
            </nav>
        );
    }
}