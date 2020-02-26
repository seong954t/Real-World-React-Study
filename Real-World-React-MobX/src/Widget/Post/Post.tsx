import React from "react";
import PostProps from "../Props/PostProps";
import "../Tags/tags.less"

class Post extends React.Component<PostProps, any> {

    getTagElementList = () => (
        Array.from(this.props.tagList).map((tag: string, _: number) => {
            return (
                <li className="tag-popular" key={tag}>
                    <i className="ion-close-round" onClick={(e: any) => {e.tag = tag; this.props.onClickRemoveTag(e);}}/> {tag}
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
            <div className="container form-wrapper">
                <div className="col-9">
                    <form className="sign-form" onSubmit={onSubmit}>
                        <fieldset className="form-group">
                            <input type="text" placeholder="Article Title" name="title"
                                   value={title} onChange={onChangeInputAndTextArea}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="text" placeholder="What's this article about?"
                                   name="description" value={description} onChange={onChangeInputAndTextArea}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <textarea rows={8} placeholder="Write your article (in markdown)"
                                      name="body" value={body} onChange={onChangeInputAndTextArea}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="text" placeholder="Enter tags"
                                   name="tag" value={tag} onChange={onChangeInputAndTextArea}
                                   onKeyPress={this.handleEnterPress}/>
                            <div className="entered-tag-list">
                                {tagElementList}
                            </div>
                        </fieldset>
                        <button className="button-success" type="submit">Publish Article</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Post;