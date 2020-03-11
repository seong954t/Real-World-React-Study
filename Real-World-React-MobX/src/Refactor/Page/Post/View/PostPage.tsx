import React from "react";
import {Main} from "../../../Garget/Main/Main";
import {WidgetInput} from "../../../Widget/Form/WidgetInput";
import {WidgetTextarea} from "../../../Widget/Form/WidgetTextarea";
import "../../../Garget/Form/Form.less";
import "./PostPage.less";
import {WidgetColorButton} from "../../../Widget/Button/WidgetColorButton";
import {WidgetTagList} from "../../../Widget/Tag/WidgetTagList";
import {RouteComponentProps} from "react-router";
import {ArticleService} from "../../../Service/ArticleService";
import {GXButtonTagItem} from "../../../Garget/TagBox/View/GXButtonTagItem";

interface Props extends RouteComponentProps<{ slug: string }> {

}

interface State {
    title: string,
    description: string,
    body: string,
    tag: string,
    tagList: Set<string>
}

export class PostPage extends React.Component<Props, State> {
    readonly articleService = ArticleService.instance;

    state = {
        title: "",
        description: "",
        body: "",
        tag: "",
        tagList: new Set<string>()
    };

    slug: string;

    constructor(props: Props) {
        super(props);
        this.slug = this.props.match.params.slug;
        if (this.slug) {
            if (this.slug === this.articleService.article.slug) {
                const {title, description, body, tagList} = this.articleService.article;
                this.state = {
                    title: title,
                    description: description,
                    body: body,
                    tagList: new Set<string>(tagList),
                    tag: ""
                }
            } else {
                this.articleService.loadArticle(this.slug)
                    .then(() => {
                        const {title, description, body, tagList} = this.articleService.article;
                        this.setState({
                            title: title,
                            description: description,
                            body: body,
                            tagList: new Set<string>(tagList),
                            tag: ""
                        })
                    })
            }
        }
    }

    onChangeHandler = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value
        } as Pick<State, keyof State>);
    };

    onClickXButtonHandler = (e: any) => {
        const tempTagList = this.state.tagList;
        tempTagList.delete(e.uid);
        this.setState({
            tagList: tempTagList
        })
    };

    tagList = () => {
        return (
            <div className={"tag-list-wrapper"}>
                {
                    Array.from(this.state.tagList).map((tag) => {
                        return <GXButtonTagItem className={"x-tag-item"} onClickXButton={this.onClickXButtonHandler} uid={tag}>
                            {tag}
                        </GXButtonTagItem>
                    })
                }
            </div>
        )
    };

    render() {
        return (
            <Main>
                <div className={"container"}>
                    <form className={"form-container"}>
                        <WidgetInput placeholder={"Article Title"}
                                     name={"title"}
                                     value={this.state.title}
                                     onChange={this.onChangeHandler}/>
                        <WidgetInput placeholder={"What's this article about?"}
                                     name={"description"}
                                     value={this.state.description}
                                     onChange={this.onChangeHandler}/>
                        <WidgetTextarea placeholder={"Write your article (in markdown)"} rows={9}
                                        name={"body"}
                                        value={this.state.body}
                                        onChange={this.onChangeHandler}/>
                        <WidgetInput placeholder={"Enter tags"}
                                     name={"tag"}
                                     value={this.state.tag}
                                     onChange={this.onChangeHandler}/>
                        {this.tagList()}
                        <div className={"publish-button-wrapper"}>
                            <WidgetColorButton className={"publish-button"}
                                               color={"#5CB85C"}>
                                Publish Article
                            </WidgetColorButton>
                        </div>
                    </form>
                </div>
            </Main>
        );
    }
}