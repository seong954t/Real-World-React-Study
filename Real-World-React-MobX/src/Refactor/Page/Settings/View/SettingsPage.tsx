import React from "react";
import {WidgetInput} from "../../../Widget/Form/WidgetInput";
import {WidgetTextarea} from "../../../Widget/Form/WidgetTextarea";
import {Main} from "../../../Garget/Main/Main";
import "../../../Garget/Form/Form.less";
import "./SettingsPage.less";
import {WidgetColorButton} from "../../../Widget/Button/WidgetColorButton";

export class SettingsPage extends React.Component<any, any>{

    render() {
        return (
            <Main>
                <form className={"form-container col-6"}>
                    <p className={"form-title"}>Your Settings</p>
                    <WidgetInput placeholder={"URL of profile picture"}></WidgetInput>
                    <WidgetInput placeholder={"Username"}></WidgetInput>
                    <WidgetTextarea placeholder={"Short bio about you"} rows={8}></WidgetTextarea>
                    <WidgetInput placeholder={"Email"}></WidgetInput>
                    <WidgetInput placeholder={"New Password"}></WidgetInput>
                    <div className={"setting-button-wrapper"}>
                        <WidgetColorButton className={"settings-button"} color={"#5CB85C"}>Update Settings</WidgetColorButton>
                    </div>
                    <hr/>
                    <WidgetColorButton color={"#b4242f"}>Or click here to logout.</WidgetColorButton>
                </form>
            </Main>
        );
    }
}