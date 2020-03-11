import React from "react";
import {GFeedTabListVM} from "../ViewModel/GFeedTabListVM";
import {GFeedTabItem} from "./GFeedTabItem";

interface Props {
    vm: GFeedTabListVM;
}

export class GFeedTabList extends React.Component<Props> {

    feedTabItems = () => {
        return this.props.vm.feedTabItemList.map((feedTab) => {
            return <GFeedTabItem vm={feedTab} active={feedTab.active}/>
        })
    };

    render() {
        return (
            <div>
                {this.feedTabItems()}
            </div>
        );
    }
}