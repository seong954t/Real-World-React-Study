import React from "react";
import {inject, observer} from "mobx-react";
import SignIn from "../SignIn/SignIn";
import PageRouter from "../PageRouter/PageRouter";
import UserStore from "../Store/UserStore";
import AuthStore from "../Store/AuthStore";
import {RouteComponentProps} from "react-router";

interface Props extends RouteComponentProps{
    userStore: UserStore,
    authStore: AuthStore
}

@inject("authStore")
@observer
export default class SignInAdapter extends React.Component<Props, any>{

    componentDidMount(): void {
        console.log("componentDidMount [ SignInAdapter ]");
        this.props.authStore.resetAuthInfo();
    }

    handleSignIn = (e: any) => {
        e.preventDefault();
        const loginPromise = this.props.authStore.login().then((user) => {
            UserStore.INSTANCE.setUser(user);
        });

        PageRouter.pageRouteAfterPromise(loginPromise, this.props.history, "/");
    }

    handleChange = (e: any) => {
        this.props.authStore.setAuthInfo(e.target.name, e.target.value)
    };

    render() {
        const {email, password, errors} = this.props.authStore;

        console.log("Render [ SignInAdapter ]");

        return (
            <SignIn
                onSubmit={this.handleSignIn}
                onChange={this.handleChange}
                email={email}
                password={password}
                errors={errors}
            />
        );
    }
}