import React from "react";
import {observer} from "mobx-react";
import "./GArticleBanner.less"
import {GArticleBannerVM} from "../ViewModel/GArticleBannerVM";
// @ts-ignore
import {WidgetMiniInfo, WidgetMiniInfoType} from "../../../Widget/MiniInfo/WidgetMiniInfo";

interface Props {
    vm: GArticleBannerVM,
    editButton?: any,
    deleteButton?: any
}

@observer
export class GArticleBanner extends React.Component<Props> {

    render() {
        const {title, author, createdAt} = this.props.vm.article;
        const {image, username} = author;
        return (
            <div className="article-banner">
                <div className="container">
                    <p className={"article-title"}>{title}</p>
                    <div className={"article-info-wrapper"}>
                        <WidgetMiniInfo className={"article-info"}
                                        src={image}
                                        imageSize={"32px"}
                                        title={username}
                                        titleFontSize={"16px"}
                                        subtitle={createdAt}
                                        subtitleFontSize={"12px"}
                                        subtitleColor={"#BBBBBB"}
                                        linkToTitle={this.props.vm.linkToUser}
                                        type={WidgetMiniInfoType.DEFAULT}/>
                        {this.props.editButton}
                        {this.props.deleteButton}
                    </div>
                </div>
            </div>
        );
    }
}