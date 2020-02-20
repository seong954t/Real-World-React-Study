import React from "react";
import {Link} from "react-router-dom";
import "./comment.css"
import CommentCardProps from "../Props/CommentCardProps";

export default class CommentCard extends React.Component<CommentCardProps, any> {

    handleTrashBox = (e: any) => {
        e.id = this.props.id;
        this.props.onClickTrashBox(e);
    }

    trashBox = () => (
        <span className="float-right icon-trash-wrapper">
            <i className="ion-trash-a"
               onClick={this.handleTrashBox}/>
        </span>
    );

    render() {
        const {id, body, username, image, createdAt, linkToUser} = this.props;

        console.log("Render [ CommentCard ]");

        return (
            <div key={id} className="card mb-3">
                <div className="p-3">
                    <p className="card-text">{body}</p>
                </div>
                <div className="card-footer">
                    <Link to={linkToUser || ''}>
                        <img src={image}
                             alt=""
                             className="author-image comment-another-img"
                             role="presentation"/>
                    </Link>
                    &nbsp;
                    <span>
                        <Link className="comment-author" to={linkToUser || ''}>
                            {username}
                        </Link>
                        <span className="comment-date">
                            {new Date(createdAt).toDateString()}
                        </span>
                    </span>
                    {this.props.isDisableTrashBox ? '' : this.trashBox()}
                </div>
            </div>
        )
    }
}