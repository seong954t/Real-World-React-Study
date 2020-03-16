import React, {MouseEventHandler, TextareaHTMLAttributes} from "react";
import {WidgetMiniInfo, WidgetMiniInfoType} from "../../../Widget/MiniInfo/WidgetMiniInfo";
import {WidgetColorButton} from "../../../Widget/Button/WidgetColorButton";
import "./GComment.less";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    image: string,
    onClickPost: MouseEventHandler<HTMLButtonElement>,
}

export class GCommentEditor extends React.Component<Props> {
    render() {
        const {image, onClickPost, className, ...Attributes} = this.props;

        return (
            <div className={`comment-wrapper ${className}`}>
                <textarea {...Attributes} className={"comment-editor"}></textarea>
                <div className={"comment-footer"}>
                    <WidgetMiniInfo src={image}
                                    imageSize={"32px"}
                                    title={""}
                                    type={WidgetMiniInfoType.DEFAULT}/>
                    <WidgetColorButton className={"comment-post-button"}
                                       color={"#5CB85C"}
                                       onClick={onClickPost}>
                        Post Comment
                    </WidgetColorButton>
                </div>
            </div>
        );
    }
}