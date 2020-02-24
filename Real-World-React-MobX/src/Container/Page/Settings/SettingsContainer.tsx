import React from "react";
import {inject, observer} from "mobx-react";
import PageRouter from "../../../PageRouter/PageRouter";
import {RouteComponentProps} from "react-router";
import UserStore from "../../../Store/UserStore";
import AuthStore from "../../../Store/AuthStore";
import Settings from "../../../Widget/Settings/Settings";
import UserDTO from "../../../DTO/UserDTO";

interface Props extends RouteComponentProps {
    userStore: UserStore,
    authStore: AuthStore
}

interface State extends UserDTO {
    password: string
}

@inject("userStore", "authStore")
@observer
export default class SettingsContainer extends React.Component<Props, State> {

    state = {
        image: '',
        username: '',
        bio: '',
        email: '',
        password: ''
    }

    componentDidMount(): void {
        console.log("componentDidMount [ SettingsAdapter ]");
        this.setState({
            ...this.props.userStore.user,
            password: ""
        })
    }

    handleUpdateSettings = (e: any) => {
        e.preventDefault();
        PageRouter.pageRouteAfterPromise(
            this.props.userStore.updateUser(
                this.state.image,
                this.state.username,
                this.state.bio,
                this.state.email,
                this.state.password
            ),
            this.props.history,
            "/")
    };

    handleChange = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value
        } as Pick<State, keyof State>)
    };

    handleLogout = (e: any) => {
        e.preventDefault();
        this.props.authStore.logout(this.props.userStore);
        PageRouter.pageRoute(this.props.history, "/")
    };

    render() {
        const {password, email, username, bio, image} = this.state;

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
