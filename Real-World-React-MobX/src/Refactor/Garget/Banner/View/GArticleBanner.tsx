import React from "react";
import {observer} from "mobx-react";
import "./GArticleBanner.less"
import {GArticleBannerVM} from "../ViewModel/GArticleBannerVM";
// @ts-ignore
import {WidgetMiniInfo, WidgetMiniInfoType} from "../../../Widget/MiniInfo/WidgetMiniInfo";
import {WidgetColorButton} from "../../../Widget/Button/WidgetColorButton";
import {Link} from "react-router-dom";

interface Props {
    vm: GArticleBannerVM,
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
                        {
                            this.props.vm.showEditButton ?
                                (<Link to={this.props.vm.linkToEdit || ''}><WidgetColorButton className={"article-edit-button"} color={"#CCCCCC"}>
                                    <i className="ion-edit"></i> Edit Article
                                </WidgetColorButton></Link>) :
                                ''
                        }
                        {
                            this.props.vm.showDeleteButton ?
                                (<WidgetColorButton className={"article-delete-button"} color={"#B85C5C"}>
                                    <i className="ion-trash-a"></i> Delete Article
                                </WidgetColorButton>) :
                                ''
                        }
                    </div>
                </div>
            </div>
        );
    }
}