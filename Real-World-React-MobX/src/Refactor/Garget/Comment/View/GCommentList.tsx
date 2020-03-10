import React from "react";
import {GCommentListVM} from "../ViewModel/GCommentListVM";
import {GCommentItem} from "./GCommentItem";
import "./GCommentList.less";

interface Props {
    vm: GCommentListVM
}

export class GCommentList extends React.Component<Props> {

    commentItems = () => {
        return this.props.vm.commentItemList.map((commentItem) => {
            return <div className={"comment-item-wrapper"}><GCommentItem vm={commentItem}/></div>
        })
    }

    render() {
        return (
            <div className={"comment-list"}>
                {this.commentItems()}
            </div>
        );
    }
}