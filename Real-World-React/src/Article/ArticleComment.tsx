import React from "react";
import "./article.css"
import CommentCard from "./CommentCard";
import Auth from "../Auth/Auth";
import {Link} from "react-router-dom";
import "./article.css"
import RealWorldApi from "../RealWordApi/RealWorldApi";
import CommentDTO from "../DTO/CommentDTO";

class ArticleComment extends React.Component<{ slug: string }, { comment: string, comments: CommentDTO[] }> {

    constructor(props: {slug: string}) {
        super(props);
        this.state = {
            comment: "",
            comments: []
        }
        this.setComments();
    }

    setComments = () => {
        const {slug} = this.props;
        RealWorldApi.getComments(slug, this.setStateComments);
    }

    setStateComments = (comments: CommentDTO[]) => {
        this.setState({
            comments: comments
        })
    }

    deleteComment = (id: number) => {
        const {slug} = this.props;
        RealWorldApi.deleteComment(slug, id, this.setComments);
    }

    commentBox = () => (
        <form onSubmit={this.addComments}>
            <div className="comment-write-box">
                <fieldset className="form-group m-0">
                    <textarea rows={3} placeholder="Write a comment..." className="form-control p-3"
                              value={this.state.comment} onChange={this.handleChange}/>
                </fieldset>
                <div className="card-footer">
                    <img
                        src={Auth.getUserInfo()?.image}
                        className="comment-author-img"/>
                    <button className="btn btn-sm btn-success float-right" type="submit">Post Comment
                    </button>
                </div>
            </div>
        </form>
    )

    handleChange = (e: any) => {
        this.setState({
            comment: e.target.value
        })
    }


    requestSignElement = () => (
        <div>
            <Link to={"/login"}>Sign in </Link>
            or
            <Link to={"/register"}> sign up </Link>
            to add comments on this article.</div>
    )

    addComments = (e: any) => {
        e.preventDefault();
        if (this.state.comment !== '') {
            RealWorldApi.addComment(this.props.slug, this.state.comment, this.resetComment);
        }
    }

    resetComment = () => {
        this.setComments();
        this.setState({
            comment: ''
        })
    }

    render() {
        return (
            <div className="col-md-8 m-auto">
                <div className="mb-3">
                    {Auth.isSigned() ? this.commentBox() : this.requestSignElement()}
                </div>
                <CommentCard slug={this.props.slug} comments={this.state.comments} deleteHandler={this.deleteComment}/>
            </div>
        );
    }
}

export default ArticleComment;