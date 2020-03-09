import React from "react";
import {GFeedListVM} from "../ViewModel/GFeedListVM";
import {GFeedItem} from "./GFeedItem";

interface Props {
    vm: GFeedListVM
}

export class GFeedList extends React.Component<Props>{

    feedItems = () => {
        return this.props.vm.feedItemList.map((feed) => {
            return <GFeedItem vm={feed}></GFeedItem>
        })
    }

    render() {
        return (
            <div className={"feed-list"}>
                {this.feedItems()}
            </div>
        );
    }
}