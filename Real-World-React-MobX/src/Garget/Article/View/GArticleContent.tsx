import React from "react";
import {GArticleContentVM} from "../ViewModel/GArticleContentVM";
import marked from "marked";
import {WidgetTagList} from "../../../Widget/Tag/WidgetTagList";
import "./GArticleContent.less";

interface Props {
    vm: GArticleContentVM
}

export class GArticleContent extends React.Component<Props> {

    render() {
        const {tagList, body} = this.props.vm.article;
        const markedHTML = {__html: marked(body, {sanitize: true})};

        return (
            <div className="article-content col-12">
                <div className="article-content-marked">
                    <div dangerouslySetInnerHTML={markedHTML}></div>
                </div>
                <WidgetTagList className={"article-content-tag-list"} tagList={tagList}
                               tagBorder={"1px solid #DDDDDD"}
                               tagBackgroundColor={"inherit"}
                               tagColor={"#AAAAAA"}/>
                <hr/>
            </div>
        );
    }
}