import React from "react";
import {Link} from "react-router-dom";
import SignProps from "../Props/SignProps";
import "../Style/Form/form.less";

export default class SignIn extends React.Component<SignProps, any> {

    errorElement = (errors: string[]) => (
        <ul className="error-message text-left">
            {errors.map((msg, index: number) => (
                <li key={index}>{msg}</li>
            ))}
        </ul>
    );

    render() {
        const {email, password, errors, onChangeInput, onSubmit} = this.props;

        console.log("Render [ SignIn ]");

        return (
            <div className="container form-wrapper">
                <div className="col-6">
                    <h1>Sign In</h1>
                    <Link to={this.props.linkToSignUp || ''}>Need an account?</Link>
                    {errors ? this.errorElement(errors) : ''}
                    <form className="sign-form" onSubmit={onSubmit}>
                        <fieldset className="form-group">
                            <input type="text" placeholder="Email"
                                   value={email} name="email" onChange={onChangeInput}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="password" placeholder="Password"
                                   value={password} name="password" onChange={onChangeInput}/>
                        </fieldset>
                        <button className="button-success" type="submit">Sign in</button>
                    </form>
                </div>
            </div>
        );
    }
}

