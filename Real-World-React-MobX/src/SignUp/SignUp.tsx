import React from "react";
import {Link} from "react-router-dom";
import SignProps from "../Props/SignProps";

class SignUp extends React.Component<SignProps, any> {

    errorElement = (errors: string[]) => (
        <ul className="error-message text-left">
            {errors.map((msg, index: number) => (
                <li key={index}>{msg}</li>
            ))}
        </ul>
    );

    render() {
        const {username, email, password, errors, onChange, onSubmit} = this.props;

        console.log("Render [ SignUp ]");

        return (
            <div className="container text-center">
                <div className="col-6 m-auto">
                    <h1 className="mb-2">Sign Up</h1>
                    <Link to={"./login"} className="mb-2">Have an account?</Link>
                    {errors.length !== 0 ? this.errorElement(errors) : ''}
                    <form className="text-right m-auto" onSubmit={onSubmit}>
                        <fieldset className="form-group">
                            <input type="text" placeholder="Username" className="form-control form-control-lg"
                                   value={username} onChange={onChange} name="username"/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="text" placeholder="Email" className="form-control form-control-lg"
                                   value={email} onChange={onChange} name="email"/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="password" placeholder="Password" className="form-control form-control-lg"
                                   value={password} onChange={onChange} name="password"/>
                        </fieldset>
                        <button className="btn btn-lg btn-success" type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignUp;