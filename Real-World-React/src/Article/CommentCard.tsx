import React from "react";
import Auth from "../Auth/Auth";
import CommentDTO from "../DTO/CommentDTO";
import {Link} from "react-router-dom";

class CommentCard extends React.Component<{ slug: string, comments: CommentDTO[], deleteHandler: any }, {}> {

    constructor(props: { slug: string, comments: CommentDTO[], deleteHandler: any }) {
        super(props);
    }


    deleteComment = (id: number) => {
        this.props.deleteHandler(id);
    }

    commentElements = (comments: CommentDTO[]) => (
        comments.map((info: CommentDTO, _) => (
            <div className="card mb-3">
                <div className="p-3">
                    <p className="card-text">{info.body}</p>
                </div>
                <div className="card-footer">
                    <Link to={`/@${info.author.username}`}>
                        <img
                            src={info.author.image}
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
                    {Auth.isOwner(info.author.username) ? this.trashBox(info.id) : ''}
                </div>
            </div>
        ))
    )

    trashBox = (id: number) => (
        <span className="float-right icon-trash-wrapper">
            <i className="ion-trash-a"
               onClick={(e: any) => this.deleteComment(id)}></i>
        </span>
    )

    render() {
        const {comments} = this.props;
        return (
            <div>
                {this.commentElements(comments)}
            </div>
        );
    }
}

export default CommentCard;