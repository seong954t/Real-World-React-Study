import React from "react";
import {inject, observer} from "mobx-react";
import FeedPageButton from "./FeedPageButton";

@inject("articlesStore")
@observer
class FeedPageList extends React.PureComponent<any, any> {

    pageButtonList = (size: number) => [...Array(size)].map((_, i: number) => (
        <FeedPageButton key={i+1} page={i+1}/>
    ))

    render() {
        const size = this.props.size;

        console.log("Render [ FeedPageList ]")

        return (
            <nav aria-label="...">
                <ul className="pagination">
                    {size > 1 ? this.pageButtonList(size) : ''}
                </ul>
            </nav>
        );
    }
}

export default FeedPageList;