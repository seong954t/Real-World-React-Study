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
import TagsStore from "../../../../Store/TagsStore";
import ArticlesStore from "../../../../Store/ArticlesStore";
import FeedTabStore from "../../../../Store/FeedTabStore";
import queryString from "query-string";
import Auth from "../../../../Auth/Auth";
import {GTagBox} from "../../../Garget/TagBox/View/GTagBox";
import {TagService} from "../../../Service/TagService";

interface Props extends RouteComponentProps {
    tagsStore: TagsStore,
    articlesStore: ArticlesStore,
    feedTabStore: FeedTabStore
}

@observer
export class HomePage extends React.Component<Props> {
    readonly userService = UserService.instance;
    readonly feedService = FeedService.instance;
    readonly tagService = TagService.instance;

    constructor(props: any) {
        super(props);
        console.log("Aaaaaaaaaaaaaaaaaaaaaaaaa")
        const {tab, tag, name} = queryString.parse(this.props.location.search);
        this.feedService.loadArticles(tab, tag, name, 1);
        this.tagService.loadTags();
    }

    getFeedTabList = (signed: boolean):Array<string> => {
        const {tag} = queryString.parse(this.props.location.search);

        const feedList = new Array<string>();

        if(signed){
            feedList.push("Your Feed");
        }
        feedList.push("GlobalFeed");
        if(tag){
            feedList.push(`#${tag}`);
        }
        return feedList;
    };

    render() {
        console.log("HomePage");
        const {image, username} = this.userService.user;
        const feedList = this.getFeedTabList(Auth.isSigned());

        return (
            <Main image={image} username={username}>
                <GFeedTabList vm={new FeedTabListVM(feedList, this.props.location.search)}/>
                <GFeedList vm={new FeedListVM(this.feedService.articles)}></GFeedList>
                <WidgetPageButtonList from={1}
                                      to={this.feedService.getPageListSize()}
                                      color={"#5CB85C"}
                />
                <GTagBox tagList={this.tagService.tagList}/>
            </Main>
        );
    }
}