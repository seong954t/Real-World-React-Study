import React from "react";
import ArticlePost from "../DTO/PostDTO";
import {inject, observer} from "mobx-react";

@inject("postStore")
@observer
class Post extends React.Component<any, ArticlePost> {

    componentDidMount(): void {
        console.log("componentDidMount [ Post ]");
        const {slug} = this.props.match.params;
        if (slug) {
            this.props.postStore.loadPost(slug)
        } else {
            this.props.postStore.resetPost()
        }
    }

    appendTag = (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.props.postStore.appendTag();
        } else {
            this.handleChange(e);
        }
    };

    handleChange = (e: any) => {
        if(e.target.name === "tag"){
            this.props.postStore.setTag(e.target.value);
        } else {
            this.props.postStore.setPost(e.target.name, e.target.value)
        }
    };

    getTagElementList = () => (
        this.props.postStore.tagList.map((info: string, _: number) => {
            return (
                <li className="tag-default popular-tag" key={info}>
                    <i className="ion-close-round" onClick={() => this.props.postStore.removeTag(info)}/>{info}
                </li>
            )
        })
    );

    handlePublish = (e: any) => {
        e.preventDefault();
        const {slug} = this.props.match.params;
        if (slug === undefined) {
            this.props.postStore.createArticle(this.props.history);
        } else {
            this.props.postStore.updateArticle(slug, this.props.history);
        }
    };

    render() {
        const tagElementList = this.getTagElementList();
        const {postStore} = this.props;
        const {title, description, body} = postStore.post;

        console.log("Render [ Post ]");

        return (
            <div className="container text-center mt-4" onSubmit={this.handlePublish}>
                <div className="col-10 m-auto">
                    <form className="text-right m-auto">
                        <fieldset className="form-group">
                            <input type="text" placeholder="Article Title" className="form-control" name="title"
                                   value={title} onChange={this.handleChange}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="text" placeholder="What's this article about?" className="form-control"
                                   name="description" value={description} onChange={this.handleChange}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <textarea rows={8} placeholder="Write your article (in markdown)" className="form-control"
                                      name="body" value={body} onChange={this.handleChange}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="text" placeholder="Enter tags" className="form-control"
                                   name="tag" value={postStore.tag} onChange={this.handleChange}
                                   onKeyPress={this.appendTag}/>
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