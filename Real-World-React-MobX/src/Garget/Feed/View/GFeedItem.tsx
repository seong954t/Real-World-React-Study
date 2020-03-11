import React from "react";
import {GFeedItemVM} from "../ViewModel/GFeedItemVM";
import {WidgetColorButton} from "../../../Widget/Button/WidgetColorButton";
import "./GFeedItem.less";
import {Link} from "react-router-dom";
import {WidgetTagList} from "../../../Widget/Tag/WidgetTagList";
import {observer} from "mobx-react";
// @ts-ignore
import {WidgetMiniInfo, WidgetMiniInfoType} from "../../../Widget/MiniInfo/WidgetMiniInfo";
import {LoadingSize, WidgetLoading} from "../../../Widget/Loading/WidgetLoading";

interface Props {
    vm: GFeedItemVM,
}

@observer
export class GFeedItem extends React.Component<Props> {

    render() {
        const {author, createdAt, description, favorited, favoritesCount, tagList, title} = this.props.vm.article;
        const {image, username} = author;
        console.log("this.props.vm.isFavoriteLoading : ", this.props.vm.isFavoriteLoading)
        return (
            <div className={"feed-item col-12"}>
                <div className={"feed-header"}>
                    <WidgetMiniInfo src={image}
                                    imageSize={"32px"}
                                    title={username}
                                    titleFontSize={"16px"}
                                    titleColor={"#5CB85C"}
                                    linkToTitle={this.props.vm.linkToUser}
                                    subtitle={createdAt}
                                    subtitleFontSize={"12px"}
                                    subtitleColor={"#BBBBBB"}
                                    type={WidgetMiniInfoType.DEFAULT}/>

                    <WidgetColorButton className={"favorite-button"}
                                       color={"#5CB85C"}
                                       active={favorited}
                                       onClick={this.props.vm.onClickFavorite}>
                        <span>
                            {
                                this.props.vm.isFavoriteLoading ?
                                    <WidgetLoading loadingSize={LoadingSize.SM}/> :
                                    <><i className="ion-heart"/>{favoritesCount}</>
                            }
                        </span>
                    </WidgetColorButton>
                </div>

                <Link className={"feed-content"} to={this.props.vm.linkToArticle}>
                    <p className={"feed-title"}>{title}</p>
                    <p className={"feed-description"}>{description}</p>
                    <span className={"feed-more"}>Read more...</span>
                </Link>

                <div className={"feed-footer"}>
                    <WidgetTagList className={"feed-tag-list"} tagList={tagList}
                                   tagBackgroundColor={"#ffffff"}
                                   tagColor={"#aaa"}
                                   tagBorder={"1px solid #ddd"}/>
                </div>
            </div>
        );
    }
}