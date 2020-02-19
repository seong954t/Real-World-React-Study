import React from "react";
import {Link} from "react-router-dom";
import CommentEditorProps from "../Props/CommentEditorProps";



export default class CommentEditor extends React.PureComponent<CommentEditorProps, any> {

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

    render() {
        console.log("Render [ CommentEditor ]");
        return (
            <div className="mb-3">
                {this.props.isDisableCommentBox ? this.requestSignElement() : this.commentBox()}
            </div>
        );
    }
}