import React from "react";
import {WidgetMiniInfo} from "./Widget/mini-info/widget-mini-info";

export class TestPage extends React.Component<any, any> {

    render() {
        return (
            <div>
                <WidgetMiniInfo title="yargoof"
                                date={"Mon Feb 2017/11"}
                                imageSize={"32px"}
                                titleColor={"#5CB85C"}
                                titleFontSize={"16px"}
                                dateColor={"#bbb"}
                                dateFontSize={"12px"}
                                src={"https://avatars1.githubusercontent.com/u/19300604?s=400&u=a9419b174dafadd4ba7dda60638fc2ba5ee49b67&v=4"}
                />
                <div>widget-mini-info</div>
            </div>
        );
    }
}