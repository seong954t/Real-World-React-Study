import React, {HTMLAttributes} from "react";
import {GCommentListVM} from "../ViewModel/GCommentListVM";
import {GCommentItem} from "./GCommentItem";
import "./GCommentList.less";
import {observer} from "mobx-react";

interface Props extends HTMLAttributes<HTMLDivElement>{
    vm: GCommentListVM
}

@observer
export class GCommentList extends React.Component<Props> {

    commentItems = () => {
        return this.props.vm.commentItemList.map((commentItem) => {
            return <div className={"comment-item-wrapper"}><GCommentItem vm={commentItem}/></div>
        })
    };

    render() {
        const {className, ...Attributes} = this.props;
        return (
            <div {...Attributes} className={`comment-list ${className}`}>
                {this.commentItems()}
            </div>
        );
    }
}