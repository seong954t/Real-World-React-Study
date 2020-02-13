import React from "react";
import FeedPageListDTO from "../DTO/FeedPageListDTO";

class FeedPageList extends React.Component<FeedPageListDTO, {}> {

    handlePaging = (e: any) => {
        e.preventDefault();
        this.props.handler(e.target);
    }

    render() {
        const pageLinkList = [...Array(this.props.size)].map((_, i: number) => (
            <li key={i} className={`page-item ${this.props.page == (i + 1) ? 'active' : ''}`}>
                <a className="page-link" aria-current="page" onClick={this.handlePaging}>
                    {i + 1}
                </a>
            </li>
        ))

        return (
            <nav aria-label="...">
                <ul className="pagination">
                    {this.props.size > 1 ? pageLinkList : ''}
                </ul>
            </nav>
        );
    }
}

export default FeedPageList;