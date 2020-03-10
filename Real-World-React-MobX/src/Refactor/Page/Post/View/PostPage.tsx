import React from "react";
import {Main} from "../../../Garget/Main/Main";
import {WidgetInput} from "../../../Widget/Form/WidgetInput";
import {WidgetTextarea} from "../../../Widget/Form/WidgetTextarea";
import "./PostPage.less";
import {WidgetColorButton} from "../../../Widget/Button/WidgetColorButton";
import {WidgetTagList} from "../../../Widget/Tag/WidgetTagList";

export class PostPage extends React.Component<any, any> {

    tagList = () => {
        return (
            <div className={"tag-list-wrapper"}>
                <WidgetTagList className={"post-tag-list"}
                               tagList={["tag1", "tag2", "tag1", "tag2", "tag1", "tag2"]}
                               tagColor={"#FFFFFF"}
                               tagBackgroundColor={"#818A91"}
                               tagBorder={"1px solid #818A91"}
                ></WidgetTagList>
            </div>
        )
    };

    render() {
        return (
            <Main>
                <form className={"form-container col-6"}>
                    <WidgetInput placeholder={"Article Title"}></WidgetInput>
                    <WidgetInput placeholder={"What's this article about?"}></WidgetInput>
                    <WidgetTextarea placeholder={"Write your article (in markdown)"} rows={9}></WidgetTextarea>
                    <WidgetInput placeholder={"Enter tags"}></WidgetInput>
                    {this.tagList()}
                    <div className={"publish-button-wrapper"}>
                        <WidgetColorButton className={"publish-button"} color={"#5CB85C"}>Publish
                            Article</WidgetColorButton>
                    </div>
                </form>
            </Main>
        );
    }
}