import React from "react";
import {RouteComponentProps} from "react-router";
import {FeedService} from "../../../Service/FeedService";
import {Main} from "../../../Garget/Main/Main";
import {GProfileBanner} from "../../../Garget/Banner/View/GProfileBanner";
import {GFeedTabList} from "../../../Garget/Feed/View/GFeedTabList";
import {GFeedList} from "../../../Garget/Feed/View/GFeedList";
import {FeedListVM} from "../../Home/ViewModel/FeedListVM";
import {WidgetPageButtonList} from "../../../Widget/PageButton/WidgetPageButtonList";
import {FeedTabType} from "../../../Garget/Feed/View/FeedTabType";
import {ProfileFeedTabListVM} from "../ViewModel/ProfileFeedTabListVM";
import {observer} from "mobx-react";
import {ProfileBannerVM} from "../ViewModel/ProfileBannerVM";
import {ProfileService} from "../../../Service/ProfileService";
import {WidgetColorButton} from "../../../Widget/Button/WidgetColorButton";
import {LoadingSize, WidgetLoading} from "../../../Widget/Loading/WidgetLoading";
import {UserService} from "../../../Service/UserService";
import {Link} from "react-router-dom";
import LINK from "../../../../PageRouter/Link";

interface Props extends RouteComponentProps<{ name: string, tab: string }> {

}

@observer
export class ProfilePage extends React.Component<Props> {
    readonly feedService = FeedService.instance;
    readonly profileService = ProfileService.instance;
    readonly userService = UserService.instance;

    constructor(props: Props) {
        super(props);
        const {name, tab} = this.props.match.params;
        this.feedService.loadArticles(tab, '', name, 1);
        if (name !== this.profileService.profile.username) {
            this.profileService.loadProfile(name);
        }
    }

    pageButtonClickHandler = (e: any) => {
        const {name, tab} = this.props.match.params;
        this.feedService.loadArticles(tab, '', name, e.uid);
    };

    onClickFollowHandler = (e: any) => {
        this.profileService.followUser(this.profileService.profile.username);
    };

    profileBannerButton = (followLoading: boolean) => {
        const profile = this.profileService.profile;

        if (this.userService.user.username === profile.username) {
            return (
                <Link className="follow-button" to={LINK.REFACTOR.SETTINGS}>
                    <WidgetColorButton color={"#687077"}>
                        <i className="ion-gear-a"></i> Edit Profile Settings
                    </WidgetColorButton>
                </Link>
            )
        } else if (followLoading) {
            return (
                <WidgetColorButton color={"#687077"} active={true}>
                    <WidgetLoading loadingSize={LoadingSize.SM}/>
                </WidgetColorButton>
            )
        } else {
            if (profile.following) {
                return (
                    <WidgetColorButton color={"#687077"}
                                       active={true}
                                       onClick={this.onClickFollowHandler}>
                        <span><i className="ion-minus-round"></i> UnFollow {this.profileService.profile.username}</span>
                    </WidgetColorButton>
                )
            } else {
                return (
                    <WidgetColorButton color={"#687077"}
                                       onClick={this.onClickFollowHandler}>
                        <span><i className="ion-plus-round"></i> Follow {this.profileService.profile.username}</span>
                    </WidgetColorButton>
                )
            }
        }
    };

    render() {
        const {name, tab} = this.props.match.params;

        const feedList = [FeedTabType.MYARTICLES, FeedTabType.FAVORITEDARITCLES];
        const articles = this.feedService.articles;
        const profile = this.profileService.profile;

        console.log("this.feedService.isArticlesLoading : ", this.feedService.isArticlesLoading)
        return (
            <Main>
                {
                    this.profileService.isProfileLoading ?
                        '' :
                        <GProfileBanner vm={new ProfileBannerVM(profile)}
                                        button={this.profileBannerButton(this.profileService.isFollowLoading)}></GProfileBanner>
                }
                <div className={"profile-feed-container col-6"}>
                    <GFeedTabList vm={new ProfileFeedTabListVM(feedList, name, tab)}/>
                    {
                        this.feedService.isArticlesLoading ?
                            <WidgetLoading className={"green my"}/> :
                            <>
                                <GFeedList vm={new FeedListVM(articles)}></GFeedList>
                                <WidgetPageButtonList from={1}
                                                      to={this.feedService.getPageListSize()}
                                                      color={"#5CB85C"}
                                                      onButtonItemClick={this.pageButtonClickHandler}
                                />
                            </>
                    }

                </div>
            </Main>
        );
    }
}