import React, {MouseEventHandler} from "react";
import CommentDTO from "../../DTO/CommentDTO";
import CommentCard from "../../Widget/Comment/CommentCard";
import Loading from "../../Widget/Loading/Loading";
import LINK from "../../PageRouter/Link";

interface Props {
    username: string,
    comments: CommentDTO[],
    loading?: boolean,
    onClickTrashBox: MouseEventHandler<HTMLButtonElement>
}

export default class CommentCardList extends React.PureComponent<Props, any> {

    commentElements = (comments: CommentDTO[]) => (
        comments.map((comment: CommentDTO, _) => (
                <CommentCard key={comment.id}
                             image={comment.author.image}
                             username={comment.author.username}
                             createdAt={comment.createdAt}
                             body={comment.body}
                             id={comment.id}
                             isDisableTrashBox={comment.author.username !== this.props.username}
                             onClickTrashBox={this.props.onClickTrashBox}
                             linkToUser={LINK.USER(comment.author.username)}
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
                        <div>
                            <Loading className={"green my"}/>
                        </div> :
                        this.commentElements(this.props.comments)
                }
            </div>
        );
    }
}