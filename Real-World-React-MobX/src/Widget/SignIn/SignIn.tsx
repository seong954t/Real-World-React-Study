import React from "react";
import {Link} from "react-router-dom";
import SignProps from "../Props/SignProps";

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
            <div className="container text-center">
                <div className="col-6 m-auto">
                    <h1 className="mb-2">Sign In</h1>
                    <Link to={this.props.linkToSignUp || ''} className="mb-2">Need an account?</Link>
                    {errors ? this.errorElement(errors) : ''}
                    <form className="text-right m-auto" onSubmit={onSubmit}>
                        <fieldset className="form-group">
                            <input type="text" placeholder="Email" className="form-control form-control-lg"
                                   value={email} name="email" onChange={onChangeInput}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="password" placeholder="Password" className="form-control form-control-lg"
                                   value={password} name="password" onChange={onChangeInput}/>
                        </fieldset>
                        <button className="btn btn-lg btn-success" type="submit">Sign in</button>
                    </form>
                </div>
            </div>
        );
    }
}

