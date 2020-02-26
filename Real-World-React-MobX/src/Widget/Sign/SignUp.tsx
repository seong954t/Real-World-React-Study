import React from "react";
import {Link} from "react-router-dom";
import SignProps from "../Props/SignProps";
import "../Style/Form/form.less";

export default class SignUp extends React.Component<SignProps, any> {

    errorElement = (errors: string[]) => (
        <ul className="error-message text-left">
            {errors.map((msg, index: number) => (
                <li key={index}>{msg}</li>
            ))}
        </ul>
    );

    render() {
        const {username, email, password, errors, onChangeInput, onSubmit} = this.props;

        console.log("Render [ SignUp ]");

        return (
            <div className="container form-wrapper">
                <div className="col-6">
                    <h1>Sign Up</h1>
                    <Link to={this.props.linkToSignIn || ''}>Have an account?</Link>
                    {errors.length !== 0 ? this.errorElement(errors) : ''}
                    <form className="sign-form" onSubmit={onSubmit}>
                        <fieldset className="form-group">
                            <input type="text" placeholder="Username"
                                   value={username} onChange={onChangeInput} name="username"/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="text" placeholder="Email"
                                   value={email} onChange={onChangeInput} name="email"/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="password" placeholder="Password"
                                   value={password} onChange={onChangeInput} name="password"/>
                        </fieldset>
                        <button className="button-success" type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        );
    }
}