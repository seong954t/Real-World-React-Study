import React from "react";
import PostProps from "../Props/PostProps";

class Post extends React.Component<PostProps, any> {

    getTagElementList = () => (
        Array.from(this.props.tagList).map((tag: string, _: number) => {
            return (
                <li className="tag-default popular-tag" key={tag}>
                    <i className="ion-close-round" onClick={(e: any) => {e.tag = tag; this.props.onClickRemoveTag(e);}}/>{tag}
                </li>
            )
        })
    );

    handleEnterPress = (e: any) => {
        if (e.key === 'Enter') {
            this.props.onEnterPressAtTagInput(e);
        }
    }

    render() {
        const tagElementList = this.getTagElementList();
        const {title, description, body, tag, onSubmit, onChangeInputAndTextArea} = this.props;

        console.log("Render [ Post ]");

        return (
            <div className="container text-center mt-4">
                <div className="col-10 m-auto">
                    <form className="text-right m-auto" onSubmit={onSubmit}>
                        <fieldset className="form-group">
                            <input type="text" placeholder="Article Title" className="form-control" name="title"
                                   value={title} onChange={onChangeInputAndTextArea}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="text" placeholder="What's this article about?" className="form-control"
                                   name="description" value={description} onChange={onChangeInputAndTextArea}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <textarea rows={8} placeholder="Write your article (in markdown)" className="form-control"
                                      name="body" value={body} onChange={onChangeInputAndTextArea}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="text" placeholder="Enter tags" className="form-control"
                                   name="tag" value={tag} onChange={onChangeInputAndTextArea}
                                   onKeyPress={this.handleEnterPress}/>
                            <div className="text-left">
                                {tagElementList}
                            </div>
                        </fieldset>
                        <button className="btn btn-lg btn-success" type="submit">Publish Article</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Post;