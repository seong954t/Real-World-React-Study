import React from "react";
import CommentDTO from "../DTO/CommentDTO";
import CommentCard from "./CommentCard";
import Loading from "../Loading/Loading";
import CommentCardListProps from "../Props/CommentCardListProps";

export default class CommentCardList extends React.PureComponent<CommentCardListProps, any> {

    commentElements = (comments: CommentDTO[]) => (
        comments.map((comment: CommentDTO, _) => (
                <CommentCard comment={comment}
                             isDisableTrashBox={comment.author.username !== this.props.username}
                             onClickTrashBox={this.props.onClickTrashBox}
                />
            )
        )
    );

    render() {
        console.log("Render [ ArticleComment ]");
        return (
            <div>
                {
                    this.props.loading ?
                        <div className={"text-center m-4"}>
                            <Loading className={"text-success"}/>
                        </div> :
                        this.commentElements(this.props.comments)
                }
            </div>
        );
    }
}