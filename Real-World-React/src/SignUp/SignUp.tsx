import React from "react";
import {Link} from "react-router-dom";
import RealWorldApi from "../RealWordApi/RealWorldApi";
import UserDTO from "../DTO/UserDTO";

class SignUp extends React.Component<{}, UserDTO> {

    state: UserDTO = {
        username: '',
        email: '',
        password: '',
        errors: []
    }

    handleSignUp = (e: any) => {
        e.preventDefault();
        const {username, email, password} = this.state;
        if(username !== undefined){
            RealWorldApi.registration(username, email, password, this.handleError)
        }
    }

    errorElement = () => (
        <ul className="error-message text-left">
            {this.state.errors.map((msg, _) => (
                <li>{msg}</li>
            ))}
        </ul>
    )

    handleError = (errorMsg: string[]) => {
        this.setState({
            errors: errorMsg
        })
    }

    handleChange = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value
        } as Pick<UserDTO, keyof UserDTO>)
    }

    render() {
        return (
            <div className="container text-center">
                <div className="col-6 m-auto">
                    <h1 className="mb-2">Sign Up</h1>
                    <Link to={"./login"} className="mb-2">Have an account?</Link>
                    {this.state.errors.length !== 0 ? this.errorElement() : ''}
                    <form className="text-right m-auto" onSubmit={this.handleSignUp}>
                        <fieldset className="form-group">
                            <input type="text" placeholder="Username" className="form-control form-control-lg"
                                   value={this.state.username} onChange={this.handleChange} name="username"/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="text" placeholder="Email" className="form-control form-control-lg"
                                   value={this.state.email} onChange={this.handleChange} name="email"/>
                        </fieldset>
                        <fieldset className="form-group">
                            <input type="password" placeholder="Password" className="form-control form-control-lg"
                                   value={this.state.password} onChange={this.handleChange} name="password"/>
                        </fieldset>
                        <button className="btn btn-lg btn-success" type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignUp;