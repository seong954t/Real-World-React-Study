import React from "react";
import Auth from "../Auth/Auth";
import CommentDTO from "../DTO/CommentDTO";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import Loading from "../Loading/Loading";

@inject("articlesStore", "commentsStore", "userStore")
@observer
class CommentCard extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        console.log("constructor [ CommentCard ]");
        this.props.commentsStore.loadComments(this.props.articlesStore.article.slug);
    }

    deleteComment = (id: number) => {
        const {slug} = this.props.articlesStore.article;
        this.props.commentsStore.deleteComment(slug, id)
    };

    commentElements = (comments: CommentDTO[]) => (
        comments.map((info: CommentDTO, _) => (
            <div key={info.id} className="card mb-3">
                <div className="p-3">
                    <p className="card-text">{info.body}</p>
                </div>
                <div className="card-footer">
                    <Link to={`/@${info.author.username}`}>
                        <img src={info.author.image}
                             alt=""
                             className="author-image comment-another-img"
                             role="presentation"/>
                    </Link>
                    &nbsp;
                    <span>
                        <Link className="comment-author" to={`/@${info.author.username}`}>
                            {info.author.username}
                        </Link>
                        <span className="comment-date">
                            {new Date(info.createdAt).toDateString()}
                        </span>
                    </span>
                    {Auth.isOwner(this.props.userStore.user.username, info.author.username) ? this.trashBox(info.id) : ''}
                </div>
            </div>
        ))
    );

    trashBox = (id: number) => (
        <span className="float-right icon-trash-wrapper">
            <i className="ion-trash-a"
               onClick={() => this.deleteComment(id)}/>
        </span>
    );

    render() {
        const comments = this.props.commentsStore.getComments;

        console.log("Render [ CommentCard ]");

        return (
            <div>
                {this.props.commentsStore.isCommentsLoading ?
                    <div className={"text-center m-4"}>
                        <Loading className={"text-success"}/>
                    </div> :
                    this.commentElements(comments)}
            </div>
        );
    }
}

export default CommentCard;