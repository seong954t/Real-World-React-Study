import React from "react";
import "./article.css"
import {Link} from "react-router-dom";
import "./article.css"
import {observer} from "mobx-react";
import ArticleCommentProps from "../Props/ArticleCommentProps";
import Loading from "../Loading/Loading";
import CommentDTO from "../DTO/CommentDTO";
import CommentCard from "./CommentCard";

class ArticleComment extends React.PureComponent<ArticleCommentProps, any> {

    commentBox = () => (
        <form onSubmit={this.props.onSubmit}>
            <div className="comment-write-box">
                <fieldset className="form-group m-0">
                    <textarea rows={3} placeholder="Write a comment..." className="form-control p-3"
                              value={this.props.comment} onChange={this.props.onChangeTextArea}/>
                </fieldset>
                <div className="card-footer">
                    <img src={this.props.image}
                         alt=""
                         className="comment-author-img"/>
                    <button className="btn btn-sm btn-success float-right" type="submit">Post Comment
                    </button>
                </div>
            </div>
        </form>
    );

    requestSignElement = () => (
        <div>
            <Link to={"/login"}>Sign in </Link>
            or
            <Link to={"/register"}> sign up </Link>
            to add comments on this article.
        </div>
    );

    commentElements = (comments: CommentDTO[]) => (
        comments.map((comment: CommentDTO, _) => (
                <CommentCard comment={comment}
                             isDisableTrashBox={comment.author.username !== this.props.username}
                             onClickTrashBox={this.props.onClickTrashBox}
                />
            )
        )
    )

    render() {
        console.log("Render [ ArticleComment ]");
        return (
            <div className="col-md-8 m-auto">
                <div className="mb-3">
                    {this.props.isDisableCommentBox ? this.requestSignElement() : this.commentBox()}
                </div>
                <div>
                    {this.props.loading ?
                        <div className={"text-center m-4"}>
                            <Loading className={"text-success"}/>
                        </div> :
                        this.commentElements(this.props.comments)}
                </div>
            </div>
        );
    }
}

export default ArticleComment;