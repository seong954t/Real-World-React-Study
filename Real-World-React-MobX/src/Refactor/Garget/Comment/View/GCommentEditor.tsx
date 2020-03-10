import React from "react";
import {GCommentEditorVM} from "../ViewModel/GCommentEditorVM";
// @ts-ignore
import {WidgetMiniInfo, WidgetMiniInfoType} from "../../../Widget/MiniInfo/WidgetMiniInfo";
import {WidgetColorButton} from "../../../Widget/Button/WidgetColorButton";
import "./GComment.less";

interface Props {
    vm: GCommentEditorVM
}

export class GCommentEditor extends React.Component<Props, any> {
    render() {
        return (
            <div className={"comment-wrapper"}>
                <textarea className={"comment-editor"} rows={3}></textarea>
                <div className={"comment-footer"}>
                    <WidgetMiniInfo src={this.props.vm.image}
                                    imageSize={"32px"}
                                    title={""}
                                    type={WidgetMiniInfoType.DEFAULT}/>
                    <WidgetColorButton className={"comment-post-button"} color={"#5CB85C"}>Post Comment</WidgetColorButton>
                </div>
            </div>
        );
    }
}