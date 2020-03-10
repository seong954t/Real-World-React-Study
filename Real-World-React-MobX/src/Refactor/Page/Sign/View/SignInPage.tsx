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

interface State {
    email: string,
    password: string
}

@observer
export class SignInPage extends React.Component<any, State> {
    readonly userService = UserService.instance;

    state = {
        email: "",
        password: ""
    };

    onChangeHandler = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value
        } as Pick<State, keyof State>)
    };

    signInHandler = (e: any) => {
        e.preventDefault();
        PageRouter.pageRouteAfterPromise(
            this.userService.login(this.state.email, this.state.password),
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
                    <p className={"form-title"}>Sign In</p>
                    <Link to={LINK.REFACTOR.SIGN_UP} className={"form-description"}>Need an account?</Link>
                    {this.errorElement()}
                    <WidgetInput placeholder={"Email"}
                                 name={"email"}
                                 value={this.state.email}
                                 onChange={this.onChangeHandler}/>
                    <WidgetInput placeholder={"Password"}
                                 type={"password"}
                                 name={"password"}
                                 value={this.state.password}
                                 onChange={this.onChangeHandler}/>
                    <div className={"sign-button-wrapper"}>
                        <WidgetColorButton className={"sign-button"}
                                           color={"#5CB85C"}
                                           onClick={this.signInHandler}>
                            Sing In
                        </WidgetColorButton>
                    </div>
                </form>
            </Main>
        );
    }
}