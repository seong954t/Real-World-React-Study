import React from "react";
import {inject, observer} from "mobx-react";
import {RouteComponentProps} from "react-router";
import PostStore from "../Store/PostStore";
import PageRouter from "../PageRouter/PageRouter";
import Post from "../Widget/Post/Post";

interface Props extends RouteComponentProps<{ slug: string }> {
    postStore: PostStore
}

@inject("postStore")
@observer
export default class PostAdapter extends React.Component<Props, any> {

    componentDidMount(): void {
        console.log("componentDidMount [ PostAdapter ]");
        const {slug} = this.props.match.params;
        if (slug) {
            this.props.postStore.loadPost(slug)
        } else {
            this.props.postStore.resetPost()
        }
    }

    appendTag = (e: any) => {
        e.preventDefault();
        this.props.postStore.appendTag();
    };

    removeTag = (e: any) => {
        this.props.postStore.removeTag(e.tag);
    }

    handlePublish = (e: any) => {
        e.preventDefault();
        const {slug} = this.props.match.params;
        let publishArticlePromise: Promise<any>;
        if (!slug) {
            publishArticlePromise = this.props.postStore.createArticle();
        } else {
            publishArticlePromise = this.props.postStore.updateArticle(slug);
        }
        PageRouter.pageRouteAfterPromise(publishArticlePromise, this.props.history, `/article/${slug}`)
    };

    handleChange = (e: any) => {
        if (e.target.name === "tag") {
            this.props.postStore.setTag(e.target.value);
        } else {
            this.props.postStore.setPost(e.target.name, e.target.value)
        }
    };

    render() {
        const {post, tag} = this.props.postStore;
        const {title, description, body, tagList} = post;

        return (
            <Post title={title}
                  description={description}
                  body={body}
                  tagList={tagList}
                  tag={tag}
                  onClickRemoveTag={this.removeTag}
                  onSubmit={this.handlePublish}
                  onChangeInputAndTextArea={this.handleChange}
                  onEnterPressAtTagInput={this.appendTag}/>
        );
    }
}