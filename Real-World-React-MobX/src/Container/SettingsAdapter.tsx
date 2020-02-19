import React from "react";
import {inject, observer} from "mobx-react";
import PageRouter from "../PageRouter/PageRouter";
import {RouteComponentProps} from "react-router";
import UserStore from "../Store/UserStore";
import AuthStore from "../Store/AuthStore";
import Settings from "../Widget/Settings/Settings";

interface Props extends RouteComponentProps {
    userStore: UserStore,
    authStore: AuthStore
}

@inject("userStore", "authStore")
@observer
export default class SettingsContainer extends React.Component<Props, any> {

    componentDidMount(): void {
        console.log("componentDidMount [ SettingsAdapter ]");
        this.props.userStore.resetUpdatingUser();
    }

    handleUpdateSettings = (e: any) => {
        e.preventDefault();
        PageRouter.pageRouteAfterPromise(
            this.props.userStore.updateUser(),
            this.props.history,
            "/")
    };

    handleChange = (e: any) => {
        if (e.target.name === "password") {
            this.props.userStore.setPassword(e.target.value);
        } else {
            this.props.userStore.setUpdatingUserInfo(e.target.name, e.target.value);
        }
    };

    handleLogout = (e: any) => {
        e.preventDefault();
        this.props.authStore.logout(this.props.userStore);
        PageRouter.pageRoute(this.props.history, "/")
    };

    render() {
        const {password} = this.props.userStore;
        const {email, username, bio, image} = this.props.userStore.updatingUser;

        console.log("Render [ SettingsAdapter ]");

        return (
            <Settings password={password}
                      email={email}
                      username={username}
                      bio={bio ? bio : ''}
                      image={image ? image : ''}
                      onChangeInputAndTextArea={this.handleChange}
                      onSubmit={this.handleUpdateSettings}
                      onClickLogout={this.handleLogout}
            />
        )
    }
}
