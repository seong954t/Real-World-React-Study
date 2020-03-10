import React from "react";
import {Main} from "../../../Garget/Main/Main";
import {observer} from "mobx-react";
import {UserService} from "../../../Service/UserService";
import {GFeedList} from "../../../Garget/Feed/View/GFeedList";
import {GFeedTabList} from "../../../Garget/Feed/View/GFeedTabList";
import {WidgetPageButtonList} from "../../../Widget/PageButton/WidgetPageButtonList";
import {FeedService} from "../../../Service/FeedService";
import {FeedListVM} from "../ViewModel/FeedListVM";
import {FeedTabListVM} from "../ViewModel/FeedTabListVM";
import {RouteComponentProps} from "react-router";
// @ts-ignore
import queryString from "query-string";
import Auth from "../../../../Auth/Auth";
import {GTagLinkBox} from "../../../Garget/TagBox/View/GTagLinkBox";
import {TagService} from "../../../Service/TagService";
import "./HomePage.less";
import {FeedTabType} from "../../../Garget/Feed/View/FeedTabType";

interface Props extends RouteComponentProps {

}

@observer
export class HomePage extends React.Component<Props> {
    readonly userService = UserService.instance;
    readonly feedService = FeedService.instance;
    readonly tagService = TagService.instance;

    constructor(props: any) {
        super(props);
        const {tab, tag, name} = queryString.parse(this.props.location.search);
        this.feedService.loadArticles(tab, tag, name, 1);
        this.tagService.loadTags();
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any): void {
        if (this.props.location.search !== prevProps.location.search) {
            const {tab, tag, name} = queryString.parse(this.props.location.search);
            this.feedService.loadArticles(tab, tag, name, 1);
        }
    };

    pageButtonClickHandler = (e: any) => {
        const {tab, tag, name} = queryString.parse(this.props.location.search);
        this.feedService.loadArticles(tab, tag, name, e.uid);
    };

    getFeedTabList = (signed: boolean): Array<string> => {
        const {tag} = queryString.parse(this.props.location.search);

        const feedList = new Array<string>();

        if (signed) {
            feedList.push(FeedTabType.YOURFEED);
        }
        feedList.push(FeedTabType.GLOBALFEED);
        if (tag) {
            feedList.push(`#${tag}`);
        }
        return feedList;
    };

    render() {
        console.log("HomePage");
        const {image, username} = this.userService.user;
        const feedList = this.getFeedTabList(Auth.isSigned());
        const tagList = this.tagService.tagList;
        const articles = this.feedService.articles;

        return (
            <Main image={image} username={username}>
                <div className={"container"}>
                    <div className={"feed-container col-9"}>
                        <GFeedTabList vm={new FeedTabListVM(feedList, this.props.location.search)}/>
                        <GFeedList vm={new FeedListVM(articles)}></GFeedList>
                        <WidgetPageButtonList from={1}
                                              to={this.feedService.getPageListSize()}
                                              color={"#5CB85C"}
                                              onButtonItemClick={this.pageButtonClickHandler}
                        />
                    </div>
                    <div className={"tag-container col-3"}>
                        <GTagLinkBox tagList={tagList}/>
                    </div>
                </div>
            </Main>
        );
    }
}