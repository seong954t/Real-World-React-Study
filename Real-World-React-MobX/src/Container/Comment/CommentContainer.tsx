import React from "react";
import CommentsStore from "../../Store/CommentsStore";
import UserStore from "../../Store/UserStore";
import ArticlesStore from "../../Store/ArticlesStore";
import ArticleVo from "../../Vo/ArticleVo";
import Auth from "../../Auth/Auth";
import {observer} from "mobx-react";
import CommentEditor from "../../Widget/Comment/CommentEditor";
import CommentCardList from "./CommentCardList";
import LINK from "../../PageRouter/Link";

interface Props {
    commentsStore: CommentsStore,
    userStore: UserStore,
    articlesStore: ArticlesStore,
    article: ArticleVo
}

@observer
export default class CommentContainer extends React.PureComponent<Props, any> {

    componentDidMount(): void {
        console.log("componentDidMount [ ArticleCommentAdapter ]");
        this.props.commentsStore.loadComments(this.props.article.slug);
    };

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<any>, snapshot?: any): void {
        console.log("componentDidUpdate [ ArticleCommentAdapter ]");
        if (this.props.article.slug !== prevProps.article.slug) {
            this.props.commentsStore.loadComments(this.props.article.slug);
        }
    };

    handleChange = (e: any) => {
        this.props.commentsStore.comment = e.target.value;
    };

    addComments = (e: any) => {
        e.preventDefault();
        this.props.commentsStore.addComment(this.props.article.slug);
    };

    deleteComment = (e: any) => {
        const {slug} = this.props.article;
        this.props.commentsStore.deleteComment(slug, e.id)
    };

    render() {
        console.log("Render [ ArticleCommentAdapter ]");

        return (
            <div className="col-9">
                <CommentEditor comment={this.props.commentsStore.comment}
                               image={this.props.userStore.user.image}
                               onChangeTextArea={this.handleChange}
                               onSubmit={this.addComments}
                               isDisableCommentBox={!Auth.isSigned()}
                               linkToSignIn={LINK.SIGN_IN}
                               linkToSignUp={LINK.SIGN_UP}
                />
                <CommentCardList username={this.props.userStore.user.username}
                                 loading={this.props.commentsStore.isCommentsLoading}
                                 comments={this.props.commentsStore.comments}
                                 onClickTrashBox={this.deleteComment}/>
            </div>
        );
    };
}