import React from "react";
import {HTMLAttributes} from "react";
import "./widget-mini-info.less";

interface Props extends HTMLAttributes<HTMLSpanElement> {
    src: string,
    title: string,
    "titleColor"?: string,
    "titleFontSize"?: string
    "date": string,
    "dateColor"?: string,
    "dateFontSize"?: string
    "imageSize"?: string,
}

export class WidgetMiniInfo extends React.Component<Props, any> {

    render() {
        const {className, src, title, titleColor, date, dateColor, imageSize, titleFontSize, dateFontSize, ...htmlAttrs} = this.props;

        return (
            <div {...htmlAttrs} className={`mini-profile`}>
                <img className="mini-profile-image"
                     src={src}
                     width={imageSize}
                     height={imageSize}
                />
                <div className="mini-profile-info" style={{height: imageSize}}>
                    <div className="mini-profile-title hidden"
                         style={{fontSize: titleFontSize}}>
                        {title}
                    </div>
                    <div className="mini-profile-date hidden"
                         style={{fontSize: dateFontSize}}>
                        {date}
                    </div>
                    <div className="vertical-center-box">
                        <div className="mini-profile-title"
                             style={{color: titleColor ? titleColor : this.props.color, fontSize: titleFontSize}}>
                            {title}
                        </div>
                        <div className="mini-profile-date"
                             style={{color: dateColor ? dateColor : this.props.color, fontSize: dateFontSize}}>
                            {date}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}