import React from "react";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";

@inject("articlesStore", "feedTabStore")
@observer
class FeedPageButton extends React.PureComponent<any, any>{

    handlePaging = (e: any) => {
        e.preventDefault();
        this.props.articlesStore.loadArticles(this.props.feedTabStore, this.props.page);
    };

    render() {
        const page = this.props.page;
        const activePage = this.props.articlesStore.page;

        console.log("Render [ FeedPageButton ]");

        return (
            <li key={page} className={`page-item ${page === activePage ? 'active' : ''}`}>
                <Link className="page-link" aria-current="page" onClick={this.handlePaging} to='' >
                    {page}
                </Link>
            </li>
        );
    }
}

export default FeedPageButton;