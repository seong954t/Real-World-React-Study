import React from "react";
import {WidgetMiniInfo, WidgetMiniInfoType} from "./Widget/Mini-info/widget-mini-info";
import {WidgetTag} from "./Widget/Tag/widget-tag";
import {WidgetColorButton} from "./Widget/Button/widget-color-button";
import {WidgetInput} from "./Widget/Form/widget-input";
import {WidgetTextarea} from "./Widget/Form/widget-textarea";

export class TestPage extends React.Component<any, any> {

    render() {
        return (
            <div>
                <WidgetMiniInfo title="yargoof"
                                titleColor={"#5CB85C"}
                                titleFontSize={"16px"}
                                subtitle={"Mon Feb 2017/11"}
                                subtitleColor={"#bbb"}
                                subtitleFontSize={"12px"}
                                imageSize={"32px"}
                                type={WidgetMiniInfoType.DEFAULT}
                                src={"https://avatars1.githubusercontent.com/u/19300604?s=400&u=a9419b174dafadd4ba7dda60638fc2ba5ee49b67&v=4"}
                />
                <WidgetMiniInfo title="yargoof"
                                titleColor={"#5CB85C"}
                                titleFontSize={"16px"}
                                subtitle={"Mon Feb 2017/11"}
                                subtitleColor={"#bbb"}
                                subtitleFontSize={"12px"}
                                imageSize={"32px"}
                                type={WidgetMiniInfoType.INLINE}
                                src={"https://avatars1.githubusercontent.com/u/19300604?s=400&u=a9419b174dafadd4ba7dda60638fc2ba5ee49b67&v=4"}
                />
                <WidgetMiniInfo title="yargoof"
                                titleColor={"#5CB85C"}
                                titleFontSize={"16px"}
                                imageSize={"32px"}
                                type={WidgetMiniInfoType.DEFAULT}
                                src={"https://avatars1.githubusercontent.com/u/19300604?s=400&u=a9419b174dafadd4ba7dda60638fc2ba5ee49b67&v=4"}
                />
                <div>widget-mini-info</div>
                <br></br>

                <div>
                    <WidgetTag style={{marginRight: "3px"}}>hehe</WidgetTag><WidgetTag style={{marginRight: "3px"}}>hehe</WidgetTag><WidgetTag style={{marginRight: "3px"}}>hehe</WidgetTag><WidgetTag style={{marginRight: "3px"}}>hehe</WidgetTag><WidgetTag style={{marginRight: "3px"}}>hehe</WidgetTag>
                </div>
                <div>widget-tag</div>
                <br></br>

                <div>
                    <WidgetColorButton color={"#5CB85C"}>Update Settings</WidgetColorButton>
                </div>
                <div>widget-color-button</div>
                <br></br>

                <div>
                    <WidgetInput placeholder={"placeholder"}></WidgetInput>
                    <br></br>
                    <WidgetTextarea placeholder={"placeholder"}></WidgetTextarea>
                </div>
                <div>widget-from</div>
            </div>
        );
    }
}