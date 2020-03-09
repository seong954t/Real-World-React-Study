import React from "react";
import {GFeedTabListVM} from "../ViewModel/GFeedTabListVM";
import {GFeedTabItem} from "./GFeedTabItem";

interface Props {
    vm: GFeedTabListVM;
    tab: string;
}

export class GFeedTabList extends React.Component<Props> {

    feedTabItems = () => {
        return this.props.vm.FeedTabItemList.map((feedTab) => {
            return <GFeedTabItem vm={feedTab} active={this.props.tab === feedTab.title}/>
        })
    }

    render() {
        return (
            <div>
                {this.feedTabItems()}
            </div>
        );
    }
}