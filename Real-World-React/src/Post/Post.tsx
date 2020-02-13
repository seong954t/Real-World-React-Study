import React from "react";
import RealWorldApi from "../RealWordApi/RealWorldApi";
import ArticlePost from "../DTO/PostDTO";
import ArticleDTO from "../DTO/ArticleDTO";

class Post extends React.Component<any, ArticlePost> {

    state: ArticlePost = {
        title: '',
        description: '',
        body: '',
        tag: '',
        tagList: []
    }

    constructor(props: any) {
        super(props);
        const {slug} = this.props.match.params;
        if (slug !== undefined) {
            this.setArticle(slug);
        }
    }

    setArticle = (slug: string) => {
        RealWorldApi.getArticle(slug, this.setStateArticle);
    }

    setStateArticle = (article: ArticleDTO) => {
        const {title, description, body, tagList} = article;
        this.setState({
            title: title,
            description: description,
            body: body,
            tagList: tagList
        })
    }

    removeTag = (info: string) => {
        this.setState({
            tagList: this.state.tagList.filter((key) => (key !== info))
        })
    }

    appendTag = (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.state.tagList.push(this.state.tag);
            const tagList = Array.from(new Set(this.state.tagList));
            this.setState({
                tagList: tagList,
                tag: ''
            })
        }
    }

    getTagList = () => (
        this.state.tagList.map((info, _) => {
            return (
                <li className="tag-default popular-tag" key={info}>
                    <i className="ion-close-round" onClick={(e: any) => this.removeTag(info)}></i>{info}
                </li>
            )
        })
    )

    handleChange = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value
        } as Pick<ArticlePost, keyof ArticlePost>)
    }

    handlePublish = (e: any) => {
        e.preventDefault();
        const {title, description, body, tagList} = this.state;
        const {slug} = this.props.match.params;
        if(slug === undefined){
            RealWorldApi.createArticle(title, description, body, tagList);
        } else{
            RealWorldApi.updateArticle(title, description, body, tagList, slug);
        }
    }

    render() {
        const tagList = this.getTagList();
        return (
            <div className="container text-center mt-4" onSubmit={this.handlePublish}>
                <div className="col-10 m-auto">
                    <form className="text-right m-auto">
                        <fieldset className="form-group">
                            <input type="text" placeholder="Article Title" className="form-control" name="title"
                                   value={this.state.title} onChange={this.handleChange}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="text" placeholder="What's this article about?" className="form-control"
                                   name="description" value={this.state.description} onChange={this.handleChange}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <textarea rows={8} placeholder="Write your article (in markdown)" className="form-control"
                                      name="body" value={this.state.body} onChange={this.handleChange}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="text" placeholder="Enter tags" className="form-control"
                                   name="tag" value={this.state.tag} onChange={this.handleChange}
                                   onKeyPress={this.appendTag}/>
                            <div className="text-left">
                                {tagList}
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