import React, {MouseEventHandler} from "react";
import {WidgetMiniInfo, WidgetMiniInfoType} from "./Widget/MiniInfo/WidgetMiniInfo";
import {WidgetTagItem} from "./Widget/Tag/WidgetTagItem";
import {WidgetColorButton} from "./Widget/Button/WidgetColorButton";
import {WidgetInput} from "./Widget/Form/WidgetInput";
import {WidgetTextarea} from "./Widget/Form/WidgetTextarea";
import {GHomeBanner} from "./Garget/Banner/View/GHomeBanner";
import {GProfileBanner} from "./Garget/Banner/View/GProfileBanner";
import {GProfileBannerVM} from "./Garget/Banner/ViewModel/GProfileBannerVM";
import ProfileVo from "./Vo/ProfileVo";
import {Profile} from "./Model/Profile";
import {WidgetPageButtonItem} from "./Widget/PageButton/WidgetPageButtonItem";
import {WidgetPageButtonList} from "./Widget/PageButton/WidgetPageButtonList";
import {GFeedItem} from "./Garget/Feed/View/GFeedItem";
import {GFeedItemVM} from "./Garget/Feed/ViewModel/GFeedItemVM";
import {Article} from "./Model/Article";
import ArticleVo from "./Vo/ArticleVo";
import {WidgetTagList} from "./Widget/Tag/WidgetTagList";
import {GFeedList} from "./Garget/Feed/View/GFeedList";
import {GFeedListVM} from "./Garget/Feed/ViewModel/GFeedListVM";
import {GFeedTabItem} from "./Garget/Feed/View/GFeedTabItem";
import {GFeedTabItemVM} from "./Garget/Feed/ViewModel/GFeedTabItemVM";

export class TestPage extends React.Component<any, any> {

    render() {
        return (
            <div>
                <WidgetMiniInfo title="yargoof"
                                titleColor={"#5CB85C"}
                                titleFontSize={"16px"}
                                subtitle={"Mon Feb 2017/11"}
                                subtitleColor={"#bbb"}
                                subtitleFontSize={"12px"}
                                imageSize={"32px"}
                                type={WidgetMiniInfoType.DEFAULT}
                                src={"https://avatars1.githubusercontent.com/u/19300604?s=400&u=a9419b174dafadd4ba7dda60638fc2ba5ee49b67&v=4"}
                />
                <WidgetMiniInfo title="yargoof"
                                titleColor={"#5CB85C"}
                                titleFontSize={"16px"}
                                subtitle={"Mon Feb 2017/11"}
                                subtitleColor={"#bbb"}
                                subtitleFontSize={"12px"}
                                imageSize={"32px"}
                                type={WidgetMiniInfoType.INLINE}
                                src={"https://avatars1.githubusercontent.com/u/19300604?s=400&u=a9419b174dafadd4ba7dda60638fc2ba5ee49b67&v=4"}
                />
                <WidgetMiniInfo title="yargoof"
                                titleColor={"#5CB85C"}
                                titleFontSize={"16px"}
                                imageSize={"32px"}
                                type={WidgetMiniInfoType.DEFAULT}
                                src={"https://avatars1.githubusercontent.com/u/19300604?s=400&u=a9419b174dafadd4ba7dda60638fc2ba5ee49b67&v=4"}
                />
                <div>widget-mini-info</div>
                <br></br>

                <div>
                    <WidgetTagItem style={{marginRight: "3px"}}>hehe</WidgetTagItem>
                    <WidgetTagItem style={{marginRight: "3px"}}>hehe</WidgetTagItem>
                    <WidgetTagItem style={{marginRight: "3px"}}>hehe</WidgetTagItem>
                    <WidgetTagItem style={{marginRight: "3px"}}>hehe</WidgetTagItem>
                    <WidgetTagItem style={{marginRight: "3px"}}>hehe</WidgetTagItem>
                </div>
                <div>widget-tag</div>
                <br></br>

                <div>
                    <WidgetTagList tagList={["tag1", "tag2", "tag3", "tag4"]}
                                   tagBackgroundColor={"#818A91"}
                                   tagColor={"#ffffff"}
                                   tagBorder={"1px solid #818A91"}
                    ></WidgetTagList>
                </div>
                <div>widget-tag-list</div>

                <div>
                    <WidgetColorButton color={"#5CB85C"}>Update Settings</WidgetColorButton>
                </div>
                <div>widget-color-button</div>
                <br></br>

                <div>
                    <WidgetInput placeholder={"placeholder"}></WidgetInput>
                    <br></br>
                    <WidgetTextarea placeholder={"placeholder"}></WidgetTextarea>
                </div>
                <div>widget-from</div>

                <GHomeBanner title={"conduit"} description={"A place to share your knowledge."}></GHomeBanner>
                <GProfileBanner vm={new ProfileBannerVM()} button={<button>hegh</button>}></GProfileBanner>

                <div>
                    <WidgetPageButtonItem color={"#5CB85C"}>10</WidgetPageButtonItem>
                    <WidgetPageButtonItem color={"#5CB85C"} active={true}>10</WidgetPageButtonItem>
                </div>
                <br></br>

                <div style={{width: "30%"}}>
                    <WidgetPageButtonList from={1} to={50} color={"#5CB85C"}></WidgetPageButtonList>
                </div>
                <br></br>

                <div>
                    <GFeedItem vm={new FeedItemVM()}></GFeedItem>
                </div>
                <br></br>

                <div>
                    <GFeedList vm={new FeedListVM()}></GFeedList>
                </div>
                <br></br>

                <div>
                    <GFeedTabItem vm={new FeedTabVM()} active={true}></GFeedTabItem>
                    <GFeedTabItem vm={new FeedTabVM()} active={false}></GFeedTabItem>
                </div>
            </div>
        );
    }
}

