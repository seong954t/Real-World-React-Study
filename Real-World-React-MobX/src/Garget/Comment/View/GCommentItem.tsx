import React from "react";
import {WidgetMiniInfo, WidgetMiniInfoType} from "../../../Widget/MiniInfo/WidgetMiniInfo";
import "./GComment.less";
import {GCommentItemVM} from "../ViewModel/GCommentItemVM";

interface Props {
    vm: GCommentItemVM
}

export class GCommentItem extends React.Component<Props> {
    render() {
        return (
            <div className={"comment-wrapper"}>
                <div className={"comment-body"}>
                    {this.props.vm.comment.body}
                </div>
                <div className={"comment-footer"}>
                    <WidgetMiniInfo src={this.props.vm.comment.author.image}
                                    imageSize={"26px"}
                                    title={this.props.vm.comment.author.username}
                                    titleFontSize={"12px"}
                                    titleColor={"#5CB85C"}
                                    subtitle={this.props.vm.comment.createdAt}
                                    subtitleFontSize={"12px"}
                                    subtitleColor={"#BBBBBB"}
                                    linktotitle={this.props.vm.linkToUser}
                                    type={WidgetMiniInfoType.INLINE}/>
                    {
                        this.props.vm.showTrashBox ?
                            <span className={"button-wrapper"} onClick={this.props.vm.onClickTrashBox}>
                                <i className="ion-trash-a"/>
                            </span> :
                            ''
                    }

                </div>
            </div>
        );
    }
}