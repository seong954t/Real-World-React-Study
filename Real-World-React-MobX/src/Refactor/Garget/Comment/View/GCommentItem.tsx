import React from "react";
// @ts-ignore
import {WidgetMiniInfo, WidgetMiniInfoType} from "../../../Widget/MiniInfo/WidgetMiniInfo";
import {WidgetColorButton} from "../../../Widget/Button/WidgetColorButton";
import "./GComment.less";
import {GCommentItemVM} from "../ViewModel/GCommentItemVM";

interface Props {
    vm: GCommentItemVM,
}

export class GCommentItem extends React.Component<Props, any> {
    render() {
        return (
            <div className={"comment-wrapper"}>
                <div className={"comment-item"}>
                    {this.props.vm.comment.body}
                </div>
                <div className={"comment-footer"}>
                    <WidgetMiniInfo src={this.props.vm.comment.author.image}
                                    imageSize={"26px"}
                                    title={this.props.vm.comment.author.username}
                                    titleFontSize={"12px"}
                                    titleColor={"black"}
                                    subtitle={this.props.vm.comment.createdAt}
                                    subtitleFontSize={"12px"}
                                    subtitleColor={"#BBBBBB"}
                                    type={WidgetMiniInfoType.INLINE}/>
                </div>
            </div>
        );
    }
}