class ProfileBannerVM extends GProfileBannerVM {
    profile: ProfileVo;

    constructor() {
        super();
        this.profile = new Profile({
            username: "username",
            bio: "bio",
            image: "image",
            following: true
        });
    }
}

class FeedItemVM extends GFeedItemVM {
    linkToArticle: string;
    linkToUser: string;
    onClickFavorite: MouseEventHandler<HTMLButtonElement>;
    article: ArticleVo;

    constructor() {
        super();
        this.linkToArticle = "/linkToArticle";
        this.linkToUser = "/linkToUser";
        this.onClickFavorite = (e) => {
            console.log(e);
        }
        this.article = new Article({
            slug: "slug",
            author: {
                bio: "bio",
                image: "https://static.productionready.io/images/smiley-cyrus.jpg",
                username: "username",
                following: false
            },
            title: "title",
            tagList: ["tag1", "tag2", "tag3", "tag2", "tag3", "tag4", "tag2", "tag3", "tag4", "tagasdgasdgasdgasdgsdaagsdjhksdhjlksdflhkjsfdlhkjsdfhkjasdfsfhjdkdfhkjkjfdhkjsdflhkj2", "tag3", "tag4", "tag2", "tag3", "tag4", "tag2", "tag3", "tag4"],
            favoritesCount: 3,
            favorited: false,
            description: "description",
            createdAt: "Mon Mar 09 2020",
            body: "body",
            updatedAt: "Mon Mar 09 2020"
        });
    }
}

class FeedListVM extends GFeedListVM {
    feedItemList: Array<FeedItemVM>;

    constructor() {
        super();
        this.feedItemList = [new FeedItemVM(), new FeedItemVM(), new FeedItemVM(), new FeedItemVM(), new FeedItemVM()]
    }
}

class FeedTabVM extends GFeedTabItemVM {
    title: string;
    linkToTap: string;

    constructor() {
        super();
        this.title = "GlobalFeed";
        this.linkToTap = "linkToTap";
    }
}