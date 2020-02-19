import React from "react";
import {Link} from "react-router-dom";
import CommentCardProps from "../Props/CommentCardProps";

class CommentCard extends React.Component<CommentCardProps, any> {

    handleTrashBox = (e: any) => {
        e.id = this.props.comment.id;
        this.props.onClickTrashBox(e);
    }

    trashBox = () => (
        <span className="float-right icon-trash-wrapper">
            <i className="ion-trash-a"
               onClick={this.handleTrashBox}/>
        </span>
    );

    render() {
        console.log("Render [ CommentCard ]");

        const {comment} = this.props;
        return (
            <div key={comment.id} className="card mb-3">
                <div className="p-3">
                    <p className="card-text">{comment.body}</p>
                </div>
                <div className="card-footer">
                    <Link to={`/@${comment.author.username}`}>
                        <img src={comment.author.image}
                             alt=""
                             className="author-image comment-another-img"
                             role="presentation"/>
                    </Link>
                    &nbsp;
                    <span>
                        <Link className="comment-author" to={`/@${comment.author.username}`}>
                            {comment.author.username}
                        </Link>
                        <span className="comment-date">
                            {new Date(comment.createdAt).toDateString()}
                        </span>
                    </span>
                    {this.props.isDisableTrashBox ? '' : this.trashBox()}
                </div>
            </div>
        )
    }
}

export default CommentCard;