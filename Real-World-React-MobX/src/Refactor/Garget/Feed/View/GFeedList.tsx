import React from "react";
import {GFeedListVM} from "../ViewModel/GFeedListVM";
import {GFeedItem} from "./GFeedItem";
import {WidgetLoading} from "../../../Widget/Loading/WidgetLoading";

interface Props {
    vm: GFeedListVM,
}

export class GFeedList extends React.Component<Props> {

    feedItems = () => {
        return this.props.vm.feedItemList.map((feed) => {
            return <GFeedItem key={feed.article.slug} vm={feed}/>
        })
    };

    render() {
        return (
            <div className={"feed-list"}>
                {this.feedItems()}
            </div>
        );
    }
}