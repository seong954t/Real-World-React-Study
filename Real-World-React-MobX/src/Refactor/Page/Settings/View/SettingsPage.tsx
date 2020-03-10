import React from "react";
import {WidgetInput} from "../../../Widget/Form/WidgetInput";
import {WidgetTextarea} from "../../../Widget/Form/WidgetTextarea";
import {Main} from "../../../Garget/Main/Main";
import "../../../Garget/Form/Form.less";
import "./SettingsPage.less";
import {WidgetColorButton} from "../../../Widget/Button/WidgetColorButton";
import {UserService} from "../../../Service/UserService";
import PageRouter from "../../../../PageRouter/PageRouter";
import LINK from "../../../../PageRouter/Link";
import {RouteComponentProps} from "react-router";
import UserVo from "../../../Vo/UserVo";
import {observer} from "mobx-react";

interface Props extends RouteComponentProps {

}

interface State extends UserVo {
    password: string;
}

@observer
export class SettingsPage extends React.Component<Props, State> {
    readonly userService = UserService.instance;

    constructor(props: Props) {
        super(props);
        this.state = {password: "", ...this.userService.user};
    };

    onChangeHandler = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value
        } as Pick<State, keyof State>)
    };

    onClickLogoutHandler = () => {
        this.userService.logout();
        PageRouter.pageRoute(this.props.history, LINK.REFACTOR.HOME);
    };

    onClickUpdateHandler = (e: any) => {
        e.preventDefault();
        PageRouter.pageRouteAfterPromise(
            this.userService.updateUser(
                this.state.image,
                this.state.username,
                this.state.bio,
                this.state.email,
                this.state.password),
            this.props.history,
            LINK.REFACTOR.HOME
        )
    };

    render() {
        return (
            <Main>
                <form className={"form-container col-6"}>
                    <p className={"form-title"}>Your Settings</p>
                    <WidgetInput placeholder={"URL of profile picture"}
                                 value={this.state.image}
                                 name={"image"}
                                 onChange={this.onChangeHandler}/>
                    <WidgetInput placeholder={"Username"}
                                 value={this.state.username}
                                 name={"username"}
                                 onChange={this.onChangeHandler}/>
                    <WidgetTextarea placeholder={"Short bio about you"}
                                    rows={8}
                                    value={this.state.bio}
                                    name={"bio"}
                                    onChange={this.onChangeHandler}/>
                    <WidgetInput placeholder={"Email"}
                                 value={this.state.email}
                                 name={"email"}
                                 onChange={this.onChangeHandler}></WidgetInput>
                    <WidgetInput placeholder={"New Password"}
                                 value={this.state.password}
                                 name={"password"}
                                 onChange={this.onChangeHandler}
                                 type={"password"}/>
                    <div className={"setting-button-wrapper"}>
                        <WidgetColorButton className={"settings-button"}
                                           onClick={this.onClickUpdateHandler}
                                           color={"#5CB85C"}>
                            Update Settings
                        </WidgetColorButton>
                    </div>
                    <hr/>
                    <WidgetColorButton color={"#b4242f"}
                                       onClick={this.onClickLogoutHandler}>
                        Or click here to logout.
                    </WidgetColorButton>
                </form>
            </Main>
        );
    }
}