import React from "react";
import CommentDTO from "../DTO/CommentDTO";
import CommentCard from "../Widget/Comment/CommentCard";
import Loading from "../Widget/Loading/Loading";
import CommentCardListProps from "../Props/CommentCardListProps";

export default class CommentCardList extends React.PureComponent<CommentCardListProps, any> {

    commentElements = (comments: CommentDTO[]) => (
        comments.map((comment: CommentDTO, _) => (
                <CommentCard image={comment.author.image}
                             username={comment.author.username}
                             createdAt={comment.createdAt}
                             body={comment.body}
                             id={comment.id}
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