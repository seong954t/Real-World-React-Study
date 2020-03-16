import React from "react";
import {Main} from "../../../Garget/Main/Main";
import {GArticleBanner} from "../../../Garget/Banner/View/GArticleBanner";
import {GArticleContent} from "../../../Garget/Article/View/GArticleContent";
import {GCommentEditor} from "../../../Garget/Comment/View/GCommentEditor";
import {GCommentList} from "../../../Garget/Comment/View/GCommentList";
import {ArticleBannerVM} from "../ViewModel/ArticleBannerVM";
import {CommentService} from "../../../Service/CommentService";
import {ArticleService} from "../../../Service/ArticleService";
import {ArticleContentVM} from "../ViewModel/ArticleContentVM";
import {CommentListVM} from "../ViewModel/CommentListVM";
import {UserService} from "../../../Service/UserService";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import "./ArticlePage.less";
import {WidgetLoading} from "../../../Widget/Loading/WidgetLoading";

interface Props extends RouteComponentProps<{ name: string }> {

}

interface State {
    comment: string
}

@observer
export class ArticlePage extends React.Component<Props, State> {

    readonly userService = UserService.instance;
    readonly commentService = CommentService.instance;
    readonly articleService = ArticleService.instance;
    readonly articleBannerVM = new ArticleBannerVM();
    readonly articleContentVM = new ArticleContentVM();
    state = {
        comment: ""
    };

    slug: string;
    commentListVM: CommentListVM;
    constructor(props: Props) {
        super(props);
        this.slug = this.props.match.params.name;
        this.commentListVM = new CommentListVM(this.slug);
        this.articleService.loadArticle(this.slug);
        this.commentService.loadComments(this.slug);
    };

    onChangeHandler = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value
        } as Pick<State, keyof State>);
    };

    onClickPostHandler = () => {
        this.commentService.addComment(this.slug, this.state.comment)
            .finally(() => {
                this.setState({
                    comment: ""
                });
            });
    };

    render() {
        // const commentItemList = this.commentService.comments;
        return (
            <Main>
                {
                    this.articleService.isLoading || !this.articleService.article.slug ?
                        '' :
                        <>
                            <GArticleBanner vm={this.articleBannerVM}/>
                            <div className={"container"}>
                                <GArticleContent vm={this.articleContentVM}/>
                                <div className={"container col-9"}>
                                    <GCommentEditor value={this.state.comment}
                                                    placeholder={"Write a comment..."}
                                                    onChange={this.onChangeHandler}
                                                    name={"comment"}
                                                    rows={3}
                                                    image={this.userService.user.image}
                                                    onClickPost={this.onClickPostHandler}/>
                                    {
                                        this.commentService.isCommentsLoading ?
                                            <WidgetLoading className={"green my"}/> :
                                            <div className={"comment-item-list-wrapper"}>
                                                <GCommentList vm={this.commentListVM}/>
                                            </div>
                                    }
                                </div>
                            </div>
                        </>
                }
            </Main>
        );
    }
}