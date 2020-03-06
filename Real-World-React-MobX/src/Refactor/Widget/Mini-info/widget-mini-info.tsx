import React from "react";
import {HTMLAttributes} from "react";
import "./widget-mini-info.less";

export enum WidgetMiniInfoType {
    DEFAULT = "DEFAULT",
    INLINE = "INLINE"
}

interface Props extends HTMLAttributes<HTMLSpanElement> {
    src: string,
    title: string,
    "titleColor"?: string,
    "titleFontSize"?: string
    "subtitle"?: string,
    "subtitleColor"?: string,
    "subtitleFontSize"?: string,
    "imageSize"?: string,
    "type": WidgetMiniInfoType
}

export class WidgetMiniInfo extends React.Component<Props, any> {

    render() {
        const {src, title, titleColor, subtitle, subtitleColor, imageSize, titleFontSize, subtitleFontSize, type, className, ...htmlAttrs} = this.props;

        const typeElement = (type === WidgetMiniInfoType.DEFAULT ?
                <>
                    <div className="mini-profile-title hidden"
                         style={{fontSize: titleFontSize}}>
                        {title}
                    </div>
                    <div className="mini-profile-subtitle hidden"
                         style={{fontSize: subtitleFontSize}}>
                        {subtitle}
                    </div>
                    <div className="vertical-center-box">
                        <div className="mini-profile-title"
                             style={{color: titleColor ? titleColor : this.props.color, fontSize: titleFontSize}}>
                            {title}
                        </div>
                        <div className="mini-profile-subtitle"
                             style={{
                                 color: subtitleColor ? subtitleColor : this.props.color,
                                 fontSize: subtitleFontSize
                             }}>
                            {subtitle}
                        </div>
                    </div>
                </> :
                <>
                    <span className="mini-profile-title hidden"
                         style={{fontSize: titleFontSize}}>
                        {title}
                    </span>
                    <span className="mini-profile-subtitle hidden"
                         style={{fontSize: subtitleFontSize}}>
                        {subtitle}
                    </span>
                    <div className="vertical-center-box">
                        <span className="mini-profile-title"
                             style={{color: titleColor ? titleColor : this.props.color, fontSize: titleFontSize}}>
                            {title}
                        </span>
                        <span className="mini-profile-subtitle"
                             style={{
                                 color: subtitleColor ? subtitleColor : this.props.color,
                                 fontSize: subtitleFontSize
                             }}>
                            {subtitle}
                        </span>
                    </div>
                </>
        )


        return (
            <div {...htmlAttrs} className={`widget-mini-profile ${className}`}>
                <img className="mini-profile-image"
                     src={src}
                     width={imageSize}
                     height={imageSize}
                />
                <div className="mini-profile-info" style={{height: imageSize}}>
                    {typeElement}
                </div>
            </div>
        );
    }

}