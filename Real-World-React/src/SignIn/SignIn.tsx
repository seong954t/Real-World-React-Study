import React from "react";
import {Link} from "react-router-dom";
import RealWorldApi from "../RealWordApi/RealWorldApi";
import UserDTO from "../DTO/UserDTO";


class SignIn extends React.Component<{}, UserDTO> {
    state: UserDTO = {
        email: '',
        password: '',
        errors: []
    }

    handleSignIn = (e: any) => {
        e.preventDefault();
        RealWorldApi.login(this.state.email, this.state.password, this.handleError)
    }

    handleChange = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value
        } as Pick<UserDTO, keyof UserDTO>)
    }

    handleError = (errorMsg: string[]) => {
        this.setState({
            errors: errorMsg
        })
    }

    errorElement = () => (
        <ul className="error-message text-left">
            {this.state.errors.map((msg, _) => (
                <li>{msg}</li>
            ))}
        </ul>
    )

    render() {
        return (
            <div className="container text-center">
                <div className="col-6 m-auto">
                    <h1 className="mb-2">Sign In</h1>
                    <Link to={"./register"} className="mb-2">Need an account?</Link>
                    {this.state.errors.length !== 0 ? this.errorElement() : ''}
                    <form className="text-right m-auto" onSubmit={this.handleSignIn}>
                        <fieldset className="form-group">
                            <input type="text" placeholder="Email" className="form-control form-control-lg"
                                   value={this.state.email} name="email" onChange={this.handleChange}/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="password" placeholder="Password" className="form-control form-control-lg"
                                   value={this.state.password} name="password" onChange={this.handleChange}/>
                        </fieldset>
                        <button className="btn btn-lg btn-success" type="submit">Sign in</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignIn;