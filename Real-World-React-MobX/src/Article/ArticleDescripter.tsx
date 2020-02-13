import React from "react";

class ArticleDescripter extends React.Component<{ tagList: string[], body: string }, {}> {

    tagListElements = (tagList: string[]) => (
        tagList.map((info: string, index: number) => (
            <li key={index} className="tag-default preview-tag mr-1">{info}</li>
        )));

    render() {
        const {tagList, body} = this.props;

        console.log("Render [ ArticleDescripter ]");

        return (
            <div className="article-desc col-md-12 p-0">
                <div className="col-md-12 p-0">
                    <div>
                        <p>{body}</p>
                    </div>
                    <div>
                        <ul className="tag-list p-0">
                            {this.tagListElements(tagList)}
                        </ul>
                    </div>
                </div>
                <hr/>
            </div>
        );
    }
}

export default ArticleDescripter;