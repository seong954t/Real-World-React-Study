import React from "react";
import {Link} from "react-router-dom";
import CommentEditorProps from "../Props/CommentEditorProps";
import "../Style/Form/form.less"

export default class CommentEditor extends React.PureComponent<CommentEditorProps, any> {

    commentBox = () => (
        <form onSubmit={this.props.onSubmit}>
            <div className="comment-write-box">
                <fieldset>
                    <textarea rows={3} placeholder="Write a comment..." className="form-control p-3"
                              value={this.props.comment} onChange={this.props.onChangeTextArea}/>
                </fieldset>
                <div className="card-footer">
                    <img src={this.props.image}
                         alt=""
                         className="comment-author-img"/>
                    <button className="button-success-sm" type="submit">Post Comment</button>
                </div>
            </div>
        </form>
    );

    requestSignElement = () => (
        <div>
            <Link to={this.props.linkToSignIn || ''}>Sign in </Link>
            or
            <Link to={this.props.linkToSignUp || ''}> sign up </Link>
            to add comments on this article.
        </div>
    );

    render() {
        console.log("Render [ CommentEditor ]");
        return (
            <div>
                {this.props.isDisableCommentBox ? this.requestSignElement() : this.commentBox()}
            </div>
        );
    }
}