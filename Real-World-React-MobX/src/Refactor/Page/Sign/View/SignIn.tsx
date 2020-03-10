import React from "react";
import {Main} from "../../../Garget/Main/Main";
import {Link} from "react-router-dom";
import LINK from "../../../../PageRouter/Link";
import {WidgetColorButton} from "../../../Widget/Button/WidgetColorButton";
import "../../../Garget/Form/Form.less";
import "./Sign.less";
import {WidgetInput} from "../../../Widget/Form/WidgetInput";

export class SignIn extends React.Component{

    render() {
        return (
            <Main>
                <form className={"form-container col-6"}>
                    <p className={"form-title"}>Sign In</p>
                    <Link to={LINK.REFACTOR.SIGN_UP} className={"form-description"}>Need an account?</Link>
                    <WidgetInput placeholder={"Email"}></WidgetInput>
                    <WidgetInput placeholder={"Password"} type={"password"}></WidgetInput>
                    <div className={"sign-button-wrapper"}>
                        <WidgetColorButton className={"sign-button"} color={"#5CB85C"}>Sing In</WidgetColorButton>
                    </div>
                </form>
            </Main>
        );
    }
}