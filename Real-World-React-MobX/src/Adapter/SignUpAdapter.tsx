import React from "react";
import {RouteComponentProps} from "react-router";
import UserStore from "../Store/UserStore";
import AuthStore from "../Store/AuthStore";
import PageRouter from "../PageRouter/PageRouter";
import SignUp from "../SignUp/SignUp";
import {inject, observer} from "mobx-react";

interface Props extends RouteComponentProps{
    userStore: UserStore,
    authStore: AuthStore
}

@inject("authStore", "userStore")
@observer
export default class SignUpAdapter extends React.Component<Props, any>{

    componentDidMount(): void {
        console.log("componentDidMount [ SignUpAdapter ]")
        this.props.authStore.resetAuthInfo();
    }

    handleSignUp = (e: any) => {
        e.preventDefault();
        const registrationPromise = this.props.authStore.registration().then((user: any) => {
            UserStore.INSTANCE.setUser(user);
        });
        PageRouter.pageRouteAfterPromise(registrationPromise, this.props.history, "/");
    }

    handleChange = (e: any) => {
        this.props.authStore.setAuthInfo(e.target.name, e.target.value)
    };

    render() {
        const {username, email, password, errors} = this.props.authStore;

        return (
            <SignUp
                password={password}
                onChange={this.handleChange}
                onSubmit={this.handleSignUp}
                email={email}
                errors={errors}
                username={username}
            />
        );
    }
}