import React from "react";
import {inject, observer} from "mobx-react";

@inject("articlesStore", "feedTabStore")
@observer
class FeedPageButton extends React.PureComponent<any, any>{

    handlePaging = (e: any) => {
        e.preventDefault();
        this.props.articlesStore.loadArticles(this.props.feedTabStore, this.props.page);
    }

    render() {
        const page = this.props.page;
        const activePage = this.props.articlesStore.page

        console.log("Render [ FeedPageButton ]")

        return (
            <li key={page} className={`page-item ${page === activePage ? 'active' : ''}`}>
                <a className="page-link" aria-current="page" onClick={this.handlePaging}>
                    {page}
                </a>
            </li>
        );
    }
}

export default FeedPageButton;