import React from "react";
import {WidgetTagList} from "../../../Widget/Tag/WidgetTagList";
import "./GTagBox.less";

interface Props {
    tagList: string[]
}

export class GTagBox extends React.Component<Props>{
    render() {

        return (
            <div className={"tag-box"}>
                <p>Popular Tags</p>
                <WidgetTagList tagList={this.props.tagList}
                               tagBackgroundColor={"#818A91"}
                               tagColor={"#FFFFFFFF"}
                               tagBorder={"1px solid #818A91"}
                />
            </div>
        );
    }
}