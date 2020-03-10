import React from "react";
import {Main} from "../../../Garget/Main/Main";
import {Link} from "react-router-dom";
import LINK from "../../../../PageRouter/Link";
import {WidgetColorButton} from "../../../Widget/Button/WidgetColorButton";
import "../../../Garget/Form/Form.less";
import "./Sign.less";
import {WidgetInput} from "../../../Widget/Form/WidgetInput";

export class SignUp extends React.Component{

    render() {
        return (
            <Main>
                <form className={"form-container col-6"}>
                    <p className={"form-title"}>Sign Up</p>
                    <Link to={LINK.REFACTOR.SIGN_IN} className={"form-description"}>Have an account?</Link>
                    <WidgetInput placeholder={"Username"}></WidgetInput>
                    <WidgetInput placeholder={"Email"}></WidgetInput>
                    <WidgetInput placeholder={"Password"} type={"password"}></WidgetInput>
                    <div className={"sign-button-wrapper"}>
                        <WidgetColorButton className={"sign-button"} color={"#5CB85C"}>Sing Up</WidgetColorButton>
                    </div>
                </form>
            </Main>
        );
    }
}