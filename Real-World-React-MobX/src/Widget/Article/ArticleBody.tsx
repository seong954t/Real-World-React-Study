import React from "react";
import marked from "marked";
import "./article.less"
import "../Style/Tag/tag.less"

interface Props {
    tagList: string[],
    body: string
}

export default class ArticleBody extends React.Component<Props, any> {

    tagListElements = (tagList: string[]) => (
        tagList.map((info: string, index: number) => (
            <li key={index} className="tag-default preview-tag mr-1">{info}</li>
        )));

    render() {
        const {tagList, body} = this.props;
        const markedHTML = {__html: marked(body, {sanitize: true})};

        console.log("Render [ ArticleBody ]");

        return (
            <div className="article-desc col-12">
                <div className="col-md-12">
                    <div className="article-marked">
                        <div dangerouslySetInnerHTML={markedHTML}></div>
                    </div>
                    <div>
                        <ul className="tag-list">
                            {this.tagListElements(tagList)}
                        </ul>
                    </div>
                </div>
                <hr/>
            </div>
        );
    }
}
