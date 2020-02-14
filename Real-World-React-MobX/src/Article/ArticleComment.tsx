import React from "react";
import "./article.css"
import CommentCard from "./CommentCard";
import Auth from "../Auth/Auth";
import {Link} from "react-router-dom";
import "./article.css"
import {inject, observer} from "mobx-react";

@inject("commentsStore", "userStore")
@observer
class ArticleComment extends React.PureComponent<any, any> {

    commentBox = () => (
        <form onSubmit={this.addComments}>
            <div className="comment-write-box">
                <fieldset className="form-group m-0">
                    <textarea rows={3} placeholder="Write a comment..." className="form-control p-3"
                              value={this.props.commentsStore.comment} onChange={this.handleChange}/>
                </fieldset>
                <div className="card-footer">
                    <img src={this.props.userStore.user.image}
                         alt=""
                         className="comment-author-img"/>
                    <button className="btn btn-sm btn-success float-right" type="submit">Post Comment
                    </button>
                </div>
            </div>
        </form>
    );

    handleChange = (e: any) => {
        this.props.commentsStore.comment = e.target.value;
    };

    requestSignElement = () => (
        <div>
            <Link to={"/login"}>Sign in </Link>
            or
            <Link to={"/register"}> sign up </Link>
            to add comments on this article.
        </div>
    );

    addComments = (e: any) => {
        e.preventDefault();
        this.props.commentsStore.addComment(this.props.slug);
    };

    render() {
        console.log("Render [ ArticleComment ]");
        return (
            <div className="col-md-8 m-auto">
                <div className="mb-3">
                    {Auth.isSigned() ? this.commentBox() : this.requestSignElement()}
                </div>
                <CommentCard/>
            </div>
        );
    }
}

export default ArticleComment;