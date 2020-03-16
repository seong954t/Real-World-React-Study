import React from "react";
import {GFeedListVM} from "../ViewModel/GFeedListVM";
import {GFeedItem} from "./GFeedItem";
import {observer} from "mobx-react";

interface Props {
    vm: GFeedListVM,
}

@observer
export class GFeedList extends React.Component<Props> {

    feedItems = this.props.vm.feedItemList.map((feed) => {
        return <GFeedItem key={feed.article.slug} vm={feed}/>
    });

    render() {
        return (
            <div className={"feed-list"}>
                {this.feedItems}
            </div>
        );
    }
}