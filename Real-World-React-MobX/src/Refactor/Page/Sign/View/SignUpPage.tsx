import React from "react";
import {Main} from "../../../Garget/Main/Main";
import {Link} from "react-router-dom";
import LINK from "../../../../PageRouter/Link";
import {WidgetColorButton} from "../../../Widget/Button/WidgetColorButton";
import "../../../Garget/Form/Form.less";
import "./Sign.less";
import {WidgetInput} from "../../../Widget/Form/WidgetInput";
import {UserService} from "../../../Service/UserService";
import PageRouter from "../../../../PageRouter/PageRouter";
import {observer} from "mobx-react";
import {RouteComponentProps} from "react-router";

interface Props extends RouteComponentProps {

}

interface State {
    username: string,
    email: string,
    password: string
}

@observer
export class SignUpPage extends React.Component<Props, State> {
    readonly userService = UserService.instance;

    state = {
        username: "",
        email: "",
        password: ""
    };

    onChangeHandler = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value
        } as Pick<State, keyof State>)
    };

    signUpHandler = (e: any) => {
        e.preventDefault();
        PageRouter.pageRouteAfterPromise(
            this.userService.registration(this.state.username, this.state.email, this.state.password),
            this.props.history,
            LINK.REFACTOR.HOME
        )
    };

    errorElement = () => {
        const errors = this.userService.errors.body;
        if (errors) {
            return (
                <ul className="sign-error-message">
                    {errors.map((msg, index: number) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            )
        }
        return (<></>)
    };

    componentWillUnmount(): void {
        this.userService.resetErrors();
    };

    render() {
        return (
            <Main>
                <form className={"form-container col-6"}>
                    <p className={"form-title"}>Sign Up</p>
                    <Link to={LINK.REFACTOR.SIGN_IN} className={"form-description"}>Have an account?</Link>
                    {this.errorElement()}
                    <WidgetInput placeholder={"Username"}
                                 name={"username"}
                                 value={this.state.username}
                                 onChange={this.onChangeHandler}></WidgetInput>
                    <WidgetInput placeholder={"Email"}
                                 name={"email"}
                                 value={this.state.email}
                                 onChange={this.onChangeHandler}></WidgetInput>
                    <WidgetInput placeholder={"Password"}
                                 name={"password"}
                                 value={this.state.password}
                                 type={"password"} onChange={this.onChangeHandler}></WidgetInput>
                    <div className={"sign-button-wrapper"}>
                        <WidgetColorButton className={"sign-button"}
                                           color={"#5CB85C"}
                                           onClick={this.signUpHandler}>
                            Sing Up
                        </WidgetColorButton>
                    </div>
                </form>
            </Main>
        );
    }
}